<?php

namespace App\Filament\Resources\ContentBlocks\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ContentBlockForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('section')
                    ->required(),
                TextInput::make('key')
                    ->required(),
                Select::make('type')
                    ->options(['text' => 'Text', 'textarea' => 'Textarea', 'image' => 'Image', 'url' => 'Url'])
                    ->default('text')
                    ->required(),
                Toggle::make('is_active')
                    ->required(),
                TextInput::make('order')
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }
}
