<?php

namespace App\Filament\Resources\Categories\Schemas;

use App\Filament\Schemas\TranslationRepeaterSchema;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('service_id')
                    ->relationship('service', 'name')
                    ->required(),
                TextInput::make('name')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
                Textarea::make('description'),
                TextInput::make('sort_order')
                    ->numeric()
                    ->default(0),
                ...TranslationRepeaterSchema::make([  
                    'name'        => 'text',
                    'description' => 'textarea',
                ]),
            ]);
    }
}