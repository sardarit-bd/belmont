<?php

// app/Services/PickupScheduleService.php
namespace App\Services;

use App\DTOs\PickupScheduleData;
use App\Models\PickupSchedule;
use App\Notifications\PickupConfirmedAdmin;
use App\Notifications\PickupConfirmedUser;
use App\Repositories\Contracts\PickupScheduleRepositoryInterface;
use Illuminate\Support\Facades\Notification;

class PickupScheduleService
{
    public function __construct(
        private readonly PickupScheduleRepositoryInterface $repository,
    ) {}

    public function book(PickupScheduleData $data): PickupSchedule
    {
        $schedule = $this->repository->create($data);

        // Notify customer
        Notification::route('mail', $data->phoneNumber) // swap for email field if added
            ->notify(new PickupConfirmedUser($schedule));

        // Notify admin
        Notification::route('mail', config('app.admin_email'))
            ->notify(new PickupConfirmedAdmin($schedule));

        return $schedule;
    }
}