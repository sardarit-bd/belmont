<?php

namespace App\Filament\Widgets;

use Filament\Tables;
use App\Models\Order;
use Filament\Tables\Table;
use Filament\Actions\Action;
use Filament\Support\Enums\TextSize;
use Filament\Widgets\TableWidget as BaseWidget;

class LatestOrders extends BaseWidget
{
    protected static ?int $sort = 3;

    protected int | string | array $columnSpan = 'full';

    protected function getTableHeading(): ?string
    {
        return 'Recent Orders';
    }

    public function table(Table $table): Table
    {
        return $table
            ->query(Order::query()->latest()->limit(5))
            ->paginated(false)
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Customer')
                    ->icon('heroicon-m-user')
                    ->weight('bold')
                    ->color('gray'),

                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'gray',
                        'scheduled' => 'info',
                        'ready_for_delivery' => 'success',
                        default => 'primary',
                    }),

                Tables\Columns\TextColumn::make('total_amount')
                    ->money('USD')
                    ->label('Total')
                    ->weight('bold')
                    ->size(TextSize::Large),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Time')
                    ->since()
                    ->color('gray')
                    ->icon('heroicon-m-clock'),
            ]);
    }
}