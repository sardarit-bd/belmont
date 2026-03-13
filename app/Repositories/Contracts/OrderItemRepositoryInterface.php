<?php

namespace App\Repositories\Contracts;

interface OrderItemRepositoryInterface
{
    public function createForSchedule(string $scheduleId, array $items): void;
}