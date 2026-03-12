<?php

namespace App\Filament\Resources\ConsultationRequests\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ConsultationRequestsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('full_name')
                    ->label('Client')
                    ->getStateUsing(fn ($record) => $record->first_name . ' ' . $record->last_name)
                    ->searchable(['first_name', 'last_name'])
                    ->sortable()
                    ->weight('semibold')
                    ->icon('heroicon-m-user'),

                TextColumn::make('email')
                    ->label('Email')
                    ->searchable()
                    ->copyable()
                    ->copyMessage('Email copied')
                    ->icon('heroicon-m-envelope')
                    ->color('primary'),

                TextColumn::make('phone')
                    ->label('Phone')
                    ->searchable()
                    ->copyable()
                    ->copyMessage('Phone copied')
                    ->icon('heroicon-m-phone'),

                TextColumn::make('package')
                    ->label('Package')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'wedding'     => 'pink',
                        'corporate'   => 'blue',
                        'hospitality' => 'amber',
                        default       => 'gray',
                    }),

                TextColumn::make('service_type')
                    ->label('Service')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'wedding'     => 'pink',
                        'corporate'   => 'blue',
                        'hospitality' => 'amber',
                        'theatre'     => 'violet',
                        default       => 'gray',
                    }),

                TextColumn::make('item_count')
                    ->label('Items')
                    ->badge()
                    ->color('gray'),

                TextColumn::make('needed_by')
                    ->label('Needed By')
                    ->date('M j, Y')
                    ->sortable()
                    ->icon('heroicon-m-calendar-days')
                    ->color(fn ($state) => $state?->isPast() ? 'danger' : 'success'),

                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'new'       => 'info',
                        'contacted' => 'warning',
                        'quoted'    => 'primary',
                        'closed'    => 'success',
                        default     => 'gray',
                    })
                    ->icon(fn (string $state): string => match ($state) {
                        'new'       => 'heroicon-m-sparkles',
                        'contacted' => 'heroicon-m-phone-arrow-up-right',
                        'quoted'    => 'heroicon-m-document-text',
                        'closed'    => 'heroicon-m-check-circle',
                        default     => 'heroicon-m-question-mark-circle',
                    }),

                TextColumn::make('created_at')
                    ->label('Submitted')
                    ->dateTime('M j, Y H:i')
                    ->sortable()
                    ->since()
                    ->tooltip(fn ($record) => $record->created_at->format('M j, Y H:i')),

                TextColumn::make('updated_at')
                    ->dateTime('M j, Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('package')
                    ->options([
                        'wedding'     => 'Wedding',
                        'corporate'   => 'Corporate',
                        'hospitality' => 'Hospitality',
                    ]),

                SelectFilter::make('service_type')
                    ->label('Service Type')
                    ->options([
                        'wedding'     => 'Wedding',
                        'corporate'   => 'Corporate',
                        'hospitality' => 'Hospitality',
                        'theatre'     => 'Theatre',
                    ]),

                SelectFilter::make('status')
                    ->options([
                        'new'       => 'New',
                        'contacted' => 'Contacted',
                        'quoted'    => 'Quoted',
                        'closed'    => 'Closed',
                    ]),
            ])
            ->defaultSort('created_at', 'desc')
            ->striped()
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->emptyStateIcon('heroicon-o-clipboard-document-list')
            ->emptyStateHeading('No consultation requests yet')
            ->emptyStateDescription('Requests submitted through the website will appear here.');
    }
}