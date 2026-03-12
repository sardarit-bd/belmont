<?php

namespace App\Repositories\Contracts;

use App\DTOs\PickupScheduleData;
use App\Models\PickupSchedule;

interface PickupScheduleRepositoryInterface
{
    public function create(PickupScheduleData $data): PickupSchedule;

    public function findById(int $id): ?PickupSchedule;

    public function findByPaymentIntentId(string $paymentIntentId): ?PickupSchedule;

    public function updatePaymentIntent(
        int $scheduleId,
        string $intentId,
        string $customerId,
        string $paymentMethodId,
    ): void;

    public function markConfirmed(int $scheduleId): bool;

    public function markPaymentFailed(int $scheduleId): bool;
}