<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Widgets\ChartWidget;
use Carbon\Carbon;

class RevenueChart extends ChartWidget
{
    protected static ?int $sort = 2;    
    protected ?string $heading = 'Orders & Revenue (Last 7 Days)';
    protected  ?string $maxHeight = '250px';

    protected int | string | array $columnSpan = 'full';

    protected function getData(): array
    {
        $dates = collect();
        $totals = collect();
        
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->format('Y-m-d');
            $dailySum = Order::whereDate('created_at', $date)->sum('total_amount');
            
            $dates->push(Carbon::parse($date)->format('M d')); 
            $totals->push($dailySum);
        }

        return [
            'datasets' => [
                [
                    'label' => 'Revenue ($)',
                    'data' => $totals->toArray(),
                    'fill' => 'start',
                    'borderColor' => '#8b5cf6',
                    'backgroundColor' => 'rgba(139, 92, 246, 0.1)',
                    'tension' => 0.4,
                ],
            ],
            'labels' => $dates->toArray(),
        ];
    }

    // FIX 1: Force Integer-Only Scale (No decimals, no negatives)
    protected function getOptions(): array
    {
        return [
            'scales' => [
                'y' => [
                    'beginAtZero' => true, // Start at 0 (No negatives)
                    'ticks' => [
                        'stepSize' => 1, // 1, 2, 3... (No 1.5)
                        'precision' => 0, // Forces integers
                    ],
                ],
            ],
            'plugins' => [
                'legend' => [
                    'display' => false, // Optional: Hides legend to save more space
                ],
            ],
        ];
    }

    protected function getType(): string
    {
        return 'line'; 
    }
}