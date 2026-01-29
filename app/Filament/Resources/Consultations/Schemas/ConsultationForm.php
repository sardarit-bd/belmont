<?php

namespace App\Filament\Resources\Consultations\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class ConsultationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->relationship('user', 'name'),
                TextInput::make('full_name')
                    ->required(),
                TextInput::make('company_name'),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                TextInput::make('phone')
                    ->tel()
                    ->required(),
                TextInput::make('service_type')
                    ->required(),
                TextInput::make('estimated_item_count')
                    ->required(),
                DatePicker::make('event_date'),
                Textarea::make('additional_details')
                    ->columnSpanFull(),
                Select::make('status')
                    ->options([
            'pending' => 'Pending',
            'contacted' => 'Contacted',
            'quoted' => 'Quoted',
            'converted' => 'Converted',
            'archived' => 'Archived',
        ])
                    ->default('pending')
                    ->required(),
                Textarea::make('admin_notes')
                    ->columnSpanFull(),
            ]);
    }
}
