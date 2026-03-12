<?php

namespace App\Filament\Resources\ContactMessages\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Enums\FontWeight;
use Filament\Support\Enums\IconPosition;

class ContactMessageInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                // ── Contact Details ─────────────────────────────────────
                Section::make('Contact Details')
                    ->description('Personal and contact details of the sender.')
                    ->icon('heroicon-o-user')
                    ->aside()
                    ->schema([
                        TextEntry::make('name')
                            ->label('Name')
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
                            ->label('Phone')
                            ->icon('heroicon-m-phone')
                            ->iconPosition(IconPosition::Before)
                            ->copyable()
                            ->copyMessage('Phone copied!')
                            ->copyMessageDuration(1500)
                            ->placeholder('—'),
                    ]),

                // ── Message ─────────────────────────────────────────────
                Section::make('Message')
                    ->description('The message submitted by the contact.')
                    ->icon('heroicon-o-chat-bubble-left-ellipsis')
                    ->aside()
                    ->schema([
                        TextEntry::make('message')
                            ->label('Message')
                            ->prose()
                            ->columnSpanFull(),
                    ]),

                // ── Status ──────────────────────────────────────────────
                Section::make('Status')
                    ->description('Current read and reply status of this message.')
                    ->icon('heroicon-o-flag')
                    ->aside()
                    ->schema([
                        TextEntry::make('status')
                            ->label('Status')
                            ->icon('heroicon-m-flag')
                            ->iconPosition(IconPosition::Before)
                            ->badge()
                            ->formatStateUsing(fn (string $state): string => match ($state) {
                                'unread'  => 'Unread',
                                'read'    => 'Read',
                                'replied' => 'Replied',
                                default   => ucfirst($state),
                            })
                            ->color(fn (string $state): string => match ($state) {
                                'unread'  => 'warning',
                                'read'    => 'info',
                                'replied' => 'success',
                                default   => 'gray',
                            }),

                        TextEntry::make('uuid')
                            ->label('UUID')
                            ->icon('heroicon-m-identification')
                            ->iconPosition(IconPosition::Before)
                            ->fontFamily('mono')
                            ->copyable()
                            ->copyMessage('UUID copied!')
                            ->copyMessageDuration(1500),
                    ]),

            ]);
    }
}