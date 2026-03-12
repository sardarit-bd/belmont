<?php

namespace App\Filament\Resources\ContactMessages\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\Select;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ContactMessagesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Name')
                    ->searchable()
                    ->sortable()
                    ->weight(\Filament\Support\Enums\FontWeight::Medium),

                TextColumn::make('email')
                    ->label('Email Address')
                    ->searchable()
                    ->sortable()
                    ->icon('heroicon-m-envelope')
                    ->iconPosition(\Filament\Support\Enums\IconPosition::Before)
                    ->copyable()
                    ->copyMessage('Email copied!')
                    ->copyMessageDuration(1500),

                TextColumn::make('phone')
                    ->label('Phone')
                    ->searchable()
                    ->icon('heroicon-m-phone')
                    ->iconPosition(\Filament\Support\Enums\IconPosition::Before)
                    ->placeholder('—')
                    ->toggleable(),

                TextColumn::make('status')
                    ->label('Status')
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
                    })
                    ->icon(fn (string $state): string => match ($state) {
                        'unread'  => 'heroicon-m-envelope',
                        'read'    => 'heroicon-m-envelope-open',
                        'replied' => 'heroicon-m-check-circle',
                        default   => 'heroicon-m-question-mark-circle',
                    })
                    ->sortable(),

                TextColumn::make('created_at')
                    ->label('Received')
                    ->dateTime('M j, Y · g:i A')
                    ->sortable()
                    ->since()
                    ->toggleable(),

                TextColumn::make('updated_at')
                    ->label('Last Updated')
                    ->dateTime('M j, Y · g:i A')
                    ->sortable()
                    ->since()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->label('Status')
                    ->options([
                        'unread'  => 'Unread',
                        'read'    => 'Read',
                        'replied' => 'Replied',
                    ]),
            ])
            ->defaultSort('created_at', 'desc')
            ->striped()
            ->recordActions([
                ViewAction::make(),
                EditAction::make()
                    ->label('Update Status')
                    ->icon('heroicon-m-flag')
                    ->modalHeading('Update Message Status')
                    ->modalWidth('sm')
                    ->form([
                        Select::make('status')
                            ->label('Status')
                            ->options([
                                'unread'  => 'Unread',
                                'read'    => 'Read',
                                'replied' => 'Replied',
                            ])
                            ->required()
                            ->native(false),
                    ]),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}