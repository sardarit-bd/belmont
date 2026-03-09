<?php

namespace App\Filament\Resources\HeroContents\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;

class HeroContentForm
{
    public static function configure(Schema $schema): Schema
    {
        $languages = collect(config('languages.supported'))
            ->mapWithKeys(fn($lang, $code) => [$code => "{$lang['flag']} {$lang['name']}"])
            ->toArray();

        return $schema->components([

            Section::make('Block Info')
                ->description('Structural fields — section and key are read-only.')
                ->schema([
                    TextInput::make('section')
                        ->disabled()
                        ->dehydrated()
                        ->default('hero'),

                    TextInput::make('key')
                        ->required()
                        ->disabled()
                        ->dehydrated(),

                    Select::make('type')
                        ->options([
                            'text'     => 'Text',
                            'textarea' => 'Textarea',
                            'image'    => 'Image',
                            'url'      => 'URL',
                        ])
                        ->disabled()
                        ->dehydrated()
                        ->live()
                        ->extraAttributes(['wire:ignore' => true]),

                    Toggle::make('is_active')
                        ->label('Active')
                        ->default(true),
                ])
                ->columns(2),

            // ── Image Upload ──
            Section::make('Image')
                ->description('Upload the image for this block.')
                ->schema([
                    FileUpload::make('image_path')
                        ->label('Hero Image')
                        ->image()
                        ->disk('public')
                        ->directory('hero')
                        ->maxSize(10000)
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                        ->helperText('Max 10MB. JPG, PNG or WebP.')
                        ->columnSpanFull(),
                ])
                ->visible(fn($record) => $record?->type === 'image'), 

            // ── Translations ──
            Section::make('Translations')
                ->description('Manage content per language.')
                ->schema([
                    Repeater::make('translations')
                        ->relationship()
                        ->schema([
                            Select::make('locale')
                                ->label('Language')
                                ->options($languages)
                                ->required()
                                ->distinct()
                                ->live()
                                ->columnSpan(1),

                            Textarea::make('value')
                                ->label('Content')
                                ->required()
                                ->rows(3)
                                ->columnSpan(2),
                        ])
                        ->columns(3)
                        ->addActionLabel('+ Add Language')
                        ->defaultItems(0)
                        ->reorderableWithButtons()
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string =>
                            $state['locale']
                                ? (config("languages.supported.{$state['locale']}.flag") . ' ' .
                                   config("languages.supported.{$state['locale']}.name"))
                                : null
                        ),
                ])
                ->visible(fn($record) => $record?->type !== 'image'),
        ]);
    }
}