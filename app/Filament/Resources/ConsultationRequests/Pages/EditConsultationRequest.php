<?php

namespace App\Filament\Resources\ConsultationRequests\Pages;

use App\Filament\Resources\ConsultationRequests\ConsultationRequestResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditConsultationRequest extends EditRecord
{
    protected static string $resource = ConsultationRequestResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
