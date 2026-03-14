<?php

namespace App\Filament\Resources\HeroContents;

use App\Filament\Resources\HeroContents\Pages\CreateHeroContent;
use App\Filament\Resources\HeroContents\Pages\EditHeroContent;
use App\Filament\Resources\HeroContents\Pages\ListHeroContents;
use App\Filament\Resources\HeroContents\Schemas\HeroContentForm;
use App\Filament\Resources\HeroContents\Tables\HeroContentsTable;
use Illuminate\Database\Eloquent\Builder;
use App\Models\ContentBlock;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class HeroContentResource extends Resource
{
    protected static ?string $model = ContentBlock::class;

    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-sparkles';
    protected static string | UnitEnum | null $navigationGroup = 'Content Section';
    protected static ?string $navigationLabel = 'Hero Section';

    protected static ?string $modelLabel = 'Hero Content';
    protected static ?string $pluralModelLabel = 'Hero Contents';

    public static function form(Schema $schema): Schema
    {
        return HeroContentForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return HeroContentsTable::configure($table);
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
            'index' => ListHeroContents::route('/'),
            'create' => CreateHeroContent::route('/create'),
            'edit' => EditHeroContent::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->where('section', 'hero');
    }
}
