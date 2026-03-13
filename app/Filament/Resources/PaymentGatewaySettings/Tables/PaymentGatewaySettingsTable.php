<?php

namespace App\Filament\Resources\PaymentGatewaySettings\Tables;

use Filament\Actions\ActionGroup;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class PaymentGatewaySettingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('gateway')
                    ->label('Gateway')
                    ->badge()
                    ->color('info')
                    ->formatStateUsing(fn ($state) => ucfirst($state))
                    ->searchable(),

                IconColumn::make('is_active')
                    ->label('Active')
                    ->boolean()
                    ->trueIcon(Heroicon::OutlinedCheckCircle)
                    ->falseIcon(Heroicon::OutlinedXCircle)
                    ->trueColor('success')
                    ->falseColor('danger'),

                TextColumn::make('updated_at')
                    ->label('Last Updated')
                    ->dateTime('M d, Y h:i A')
                    ->sortable(),
            ])
            ->filters([])
            ->recordActions([
                EditAction::make(),
                \Filament\Actions\Action::make('activate')
                    ->label('Set as Active')
                    ->icon(Heroicon::OutlinedCheckCircle)
                    ->color('success')
                    ->requiresConfirmation()
                    ->modalHeading('Activate Gateway')
                    ->modalDescription('This will deactivate all other gateways and set this one as active. Clear cache after switching.')
                    ->visible(fn ($record) => !$record->is_active)
                    ->action(function ($record) {
                        \App\Models\PaymentGatewaySetting::query()->update(['is_active' => false]);
                        $record->update(['is_active' => true]);
                        \Illuminate\Support\Facades\Cache::forget('active_payment_gateway');
                        \Illuminate\Support\Facades\Cache::forget('stripe_public_key');
                    }),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}