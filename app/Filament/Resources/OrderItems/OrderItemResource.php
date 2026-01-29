<?php

namespace App\Filament\Resources\OrderItems;

use UnitEnum;
use BackedEnum;
use App\Models\OrderItem;
use Filament\Tables\Table;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Support\Icons\Heroicon;
use App\Filament\Resources\OrderItems\Pages\EditOrderItem;
use App\Filament\Resources\OrderItems\Pages\ListOrderItems;
use App\Filament\Resources\OrderItems\Pages\CreateOrderItem;
use App\Filament\Resources\OrderItems\Schemas\OrderItemForm;
use App\Filament\Resources\OrderItems\Tables\OrderItemsTable;

class OrderItemResource extends Resource
{
    protected static ?string $model = OrderItem::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static string | UnitEnum | null $navigationGroup = 'Order Section';
    protected static ?int $navigationSort = 2;

    public static function form(Schema $schema): Schema
    {
        return OrderItemForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return OrderItemsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListOrderItems::route('/'),
            'create' => CreateOrderItem::route('/create'),
            'edit' => EditOrderItem::route('/{record}/edit'),
        ];
    }
}
