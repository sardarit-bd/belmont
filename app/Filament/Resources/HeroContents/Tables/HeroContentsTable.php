<?php

namespace App\Filament\Resources\HeroContents\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class HeroContentsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('key')
                    ->label('Block Key')
                    ->badge()
                    ->color('primary')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('type')
                    ->badge()
                    ->color(fn(string $state) => match($state) {
                        'text'     => 'gray',
                        'textarea' => 'info',
                        'image'    => 'success',
                        'url'      => 'warning',
                        default    => 'gray',
                    }),

                TextColumn::make('translations_count')
                    ->counts('translations')
                    ->label('Languages')
                    ->badge()
                    ->color('success'),

                IconColumn::make('is_active')
                    ->label('Active')
                    ->boolean(),

                // TextColumn::make('updated_at')
                //     ->label('Last Updated')
                //     ->dateTime()
                //     ->sortable()
                //     ->since(),
            ])
            ->filters([
                TernaryFilter::make('is_active')
                    ->label('Active Status'),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('key');
    }
}