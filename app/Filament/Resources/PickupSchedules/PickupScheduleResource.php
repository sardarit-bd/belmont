<?php

namespace App\Filament\Resources\PickupSchedules;

use App\Filament\Resources\PickupSchedules\Pages\CreatePickupSchedule;
use App\Filament\Resources\PickupSchedules\Pages\EditPickupSchedule;
use App\Filament\Resources\PickupSchedules\Pages\ListPickupSchedules;
use App\Filament\Resources\PickupSchedules\Pages\ViewPickupSchedule;
use App\Filament\Resources\PickupSchedules\Schemas\PickupScheduleForm;
use App\Filament\Resources\PickupSchedules\Schemas\PickupScheduleInfolist;
use App\Filament\Resources\PickupSchedules\Tables\PickupSchedulesTable;
use App\Models\PickupSchedule;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class PickupScheduleResource extends Resource
{
    protected static ?string $model = PickupSchedule::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCalendarDays;

    protected static ?string $navigationLabel = 'Pickup Schedules';

    protected static string|UnitEnum|null $navigationGroup = 'Orders';

    protected static ?int $navigationSort = 1;

    public static function form(Schema $schema): Schema
    {
        return PickupScheduleForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return PickupScheduleInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PickupSchedulesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => ListPickupSchedules::route('/'),
            'view'   => ViewPickupSchedule::route('/{record}'),
            'edit'   => EditPickupSchedule::route('/{record}/edit'),
        ];
    }
}