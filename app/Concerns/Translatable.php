<?php

namespace App\Concerns;

use App\Models\Translation;
use Illuminate\Support\Facades\App;

trait Translatable
{
    public function translations()
    {
        return $this->morphMany(Translation::class, 'translatable');
    }

    public function getTranslation(string $field, ?string $locale = null): string
    {
        $locale ??= App::getLocale();
        $fallback = config('languages.fallback');

        return $this->translations
            ->where('locale', $locale)
            ->where('key', $field)
            ->first()?->value
            ?? $this->translations
                ->where('locale', $fallback)
                ->where('key', $field)
                ->first()?->value
            ?? $this->{$field} 
            ?? '';
    }

    // Magic: $product->title auto-resolves to current locale
    public function __get($key)
    {
        if (in_array($key, $this->translatable ?? [])) {
            return $this->getTranslation($key);
        }
        return parent::__get($key);
    }
    
    // Use in Eloquent queries: Product::withTranslations()->get()
    public function scopeWithTranslations($query, ?string $locale = null)
    {
        $locale ??= App::getLocale();
        return $query->with(['translations' => fn($q) => 
            $q->whereIn('locale', [$locale, config('languages.fallback')])
        ]);
    }
}