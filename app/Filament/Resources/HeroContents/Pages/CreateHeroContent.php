<?php

namespace App\Filament\Resources\HeroContents\Pages;

use App\Filament\Resources\HeroContents\HeroContentResource;
use Filament\Resources\Pages\CreateRecord;

class CreateHeroContent extends CreateRecord
{
    protected static string $resource = HeroContentResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['section'] = 'hero';
        return $data;
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
