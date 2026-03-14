<?php

namespace App\Filament\Resources\PickupSchedules\Tables;

use Filament\Actions\ActionGroup;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class PickupSchedulesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->heading('Pickup Schedules')
            ->description('Manage and track all customer pickup bookings.')
            ->columns([
                TextColumn::make('order_number')
                        ->label('Order #')
                        ->searchable()
                        ->copyable()
                        ->weight('bold')
                        ->color('primary'),
                        
                TextColumn::make('full_name')
                    ->label('Customer')
                    ->searchable()
                    ->sortable()
                    ->weight('semibold')
                    ->description(fn ($record) => $record->phone_number),

                TextColumn::make('pickup_date')
                    ->label('Pickup')
                    ->date('M d, Y')
                    ->sortable()
                    ->description(fn ($record) => $record->preferred_time
                        ? \Carbon\Carbon::parse($record->preferred_time)->format('h:i A')
                        : '—'
                    ),

                TextColumn::make('full_address')
                    ->label('Address')
                    ->searchable(query: function ($query, $search) {
                        $query->where('street', 'like', "%{$search}%")
                              ->orWhere('city', 'like', "%{$search}%")
                              ->orWhere('zip', 'like', "%{$search}%");
                    })
                    ->toggleable(),

                TextColumn::make('order_items_count')
                    ->label('Items')
                    ->counts('orderItems')
                    ->badge()
                    ->color('gray')
                    ->suffix(' items'),

                TextColumn::make('payment_status')
                    ->label('Payment')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'confirmed' => 'success',
                        'failed'    => 'danger',
                        default     => 'warning',
                    })
                    ->formatStateUsing(fn ($state) => ucfirst($state)),

                TextColumn::make('status')
                    ->label('Booking')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'confirmed' => 'success',
                        'cancelled' => 'danger',
                        default     => 'warning',
                    })
                    ->formatStateUsing(fn ($state) => ucfirst($state)),
                

                TextColumn::make('created_at')
                    ->label('Booked')
                    ->since()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('payment_status')
                    ->label('Payment Status')
                    ->options([
                        'pending'   => 'Pending',
                        'confirmed' => 'Confirmed',
                        'failed'    => 'Failed',
                    ]),

                SelectFilter::make('status')
                    ->label('Booking Status')
                    ->options([
                        'pending'   => 'Pending',
                        'confirmed' => 'Confirmed',
                        'cancelled' => 'Cancelled',
                    ]),
            ])
            ->emptyStateIcon(\Filament\Support\Icons\Heroicon::OutlinedCalendarDays)
            ->emptyStateHeading('No pickups scheduled yet')
            ->emptyStateDescription('Once customers schedule a pickup, it will appear here.')
            ->recordActions([
                ActionGroup::make([
                    ViewAction::make(),
                    EditAction::make(),

                    \Filament\Actions\Action::make('advance')
                        ->label(fn ($record) => $record->getNextStatusLabel() ?? 'No Next Stage')
                        ->icon(\Filament\Support\Icons\Heroicon::OutlinedArrowRight)
                        ->color('primary')
                        ->requiresConfirmation()
                        ->modalHeading(fn ($record) => "Advance to: {$record->getNextStatusLabel()}")
                        ->modalDescription(fn ($record) => "This will update the booking status and notify the customer.")
                        ->visible(fn ($record) => !$record->isTerminal() && $record->getNextStatus() !== null && $record->payment_status === 'confirmed')
                        ->action(function ($record) {
                            app(\App\Services\PickupScheduleService::class)->advanceStatus($record);
                        }),

                    \Filament\Actions\Action::make('cancel')
                        ->label('Cancel Booking')
                        ->icon(\Filament\Support\Icons\Heroicon::OutlinedXCircle)
                        ->color('danger')
                        ->requiresConfirmation()
                        ->modalHeading('Cancel Booking')
                        ->modalDescription('Are you sure? This cannot be undone. The customer will not be automatically refunded.')
                        ->visible(fn ($record) => !$record->isTerminal())
                        ->action(function ($record) {
                            app(\App\Services\PickupScheduleService::class)->cancelBooking($record);
                        }),
                ]),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}