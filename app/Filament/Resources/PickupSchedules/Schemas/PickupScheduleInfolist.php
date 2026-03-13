<?php

namespace App\Filament\Resources\PickupSchedules\Schemas;

use Filament\Infolists\Components\RepeatableEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class PickupScheduleInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Customer Information')
                    ->icon(\Filament\Support\Icons\Heroicon::OutlinedUser)
                    ->schema([
                        TextEntry::make('full_name')
                            ->label('Full Name')
                            ->weight('semibold'),

                        TextEntry::make('phone_number')
                            ->label('Phone Number'),

                        TextEntry::make('full_address')
                            ->label('Address')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('Pickup Details')
                    ->icon(\Filament\Support\Icons\Heroicon::OutlinedCalendarDays)
                    ->schema([
                        TextEntry::make('pickup_date')
                            ->label('Pickup Date')
                            ->date('l, M d Y'),

                        TextEntry::make('preferred_time')
                            ->label('Preferred Time')
                            ->time('h:i A'),

                        TextEntry::make('special_instructions')
                            ->label('Special Instructions')
                            ->placeholder('None provided')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('Booking Status')
                    ->icon(\Filament\Support\Icons\Heroicon::OutlinedCheckBadge)
                    ->schema([
                        TextEntry::make('status')
                            ->label('Operational Status')
                            ->badge()
                            ->color(fn ($state) => match ($state) {
                                'confirmed'        => 'info',
                                'picked_up'        => 'warning',
                                'being_cleaned'    => 'warning',
                                'out_for_delivery' => 'primary',
                                'delivered'        => 'success',
                                'cancelled'        => 'danger',
                                default            => 'gray',
                            })
                            ->formatStateUsing(fn ($record) => $record->getStatusLabel()),

                        TextEntry::make('payment_status')
                            ->label('Payment Status')
                            ->badge()
                            ->color(fn ($state) => match ($state) {
                                'confirmed' => 'success',
                                'failed'    => 'danger',
                                default     => 'warning',
                            })
                            ->formatStateUsing(fn ($state) => ucfirst($state)),

                        TextEntry::make('status')
                            ->label('Progress')
                            ->columnSpanFull()
                            ->formatStateUsing(function ($record) {
                                $stages = [
                                    'pending'          => '⏳ Pending',
                                    'confirmed'        => '✅ Confirmed',
                                    'picked_up'        => '🚗 Picked Up',
                                    'being_cleaned'    => '🧺 Being Cleaned',
                                    'out_for_delivery' => '🚚 Out for Delivery',
                                    'delivered'        => '🎉 Delivered',
                                ];

                                $currentIndex = array_search($record->status, array_keys($stages));
                                $output = '';

                                foreach ($stages as $key => $label) {
                                    $index = array_search($key, array_keys($stages));
                                    if ($index < $currentIndex) {
                                        $output .= "{$label} → ";
                                    } elseif ($key === $record->status) {
                                        $output .= "{$label}";
                                        if (!$record->isTerminal()) $output .= ' → ...';
                                    }
                                }

                                return $output ?: '⏳ Pending';
                            }),
                    ])
                    ->columns(2),

                Section::make('Payment Details')
                    ->icon(\Filament\Support\Icons\Heroicon::OutlinedCreditCard)
                    ->schema([
                        TextEntry::make('cardholder_name')
                            ->label('Cardholder'),

                        TextEntry::make('card_last_four')
                            ->label('Card Number')
                            ->formatStateUsing(fn ($state) => "•••• •••• •••• {$state}"),

                        TextEntry::make('card_expiry')
                            ->label('Expiry'),

                        TextEntry::make('gateway')
                            ->label('Gateway')
                            ->badge()
                            ->color('info')
                            ->formatStateUsing(fn ($state) => ucfirst($state)),
                    ])
                    ->columns(2),

                Section::make('Order Items')
                    ->icon(\Filament\Support\Icons\Heroicon::OutlinedShoppingBag)
                    ->schema([
                        RepeatableEntry::make('orderItems')
                            ->label('')
                            ->schema([
                                TextEntry::make('product.name')
                                    ->label('Item'),

                                TextEntry::make('quantity')
                                    ->label('Qty'),

                                TextEntry::make('unit_price')
                                    ->label('Unit Price')
                                    ->money('usd'),

                                TextEntry::make('total_price')
                                    ->label('Total')
                                    ->money('usd')
                                    ->weight('semibold'),
                            ])
                            ->columns(4),
                    ]),

                Section::make('Stripe Reference')
                    ->icon(\Filament\Support\Icons\Heroicon::OutlinedLink)
                    ->collapsed()
                    ->schema([
                        TextEntry::make('stripe_payment_intent_id')
                            ->label('Payment Intent')
                            ->copyable()
                            ->placeholder('—'),

                        TextEntry::make('stripe_customer_id')
                            ->label('Customer ID')
                            ->copyable()
                            ->placeholder('—'),

                        TextEntry::make('stripe_payment_method_id')
                            ->label('Payment Method')
                            ->copyable()
                            ->placeholder('—'),
                    ])
                    ->columns(3),

                Section::make('Timestamps')
                    ->icon(\Filament\Support\Icons\Heroicon::OutlinedClock)
                    ->collapsed()
                    ->schema([
                        TextEntry::make('created_at')
                            ->label('Booked At')
                            ->dateTime('M d, Y h:i A'),

                        TextEntry::make('updated_at')
                            ->label('Last Updated')
                            ->dateTime('M d, Y h:i A'),
                    ])
                    ->columns(2),
            ]);
    }
}