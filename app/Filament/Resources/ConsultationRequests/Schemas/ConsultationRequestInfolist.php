<?php

namespace App\Filament\Resources\ConsultationRequests\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Enums\FontWeight;
use Filament\Support\Enums\IconPosition;

class ConsultationRequestInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                // ── Client Information ──────────────────────────────────
                Section::make('Client Information')
                    ->description('Personal and contact details of the client.')
                    ->icon('heroicon-o-user')
                    ->aside()
                    ->schema([
                        TextEntry::make('first_name')
                            ->label('First Name')
                            ->icon('heroicon-m-user')
                            ->iconPosition(IconPosition::Before)
                            ->weight(FontWeight::Medium),

                        TextEntry::make('last_name')
                            ->label('Last Name')
                            ->icon('heroicon-m-user')
                            ->iconPosition(IconPosition::Before)
                            ->weight(FontWeight::Medium),

                        TextEntry::make('email')
                            ->label('Email Address')
                            ->icon('heroicon-m-envelope')
                            ->iconPosition(IconPosition::Before)
                            ->copyable()
                            ->copyMessage('Email copied!')
                            ->copyMessageDuration(1500),

                        TextEntry::make('phone')
                            ->label('Phone Number')
                            ->icon('heroicon-m-phone')
                            ->iconPosition(IconPosition::Before)
                            ->copyable()
                            ->copyMessage('Phone copied!')
                            ->copyMessageDuration(1500),

                        TextEntry::make('company')
                            ->label('Company')
                            ->icon('heroicon-m-building-office')
                            ->iconPosition(IconPosition::Before)
                            ->placeholder('—')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                // ── Service Details ─────────────────────────────────────
                Section::make('Service Details')
                    ->description('Package, service type, and scheduling information.')
                    ->icon('heroicon-o-clipboard-document-list')
                    ->aside()
                    ->schema([
                        TextEntry::make('package')
                            ->label('Package')
                            ->icon('heroicon-m-gift')
                            ->iconPosition(IconPosition::Before)
                            ->badge()
                            ->formatStateUsing(fn (string $state): string => match ($state) {
                                'wedding'     => 'Wedding',
                                'corporate'   => 'Corporate',
                                'hospitality' => 'Hospitality',
                                default       => ucfirst($state),
                            })
                            ->color(fn (string $state): string => match ($state) {
                                'wedding'     => 'pink',
                                'corporate'   => 'info',
                                'hospitality' => 'warning',
                                default       => 'gray',
                            }),

                        TextEntry::make('service_type')
                            ->label('Service Type')
                            ->icon('heroicon-m-wrench-screwdriver')
                            ->iconPosition(IconPosition::Before)
                            ->badge()
                            ->formatStateUsing(fn (string $state): string => match ($state) {
                                'wedding'     => 'Wedding',
                                'corporate'   => 'Corporate',
                                'hospitality' => 'Hospitality',
                                'theatre'     => 'Theatre',
                                default       => ucfirst($state),
                            })
                            ->color(fn (string $state): string => match ($state) {
                                'wedding'     => 'pink',
                                'corporate'   => 'info',
                                'hospitality' => 'warning',
                                'theatre'     => 'purple',
                                default       => 'gray',
                            }),

                        TextEntry::make('item_count')
                            ->label('Number of Items')
                            ->icon('heroicon-m-inbox-stack')
                            ->iconPosition(IconPosition::Before)
                            ->formatStateUsing(fn (string $state): string => match ($state) {
                                '1-40'    => '1 – 40 items',
                                '41-100'  => '41 – 100 items',
                                '101-200' => '101 – 200 items',
                                '201-500' => '201 – 500 items',
                                default   => $state,
                            }),

                        TextEntry::make('needed_by')
                            ->label('Needed By')
                            ->icon('heroicon-m-calendar-days')
                            ->iconPosition(IconPosition::Before)
                            ->date('M j, Y')
                            ->placeholder('—'),

                        TextEntry::make('details')
                            ->label('Additional Details')
                            ->icon('heroicon-m-chat-bubble-left-ellipsis')
                            ->iconPosition(IconPosition::Before)
                            ->prose()
                            ->placeholder('No additional details provided.')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                // ── Pipeline Status ─────────────────────────────────────
                Section::make('Pipeline Status')
                    ->description('Track where this request is in the sales process.')
                    ->icon('heroicon-o-arrow-trending-up')
                    ->aside()
                    ->schema([
                        TextEntry::make('status')
                            ->label('Status')
                            ->icon('heroicon-m-flag')
                            ->iconPosition(IconPosition::Before)
                            ->badge()
                            ->formatStateUsing(fn (string $state): string => match ($state) {
                                'new'       => 'New',
                                'contacted' => 'Contacted',
                                'quoted'    => 'Quoted',
                                'closed'    => 'Closed',
                                default     => ucfirst($state),
                            })
                            ->color(fn (string $state): string => match ($state) {
                                'new'       => 'info',
                                'contacted' => 'warning',
                                'quoted'    => 'primary',
                                'closed'    => 'success',
                                default     => 'gray',
                            }),

                        TextEntry::make('uuid')
                            ->label('Reference ID')
                            ->icon('heroicon-m-identification')
                            ->iconPosition(IconPosition::Before)
                            ->fontFamily('mono')
                            ->copyable()
                            ->copyMessage('Reference ID copied!')
                            ->copyMessageDuration(1500)
                            ->placeholder('—'),
                    ])
                    ->columns(2),

            ]);
    }
}