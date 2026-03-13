<?php

namespace App\Filament\Widgets;

use App\Models\PickupSchedule;
use App\Models\Consultation;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Carbon\Carbon;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $todayCount     = PickupSchedule::whereDate('pickup_date', Carbon::today())->count();
        $yesterdayCount = PickupSchedule::whereDate('pickup_date', Carbon::yesterday())->count();
        $diff           = $todayCount - $yesterdayCount;
        $diffLabel      = $diff >= 0
            ? "+{$diff} more than yesterday"
            : "{$diff} less than yesterday";

        $pendingCount = PickupSchedule::where('payment_status', 'pending')->count();

        $consultationCount = class_exists(Consultation::class)
            ? Consultation::where('status', 'pending')->count()
            : 0;

        // Last 7 days sparkline for pickups
        $pickupSparkline = collect(range(6, 0))->map(fn ($i) =>
            PickupSchedule::whereDate('pickup_date', Carbon::today()->subDays($i))->count()
        )->toArray();

        // Last 7 days sparkline for pending
        $pendingSparkline = collect(range(6, 0))->map(fn ($i) =>
            PickupSchedule::whereDate('created_at', Carbon::today()->subDays($i))
                ->where('payment_status', 'pending')
                ->count()
        )->toArray();

        return [
            Stat::make('Pickups Today', $todayCount)
                ->description($diffLabel)
                ->descriptionIcon($diff >= 0
                    ? 'heroicon-m-arrow-trending-up'
                    : 'heroicon-m-arrow-trending-down'
                )
                ->color($diff >= 0 ? 'success' : 'warning')
                ->chart($pickupSparkline),

            Stat::make('Pending Payments', $pendingCount)
                ->description('Awaiting payment confirmation')
                ->descriptionIcon('heroicon-m-exclamation-circle')
                ->color('warning')
                ->chart($pendingSparkline),

            Stat::make('New Consultations', $consultationCount)
                ->description('Pending review')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('info')
                ->chart([0]),
        ];
    }
}