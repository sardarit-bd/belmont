<?php

namespace App\Filament\Resources\PickupSchedules\Pages;

use App\Filament\Resources\PickupSchedules\PickupScheduleResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditPickupSchedule extends EditRecord
{
    protected static string $resource = PickupScheduleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
