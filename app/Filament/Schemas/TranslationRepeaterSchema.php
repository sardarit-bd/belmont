<?php

namespace App\Filament\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;

class TranslationRepeaterSchema
{
    /**
     * @param array<string, string> $fields  e.g. ['name' => 'text', 'description' => 'textarea']
     */
    public static function make(array $fields): Repeater
    {
        $languages = config('languages.supported', []);

        $fieldComponents = collect($fields)->map(function (string $type, string $name) {
            return match ($type) {
                'textarea'  => Textarea::make($name)->columnSpanFull(),
                default     => TextInput::make($name)->required(),
            };
        })->values()->all();

        return Repeater::make('translations')
            ->relationship('translations')
            ->label('Translations')
            ->schema([
                Select::make('locale')
                    ->options(
                        collect($languages)->mapWithKeys(
                            fn($lang, $code) => [$code => $lang['name']]
                        )->all()
                    )
                    ->required()
                    ->distinct(),
                ...$fieldComponents,
            ])
            ->columnSpanFull()
            ->addActionLabel('Add Translation')
            ->defaultItems(0);
    }
}