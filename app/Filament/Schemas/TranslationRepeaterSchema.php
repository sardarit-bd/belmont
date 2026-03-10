<?php

namespace App\Filament\Schemas;

use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;

class TranslationRepeaterSchema
{
    public static function make(array $fields): array
    {
        $languages = config('languages.supported', []);

        $localeOptions = collect($languages)->mapWithKeys(
            fn($lang, $code) => [$code => "{$lang['flag']} {$lang['name']}"]
        )->all();

        // Build one Section per locale containing all fields
        // But since we store per key, we use one repeater per field
        // wrapped in a descriptive Section

        return [
            Section::make('🌐 Multilingual Translations')
                ->description('Add translations for each language. Leave empty to use the default English value.')
                ->schema(
                    collect($fields)->map(
                        function (string $type, string $fieldName) use ($localeOptions) {
                            $label = ucfirst(str_replace('_', ' ', $fieldName));

                            return Repeater::make('translations_' . $fieldName)
                                ->relationship('translations', function ($query) use ($fieldName) {
                                    $query->where('key', $fieldName);
                                })
                                ->label("$label Translations")
                                ->helperText("Translate the \"$label\" field into other languages.")
                                ->itemLabel(function (array $state) use ($label, $localeOptions): ?string {
                                    $locale = $state['locale'] ?? null;
                                    if (!$locale) return "New $label Translation";
                                    $langLabel = $localeOptions[$locale] ?? strtoupper($locale);
                                    return "$langLabel → $label";
                                })
                                ->schema([
                                    Hidden::make('key')->default($fieldName),
                                    Hidden::make('field_type')->default($type),
                                    Select::make('locale')
                                        ->label('Language')
                                        ->options($localeOptions)
                                        ->required()
                                        ->distinct()
                                        ->live(),
                                    match ($type) {
                                        'textarea' => Textarea::make('value')
                                            ->label("$label in selected language")
                                            ->placeholder("Enter $label translation here...")
                                            ->required()
                                            ->rows(3)
                                            ->columnSpanFull(),
                                        default => TextInput::make('value')
                                            ->label("$label in selected language")
                                            ->placeholder("Enter $label translation here...")
                                            ->required(),
                                    },
                                ])
                                ->collapsed()
                                ->collapsible()
                                ->columnSpanFull()
                                ->addActionLabel("+ Add {$label} Translation")
                                ->defaultItems(0)
                                ->grid(1);
                        }
                    )->values()->all()
                )
                ->columnSpanFull()
                ->collapsible()
                ->collapsed(false),
        ];
    }
}