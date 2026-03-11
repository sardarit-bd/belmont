<?php

namespace App\Repositories\Contracts;

use App\DTOs\PickupScheduleData;
use App\Models\PickupSchedule;

interface PickupScheduleRepositoryInterface
{
    public function create(PickupScheduleData $data): PickupSchedule;
    public function findById(int $id): ?PickupSchedule;
}