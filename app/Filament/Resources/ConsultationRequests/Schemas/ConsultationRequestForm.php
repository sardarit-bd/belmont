<?php

namespace App\Filament\Resources\ConsultationRequests\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ConsultationRequestForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                // ── Client Information ──────────────────────────────────
                Section::make('Client Information')
                    ->description('Personal and contact details of the client.')
                    ->icon('heroicon-o-user')
                    ->columns(2)
                    ->schema([
                        TextInput::make('first_name')
                            ->label('First Name')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('John'),

                        TextInput::make('last_name')
                            ->label('Last Name')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('Smith'),

                        TextInput::make('email')
                            ->label('Email Address')
                            ->email()
                            ->required()
                            ->maxLength(255)
                            ->placeholder('john@company.com')
                            ->suffixIcon('heroicon-m-envelope'),

                        TextInput::make('phone')
                            ->label('Phone Number')
                            ->tel()
                            ->required()
                            ->maxLength(255)
                            ->placeholder('(508) 555-0100')
                            ->suffixIcon('heroicon-m-phone'),

                        TextInput::make('company')
                            ->label('Company')
                            ->maxLength(255)
                            ->placeholder('Your Company')
                            ->columnSpanFull()
                            ->suffixIcon('heroicon-m-building-office'),
                    ]),

                // ── Service Details ─────────────────────────────────────
                Section::make('Service Details')
                    ->description('Package, service type, and scheduling information.')
                    ->icon('heroicon-o-clipboard-document-list')
                    ->columns(2)
                    ->schema([
                        Select::make('package')
                            ->label('Package')
                            ->options([
                                'wedding'     => 'Wedding',
                                'corporate'   => 'Corporate',
                                'hospitality' => 'Hospitality',
                            ])
                            ->required()
                            ->native(false)
                            ->suffixIcon('heroicon-m-gift'),

                        Select::make('service_type')
                            ->label('Service Type')
                            ->options([
                                'wedding'     => 'Wedding',
                                'corporate'   => 'Corporate',
                                'hospitality' => 'Hospitality',
                                'theatre'     => 'Theatre',
                            ])
                            ->required()
                            ->native(false)
                            ->suffixIcon('heroicon-m-wrench-screwdriver'),

                        Select::make('item_count')
                            ->label('Number of Items')
                            ->options([
                                '1-40'    => '1 – 40 items',
                                '41-100'  => '41 – 100 items',
                                '101-200' => '101 – 200 items',
                                '201-500' => '201 – 500 items',
                            ])
                            ->required()
                            ->native(false)
                            ->suffixIcon('heroicon-m-inbox-stack'),

                        DatePicker::make('needed_by')
                            ->label('Needed By')
                            ->native(false)
                            ->suffixIcon('heroicon-m-calendar-days')
                            ->displayFormat('M j, Y'),

                        Textarea::make('details')
                            ->label('Additional Details')
                            ->placeholder('Any special requirements or notes...')
                            ->rows(4)
                            ->columnSpanFull(),
                    ]),

                // ── Pipeline Status ─────────────────────────────────────
                Section::make('Pipeline Status')
                    ->description('Track where this request is in the sales process.')
                    ->icon('heroicon-o-arrow-trending-up')
                    ->columns(2)
                    ->schema([
                        Select::make('status')
                            ->label('Status')
                            ->options([
                                'new'       => 'New',
                                'contacted' => 'Contacted',
                                'quoted'    => 'Quoted',
                                'closed'    => 'Closed',
                            ])
                            ->default('new')
                            ->required()
                            ->native(false)
                            ->suffixIcon('heroicon-m-flag'),

                        Placeholder::make('uuid')
                            ->label('Reference ID')
                            ->content(fn ($record) => $record?->uuid ?? '—'),
                    ]),

            ]);
    }
}