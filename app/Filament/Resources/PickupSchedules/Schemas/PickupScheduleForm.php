<?php

namespace App\Filament\Resources\PickupSchedules\Schemas;

use Filament\Forms\Components\Select;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class PickupScheduleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Booking Status')
                    ->description('Update the current status of this pickup booking.')
                    ->icon(\Filament\Support\Icons\Heroicon::OutlinedAdjustmentsHorizontal)
                    ->schema([
                        Select::make('payment_status')
                            ->label('Payment Status')
                            ->options([
                                'pending'   => 'Pending',
                                'confirmed' => 'Confirmed',
                                'failed'    => 'Failed',
                            ])
                            ->required()
                            ->native(false),

                        Select::make('status')
                            ->label('Booking Status')
                            ->options([
                                'pending'          => 'Pending',
                                'confirmed'        => 'Confirmed',
                                'picked_up'        => 'Picked Up',
                                'being_cleaned'    => 'Being Cleaned',
                                'out_for_delivery' => 'Out for Delivery',
                                'delivered'        => 'Delivered',
                                'cancelled'        => 'Cancelled',
                            ])
                            ->required()
                            ->native(false),
                    ])
                    ->columns(2),
            ]);
    }
}