<?php

namespace App\Filament\Resources\PickupSchedules\Pages;

use App\Filament\Resources\PickupSchedules\PickupScheduleResource;
use App\Services\PickupScheduleService;
use Filament\Actions\Action;
use Filament\Resources\Pages\ViewRecord;
use Filament\Support\Icons\Heroicon;

class ViewPickupSchedule extends ViewRecord
{
    protected static string $resource = PickupScheduleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Action::make('advance')
                ->label(fn () => $this->record->getNextStatusLabel() ?? 'No Next Stage')
                ->icon(Heroicon::OutlinedArrowRight)
                ->color('primary')
                ->requiresConfirmation()
                ->modalHeading(fn () => "Advance to: {$this->record->getNextStatusLabel()}")
                ->modalDescription('This will update the booking status and notify the customer.')
                ->visible(fn () => !$this->record->isTerminal() && $this->record->getNextStatus() !== null && $this->record->payment_status === 'confirmed')
                ->action(function () {
                    app(PickupScheduleService::class)->advanceStatus($this->record);
                    $this->refreshFormData(['status']);
                }),

            Action::make('cancel')
                ->label('Cancel Booking')
                ->icon(Heroicon::OutlinedXCircle)
                ->color('danger')
                ->requiresConfirmation()
                ->modalHeading('Cancel Booking')
                ->modalDescription('Are you sure? This cannot be undone. The customer will not be automatically refunded.')
                ->visible(fn () => !$this->record->isTerminal())
                ->action(function () {
                    app(PickupScheduleService::class)->cancelBooking($this->record);
                    $this->refreshFormData(['status']);
                }),

            \Filament\Actions\EditAction::make(),
        ];
    }
}