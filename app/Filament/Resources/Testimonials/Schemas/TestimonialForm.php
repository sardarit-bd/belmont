<?php

namespace App\Filament\Resources\Testimonials\Schemas;

use App\Filament\Schemas\TranslationRepeaterSchema;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class TestimonialForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components(array_merge(
            [
                Section::make('Customer Details')
                    ->schema([
                        TextInput::make('customer_name')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('designation')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('company')
                            ->nullable()
                            ->maxLength(255),
                    ])
                    ->columns(3),

                Section::make('Review')
                    ->schema([
                        Textarea::make('review')
                            ->required()
                            ->rows(4)
                            ->columnSpanFull()
                            ->helperText('This is the default English review.'),

                        Select::make('rating')
                            ->options([
                                1 => '⭐ 1 — Poor',
                                2 => '⭐⭐ 2 — Fair',
                                3 => '⭐⭐⭐ 3 — Good',
                                4 => '⭐⭐⭐⭐ 4 — Very Good',
                                5 => '⭐⭐⭐⭐⭐ 5 — Excellent',
                            ])
                            ->default(5)
                            ->required(),
                    ]),

                Section::make('Visibility')
                    ->schema([
                        Toggle::make('is_active')
                            ->label('Show on website')
                            ->default(true),
                        TextInput::make('sort_order')
                            ->numeric()
                            ->default(0)
                            ->helperText('Lower number appears first.'),
                    ])
                    ->columns(2),
            ],
            TranslationRepeaterSchema::make([
                'review' => 'textarea',
            ])
        ));
    }
}