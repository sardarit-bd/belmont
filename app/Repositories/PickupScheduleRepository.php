<?php

namespace App\Repositories;

use App\DTOs\PickupScheduleData;
use App\Models\PaymentGatewaySetting;
use App\Models\PickupSchedule;
use App\Repositories\Contracts\PickupScheduleRepositoryInterface;

class PickupScheduleRepository implements PickupScheduleRepositoryInterface
{
    public function create(PickupScheduleData $data): PickupSchedule
    {
        return PickupSchedule::create([
            'user_id'              => auth()->id(),
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
            'gateway'              => $this->resolveActiveGateway(),
        ]);
    }

    public function findById(string $id): ?PickupSchedule
    {
        return PickupSchedule::find($id);
    }

    public function updatePaymentIntent(string $scheduleId, string $intentId, string $customerId, string $paymentMethodId): void
    {
        PickupSchedule::where('id', $scheduleId)->update([
            'gateway_transaction_id'    => $intentId,
            'gateway_customer_id'       => $customerId,
            'gateway_payment_method_id' => $paymentMethodId,
            'stripe_payment_intent_id' => $intentId,
            'stripe_customer_id'       => $customerId,
            'stripe_payment_method_id' => $paymentMethodId,
        ]);
    }

    public function findByPaymentIntentId(string $paymentIntentId): ?PickupSchedule
    {
        return PickupSchedule::query()
            ->where('gateway_transaction_id', $paymentIntentId)
            ->orWhere('stripe_payment_intent_id', $paymentIntentId)
            ->first();
    }

    public function markConfirmed(string $scheduleId): bool
    {
        return (bool) PickupSchedule::where('id', $scheduleId)
            ->where('payment_status', 'pending')
            ->update([
                'payment_status' => 'confirmed',
                'status'         => 'confirmed',
            ]);
    }

    public function markPaymentFailed(string $scheduleId): bool
    {
        return (bool) PickupSchedule::where('id', $scheduleId)
            ->where('payment_status', 'pending')
            ->update([
                'payment_status' => 'failed',
                'status'         => 'cancelled',
            ]);
    }

    public function transitionStatus(string $scheduleId, string $fromStatus, string $toStatus): bool
    {
        return (bool) PickupSchedule::where('id', $scheduleId)
            ->where('status', $fromStatus)
            ->update(['status' => $toStatus]);
    }

    private function resolveActiveGateway(): string
    {
        $forcedGateway = env('PAYMENT_GATEWAY_FORCE');
        $supportedGateways = array_keys((array) config('payment.gateways', []));

        if (is_string($forcedGateway) && in_array($forcedGateway, $supportedGateways, true)) {
            return $forcedGateway;
        }

        return PaymentGatewaySetting::where('is_active', true)->value('gateway')
            ?? config('payment.default');
    }
}
