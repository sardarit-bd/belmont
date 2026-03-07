<?php

namespace App\Filament\Resources\HeroContents\Pages;

use App\Filament\Resources\HeroContents\HeroContentResource;
use App\Models\ContentBlock;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditHeroContent extends EditRecord
{
    protected static string $resource = HeroContentResource::class;

    // Load meta.image_path → flat image_path field for the form
    protected function mutateFormDataBeforeFill(array $data): array
    {
        $data['image_path'] = $this->record->meta['image_path'] ?? null;
        return $data;
    }

    // Save flat image_path → back into meta.image_path
    protected function mutateFormDataBeforeSave(array $data): array
    {
        if (isset($data['image_path'])) {
            $data['meta'] = array_merge(
                $this->record->meta ?? [],
                ['image_path' => $data['image_path']]
            );
            unset($data['image_path']);
        }
        return $data;
    }

    protected function afterSave(): void
    {
        ContentBlock::bustCache('hero');
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}