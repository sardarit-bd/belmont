<?php

namespace App\Providers;

use App\Repositories\ConsultationRequestRepository;
use App\Repositories\ContactMessageRepository;
use App\Repositories\Contracts\ConsultationRequestRepositoryInterface;
use App\Repositories\Contracts\ContactMessageRepositoryInterface;
use App\Repositories\Contracts\PickupScheduleRepositoryInterface;
use App\Repositories\PickupScheduleRepository;
use App\Services\CacheService;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // cache
        $this->app->singleton(CacheService::class, function () {
            return new CacheService();
        });

        // pickup schedule
        $this->app->bind(
            PickupScheduleRepositoryInterface::class,
            PickupScheduleRepository::class,
        );

        // contact message
        $this->app->bind(ConsultationRequestRepositoryInterface::class, ConsultationRequestRepository::class);
        $this->app->bind(ContactMessageRepositoryInterface::class, ContactMessageRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
        \Filament\Resources\Pages\CreateRecord::disableCreateAnother();
    }

    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(8)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null
        );
    }
}
