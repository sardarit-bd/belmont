<?php

namespace App\Filament\Widgets;

use App\Models\PickupSchedule;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class LatestOrders extends BaseWidget
{
    protected static ?int $sort = 3;
    protected int|string|array $columnSpan = 'full';

    protected function getTableHeading(): ?string
    {
        return 'Recent Pickups';
    }

    public function table(Table $table): Table
    {
        return $table
            ->query(PickupSchedule::query()->latest()->limit(5))
            ->paginated(false)
            ->emptyStateHeading('No pickups yet')
            ->emptyStateIcon(\Filament\Support\Icons\Heroicon::OutlinedCalendarDays)
            ->columns([
                Tables\Columns\TextColumn::make('full_name')
                    ->label('Customer')
                    ->icon('heroicon-m-user')
                    ->weight('bold')
                    ->description(fn ($record) => $record->phone_number),

                Tables\Columns\TextColumn::make('pickup_date')
                    ->label('Pickup Date')
                    ->date('M d, Y')
                    ->description(fn ($record) => $record->preferred_time
                        ? \Carbon\Carbon::parse($record->preferred_time)->format('h:i A')
                        : '—'
                    ),

                Tables\Columns\TextColumn::make('payment_status')
                    ->label('Payment')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'confirmed' => 'success',
                        'failed'    => 'danger',
                        default     => 'warning',
                    })
                    ->formatStateUsing(fn ($state) => ucfirst($state)),

                Tables\Columns\TextColumn::make('status')
                    ->label('Booking')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'confirmed' => 'success',
                        'cancelled' => 'danger',
                        default     => 'warning',
                    })
                    ->formatStateUsing(fn ($state) => ucfirst($state)),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Booked')
                    ->since()
                    ->color('gray')
                    ->icon('heroicon-m-clock'),
            ]);
    }
}