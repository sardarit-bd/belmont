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

    // app/Services/PickupScheduleService.php
    public function book(PickupScheduleData $data): PickupSchedule
    {
        $schedule = $this->repository->create($data);

        Notification::route('mail', config('app.admin_email'))
            ->notify(new PickupConfirmedAdmin($schedule));

        return $schedule;
    }
}