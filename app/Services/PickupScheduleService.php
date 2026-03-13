<?php

namespace App\Services;

use App\Contracts\PaymentGatewayInterface;
use App\DTOs\PickupScheduleData;
use App\Models\PickupSchedule;
use App\Notifications\PickupConfirmedAdmin;
use App\Notifications\PickupConfirmedUser;
use App\Notifications\PickupStatusUpdated;
use App\Repositories\Contracts\OrderItemRepositoryInterface;
use App\Repositories\Contracts\PickupScheduleRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class PickupScheduleService
{
    public function __construct(
        private readonly PickupScheduleRepositoryInterface $scheduleRepository,
        private readonly OrderItemRepositoryInterface      $orderItemRepository,
        private readonly PaymentGatewayInterface           $paymentGateway,
    ) {}

    /**
     * Book a pickup and initiate immediate payment.
     *
     * ACID guarantee:
     *  - Schedule + order items created inside DB::transaction().
     *  - If Stripe throws at any point, transaction rolls back — no orphaned records.
     *  - Booking is only marked 'confirmed' by the webhook, never here.
     */
    public function book(PickupScheduleData $data): array
    {
        return DB::transaction(function () use ($data) {

            // 1. Persist schedule as 'pending'
            $schedule = $this->scheduleRepository->create($data);

            // 2. Persist order items atomically with the schedule
            if (!empty($data->items)) {
                $this->orderItemRepository->createForSchedule($schedule->id, $data->items);
            }

            // 3. Vault customer + payment method in gateway
            $customerId = $this->paymentGateway->createCustomer($data);
            $this->paymentGateway->attachPaymentMethod($customerId, $data->paymentMethodId);

            // 4. Charge immediately.
            //    Idempotency key ties this specific schedule to exactly one charge.
            //    If the network drops and we retry, Stripe returns the existing intent
            //    instead of creating a new one — prevents double-charging.
            $result = $this->paymentGateway->createAndConfirmPaymentIntent(
                customerId:      $customerId,
                paymentMethodId: $data->paymentMethodId,
                amountInCents:   $this->resolveAmount($schedule),
                currency:        'usd',
                idempotencyKey:  "schedule-{$schedule->id}",
                metadata: [
                    'schedule_id' => (string) $schedule->id,
                    'customer'    => $data->fullName,
                    'pickup_date' => $data->pickupDate,
                ]
            );

            // 5. Persist gateway identifiers — safe to store, not sensitive
            $this->scheduleRepository->updatePaymentIntent(
                scheduleId:      $schedule->id,
                intentId:        $result->paymentIntentId,
                customerId:      $customerId,
                paymentMethodId: $data->paymentMethodId,
            );

            return [
                'schedule_id'   => $schedule->id,
                'client_secret' => $result->clientSecret,
                'status'        => $result->status,
            ];
        });
    }

    /**
     * Confirm a booking after gateway fires payment succeeded event.
     *
     * Idempotent — safe to call multiple times for the same intent.
     * Atomic — uses WHERE payment_status = 'pending' so only one
     * concurrent webhook delivery can commit the state change.
     */
    public function confirmBooking(string $paymentIntentId): void
    {
        DB::transaction(function () use ($paymentIntentId) {
            $schedule = $this->scheduleRepository->findByPaymentIntentId($paymentIntentId);

            if (!$schedule) {
                Log::warning('Webhook: no schedule found for intent', [
                    'payment_intent_id' => $paymentIntentId,
                ]);
                return;
            }

            // markConfirmed returns false if already confirmed (idempotency guard)
            $updated = $this->scheduleRepository->markConfirmed($schedule->id);

            if (!$updated) {
                Log::info('Webhook: schedule already confirmed, skipping', [
                    'schedule_id'       => $schedule->id,
                    'payment_intent_id' => $paymentIntentId,
                ]);
                return;
            }

            $fresh = $schedule->fresh();

            // Dispatch notifications via queue — mail failure won't roll back DB
            Notification::route('mail', config('app.admin_email'))
                ->notify(new PickupConfirmedAdmin($fresh));

            Notification::route('mail', $fresh->phone_number)
                ->notify(new PickupConfirmedUser($fresh));
        });
    }

    /**
     * Advance the operational status to the next stage.
     *
     * Transition map:
     *   confirmed → picked_up → being_cleaned → out_for_delivery → delivered
     *
     * Guards:
     *  - Cannot advance a cancelled or delivered schedule.
     *  - Cannot advance if no next stage exists.
     *  - Atomic — only one concurrent call can commit the transition.
     */
    public function advanceStatus(PickupSchedule $schedule): void
    {
        if ($schedule->isTerminal()) {
            Log::warning('AdvanceStatus: attempted to advance terminal schedule', [
                'schedule_id' => $schedule->id,
                'status'      => $schedule->status,
            ]);
            return;
        }

        $nextStatus = $schedule->getNextStatus();

        if (!$nextStatus) {
            Log::warning('AdvanceStatus: no next status available', [
                'schedule_id' => $schedule->id,
                'status'      => $schedule->status,
            ]);
            return;
        }

        DB::transaction(function () use ($schedule, $nextStatus) {
            $updated = $this->scheduleRepository->transitionStatus(
                scheduleId: $schedule->id,
                fromStatus: $schedule->status,
                toStatus:   $nextStatus,
            );

            if (!$updated) {
                Log::info('AdvanceStatus: transition already applied or concurrent update', [
                    'schedule_id' => $schedule->id,
                    'from'        => $schedule->status,
                    'to'          => $nextStatus,
                ]);
                return;
            }

            $fresh = $schedule->fresh();

            // Only notify on meaningful customer-facing stages
            $notifiableStages = ['picked_up', 'delivered'];

            if (in_array($nextStatus, $notifiableStages)) {
                Notification::route('mail', $fresh->phone_number)
                    ->notify(new PickupStatusUpdated($fresh));
            }

            Log::info('AdvanceStatus: status transitioned', [
                'schedule_id' => $schedule->id,
                'from'        => $schedule->status,
                'to'          => $nextStatus,
            ]);
        });
    }

    /**
     * Cancel a booking from any non-terminal stage.
     * Admin-initiated only.
     */
    public function cancelBooking(PickupSchedule $schedule): void
    {
        if ($schedule->isTerminal()) {
            Log::warning('CancelBooking: attempted to cancel terminal schedule', [
                'schedule_id' => $schedule->id,
                'status'      => $schedule->status,
            ]);
            return;
        }

        DB::transaction(function () use ($schedule) {
            $this->scheduleRepository->transitionStatus(
                scheduleId: $schedule->id,
                fromStatus: $schedule->status,
                toStatus:   'cancelled',
            );

            Log::info('CancelBooking: schedule cancelled', [
                'schedule_id' => $schedule->id,
            ]);
        });
    }

    /**
     * Mark a booking as payment-failed.
     * Called when gateway fires payment failed event.
     */
    public function markPaymentFailed(string $paymentIntentId): void
    {
        DB::transaction(function () use ($paymentIntentId) {
            $schedule = $this->scheduleRepository->findByPaymentIntentId($paymentIntentId);

            if (!$schedule) {
                return;
            }

            $updated = $this->scheduleRepository->markPaymentFailed($schedule->id);

            if ($updated) {
                Log::info('Payment failed: schedule cancelled', [
                    'schedule_id'       => $schedule->id,
                    'payment_intent_id' => $paymentIntentId,
                ]);
            }
        });
    }

    private function resolveAmount(PickupSchedule $schedule): int
    {
        return (int) config('services.payment.pickup_fee_cents', 2000);
    }
}