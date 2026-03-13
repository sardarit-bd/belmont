<?php

namespace App\Filament\Widgets;

use App\Models\PickupSchedule;
use Carbon\Carbon;
use Filament\Widgets\ChartWidget;

class RevenueChart extends ChartWidget
{
    protected static ?int $sort = 2;
    protected ?string $heading = 'Confirmed Pickups (Last 7 Days)';
    protected ?string $maxHeight = '250px';
    protected int|string|array $columnSpan = 'full';

    protected function getData(): array
    {
        $dates    = collect();
        $counts   = collect();
        $revenues = collect();

        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->format('Y-m-d');

            $dates->push(Carbon::parse($date)->format('M d'));

            $counts->push(
                PickupSchedule::whereDate('pickup_date', $date)
                    ->where('payment_status', 'confirmed')
                    ->count()
            );

            // Revenue based on fixed fee per confirmed pickup
            $revenues->push(
                PickupSchedule::whereDate('pickup_date', $date)
                    ->where('payment_status', 'confirmed')
                    ->count() * (config('services.payment.pickup_fee_cents', 2000) / 100)
            );
        }

        return [
            'datasets' => [
                [
                    'label'           => 'Confirmed Pickups',
                    'data'            => $counts->toArray(),
                    'fill'            => 'start',
                    'borderColor'     => '#8b5cf6',
                    'backgroundColor' => 'rgba(139, 92, 246, 0.1)',
                    'tension'         => 0.4,
                    'yAxisID'         => 'y',
                ],
                [
                    'label'           => 'Revenue ($)',
                    'data'            => $revenues->toArray(),
                    'fill'            => false,
                    'borderColor'     => '#10b981',
                    'backgroundColor' => 'rgba(16, 185, 129, 0.1)',
                    'tension'         => 0.4,
                    'yAxisID'         => 'y1',
                ],
            ],
            'labels' => $dates->toArray(),
        ];
    }

    protected function getOptions(): array
    {
        return [
            'scales' => [
                'y' => [
                    'beginAtZero' => true,
                    'position'    => 'left',
                    'ticks'       => [
                        'stepSize'  => 1,
                        'precision' => 0,
                    ],
                ],
                'y1' => [
                    'beginAtZero' => true,
                    'position'    => 'right',
                    'min'         => 0,
                    'ticks'       => [
                        'precision' => 0,
                        'stepSize'  => 10,
                    ],
                    'grid' => [
                        'drawOnChartArea' => false,
                    ],
                ],
            ],
            'plugins' => [
                'legend' => [
                    'display' => true,
                ],
            ],
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}