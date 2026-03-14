<x-filament-panels::page>
    <form wire:submit="updateProfile">
        {{ $this->profileForm }}
    </form>

    <form wire:submit="updatePassword">
        {{ $this->passwordForm }}
    </form>
</x-filament-panels::page>