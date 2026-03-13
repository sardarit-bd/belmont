<?php

namespace App\Repositories;

use App\DTOs\PickupScheduleData;
use App\Models\PickupSchedule;
use App\Repositories\Contracts\PickupScheduleRepositoryInterface;

class PickupScheduleRepository implements PickupScheduleRepositoryInterface
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
            'gateway'              => $data->gateway,
        ]);
    }

    public function findById(string $id): ?PickupSchedule
    {
        return PickupSchedule::find($id);
    }

    public function updatePaymentIntent(string $scheduleId, string $intentId, string $customerId, string $paymentMethodId): void
    {
        PickupSchedule::where('id', $scheduleId)->update([
            'stripe_payment_intent_id' => $intentId,
            'stripe_customer_id'       => $customerId,
            'stripe_payment_method_id' => $paymentMethodId,
        ]);
    }

    public function findByPaymentIntentId(string $paymentIntentId): ?PickupSchedule
    {
        return PickupSchedule::where('stripe_payment_intent_id', $paymentIntentId)->first();
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
}