<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use App\Models\Consultation;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Carbon\Carbon;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;
    // protected function getStats(): array
    // {
    //     return [
    //         Stat::make('Pickups Today', Order::whereDate('pickup_scheduled_at', Carbon::today())->count())
    //             ->description('Stops for drivers')
    //             ->descriptionIcon('heroicon-m-truck')
    //             ->color('info'),

    //         Stat::make('Pending Pricing', Order::where('status', 'pending')->count())
    //             ->description('Review required')
    //             ->descriptionIcon('heroicon-m-exclamation-circle')
    //             ->color('danger'),

    //         Stat::make('New Leads', Consultation::where('status', 'pending')->count())
    //             ->description('Wedding/Corporate requests')
    //             ->descriptionIcon('heroicon-m-phone')
    //             ->color('success'),
    //     ];
    // }

    protected function getStats(): array
    {
        return [
            Stat::make('Pickups Today', Order::whereDate('pickup_scheduled_at', Carbon::today())->count())
                ->description('2 more than yesterday') // Context
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('info')
                ->chart([7, 2, 10, 3, 15, 4, 17]), // Add this! (Fake data for now, or query real history)

            Stat::make('Pending Pricing', Order::where('status', 'pending')->count())
                ->description('Action required')
                ->descriptionIcon('heroicon-m-exclamation-circle')
                ->color('danger')
                ->chart([2, 5, 3, 7, 1]), // Sparkline showing backlog trend

            Stat::make('New Leads', Consultation::where('status', 'pending')->count())
                ->description('7% increase')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success')
                ->chart([15, 4, 10, 2, 12, 4, 12]), 
        ];
    }
}