<?php

namespace App\Filament\Resources\Orders\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class OrderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required(),
                Select::make('pickup_address_id')
                    ->relationship('pickupAddress', 'id')
                    ->required(),
                DateTimePicker::make('pickup_scheduled_at')
                    ->required(),
                TextInput::make('pickup_driver_id'),
                Select::make('status')
                    ->options([
            'pending' => 'Pending',
            'scheduled' => 'Scheduled',
            'collected' => 'Collected',
            'processing' => 'Processing',
            'ready_for_delivery' => 'Ready for delivery',
            'delivered' => 'Delivered',
            'cancelled' => 'Cancelled',
        ])
                    ->default('pending')
                    ->required(),
                TextInput::make('subtotal')
                    ->required()
                    ->numeric()
                    ->default(0.0),
                TextInput::make('discount_amount')
                    ->required()
                    ->numeric()
                    ->default(0.0),
                TextInput::make('tax_amount')
                    ->required()
                    ->numeric()
                    ->default(0.0),
                TextInput::make('total_amount')
                    ->required()
                    ->numeric()
                    ->default(0.0),
                TextInput::make('payment_status')
                    ->required()
                    ->default('unpaid'),
                TextInput::make('payment_method'),
                TextInput::make('transaction_id'),
                Textarea::make('customer_note')
                    ->columnSpanFull(),
                Textarea::make('admin_note')
                    ->columnSpanFull(),
            ]);
    }
}
