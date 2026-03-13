<?php

namespace App\Filament\Resources\PickupSchedules\Pages;

use App\Filament\Resources\PickupSchedules\PickupScheduleResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPickupSchedules extends ListRecords
{
    protected static string $resource = PickupScheduleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            // CreateAction::make(),
        ];
    }
}
