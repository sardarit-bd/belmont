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
                    \Filament\Actions\Action::make('confirm')
                        ->label('Mark Confirmed')
                        ->icon(\Filament\Support\Icons\Heroicon::OutlinedCheckCircle)
                        ->color('success')
                        ->requiresConfirmation()
                        ->modalHeading('Confirm Pickup')
                        ->modalDescription('Are you sure you want to mark this booking as confirmed?')
                        ->visible(fn ($record) => $record->status !== 'confirmed')
                        ->action(fn ($record) => $record->update([
                            'status'         => 'confirmed',
                            'payment_status' => 'confirmed',
                        ])),
                    \Filament\Actions\Action::make('cancel')
                        ->label('Mark Cancelled')
                        ->icon(\Filament\Support\Icons\Heroicon::OutlinedXCircle)
                        ->color('danger')
                        ->requiresConfirmation()
                        ->modalHeading('Cancel Pickup')
                        ->modalDescription('Are you sure you want to cancel this booking?')
                        ->visible(fn ($record) => $record->status !== 'cancelled')
                        ->action(fn ($record) => $record->update([
                            'status'         => 'cancelled',
                            'payment_status' => 'failed',
                        ])),
                ]),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}