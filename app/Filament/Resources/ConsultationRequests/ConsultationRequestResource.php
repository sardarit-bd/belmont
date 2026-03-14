<?php

namespace App\Filament\Resources\ConsultationRequests;

use App\Filament\Resources\ConsultationRequests\Pages\CreateConsultationRequest;
use App\Filament\Resources\ConsultationRequests\Pages\EditConsultationRequest;
use App\Filament\Resources\ConsultationRequests\Pages\ListConsultationRequests;
use App\Filament\Resources\ConsultationRequests\Pages\ViewConsultationRequest;
use App\Filament\Resources\ConsultationRequests\Schemas\ConsultationRequestForm;
use App\Filament\Resources\ConsultationRequests\Schemas\ConsultationRequestInfolist;
use App\Filament\Resources\ConsultationRequests\Tables\ConsultationRequestsTable;
use App\Models\ConsultationRequest;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class ConsultationRequestResource extends Resource
{
    protected static ?string $model = ConsultationRequest::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-chat-bubble-left-right';

    protected static string|UnitEnum|null $navigationGroup = 'User\'s Query';
    protected static ?string $navigationLabel = 'Consultations';
    protected static ?int $navigationSort = 1;

    public static function form(Schema $schema): Schema
    {
        return ConsultationRequestForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ConsultationRequestsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function infolist(Schema $schema): Schema
    {
        return ConsultationRequestInfolist::configure($schema);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListConsultationRequests::route('/'),
            'create' => CreateConsultationRequest::route('/create'),
            'edit' => EditConsultationRequest::route('/{record}/edit'),
            'view' => ViewConsultationRequest::route('/{record}'),
        ];
    }
}
