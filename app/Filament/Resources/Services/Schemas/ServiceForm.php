<?php

namespace App\Filament\Resources\Services\Schemas;

use App\Filament\Schemas\TranslationRepeaterSchema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ServiceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
                Textarea::make('description')
                    ->columnSpanFull(),
                Toggle::make('is_active')
                    ->default(true),
                TextInput::make('sort_order')
                    ->numeric()
                    ->default(0),
                TranslationRepeaterSchema::make([
                    'name'        => 'text',
                    'description' => 'textarea',
                ]),
            ]);
    }
}