<?php

namespace App\Repositories\Contracts;

use App\DTOs\PickupScheduleData;
use App\Models\PickupSchedule;

interface PickupScheduleRepositoryInterface
{
    public function create(PickupScheduleData $data): PickupSchedule;

    public function findById(string $id): ?PickupSchedule;

    public function findByPaymentIntentId(string $paymentIntentId): ?PickupSchedule;

    public function updatePaymentIntent(
        string $scheduleId,
        string $intentId,
        string $customerId,
        string $paymentMethodId,
    ): void;

    public function markConfirmed(string $scheduleId): bool;

    public function markPaymentFailed(string $scheduleId): bool;
}