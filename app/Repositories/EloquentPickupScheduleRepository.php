<?php

namespace App\Repositories;

use App\DTOs\PickupScheduleData;
use App\Models\PickupSchedule;
use App\Repositories\Contracts\PickupScheduleRepositoryInterface;

class EloquentPickupScheduleRepository implements PickupScheduleRepositoryInterface
{
    public function create(PickupScheduleData $data): PickupSchedule
    {
        return PickupSchedule::create([
            'full_name'            => $data->fullName,
            'phone_number'         => $data->phoneNumber,
            'street'               => $data->street,
            'city'                 => $data->city,
            'zip'                  => $data->zip,
            'pickup_date'          => $data->pickupDate,
            'preferred_time'       => $data->preferredTime,
            'special_instructions' => $data->specialInstructions,
            'cardholder_name'      => $data->cardholderName,
            'card_last_four'       => $data->cardLastFour,
            'card_expiry'          => $data->cardExpiry,
            'status'               => 'pending',
            'payment_status'       => 'pending',
        ]);
    }

    public function findById(int $id): ?PickupSchedule
    {
        return PickupSchedule::find($id);
    }

    public function findByPaymentIntentId(string $paymentIntentId): ?PickupSchedule
    {
        return PickupSchedule::where('stripe_payment_intent_id', $paymentIntentId)->first();
    }

    public function updatePaymentIntent(
        int $scheduleId,
        string $intentId,
        string $customerId,
        string $paymentMethodId,
    ): void {
        PickupSchedule::where('id', $scheduleId)->update([
            'stripe_payment_intent_id' => $intentId,
            'stripe_customer_id'       => $customerId,
            'stripe_payment_method_id' => $paymentMethodId,
        ]);
    }

    /**
     * Atomically transition status from pending → confirmed.
     * Returns true only if the row was actually updated.
     * If two webhook deliveries race, only one will see affected rows = 1.
     */
    public function markConfirmed(int $scheduleId): bool
    {
        $affected = PickupSchedule::where('id', $scheduleId)
            ->where('payment_status', 'pending')   // guard: only update once
            ->update([
                'status'         => 'confirmed',
                'payment_status' => 'paid',
            ]);

        return $affected === 1;
    }

    /**
     * Atomically mark a schedule as payment_failed.
     * Only transitions from pending — never overwrites paid.
     */
    public function markPaymentFailed(int $scheduleId): bool
    {
        $affected = PickupSchedule::where('id', $scheduleId)
            ->where('payment_status', 'pending')
            ->update([
                'status'         => 'cancelled',
                'payment_status' => 'failed',
            ]);

        return $affected === 1;
    }
}