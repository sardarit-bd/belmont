<?php

namespace App\Providers;

use App\Repositories\Contracts\OrderItemRepositoryInterface;
use App\Repositories\Contracts\PickupScheduleRepositoryInterface;
use App\Repositories\OrderItemRepository;
use App\Repositories\PickupScheduleRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(PickupScheduleRepositoryInterface::class, PickupScheduleRepository::class);
        $this->app->bind(OrderItemRepositoryInterface::class, OrderItemRepository::class);
    }
}