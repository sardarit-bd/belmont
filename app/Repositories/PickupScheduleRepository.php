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
        ]);
    }

    public function findById(int $id): ?PickupSchedule
    {
        return PickupSchedule::find($id);
    }
}