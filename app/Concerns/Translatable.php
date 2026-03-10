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

    /**
     * Define in each model:
     *
     * protected array $translatable = ['name', 'description'];
     *
     * protected array $translatableTypes = [
     *     'name'        => 'text',
     *     'description' => 'textarea',
     *     'body'        => 'richtext',
     *     'slug'        => 'slug',
     * ];
     */
    public function getTranslatableFields(): array
    {
        return $this->translatable ?? [];
    }

    public function getFieldType(string $key): string
    {
        return $this->translatableTypes[$key] ?? 'text';
    }

    public function getTranslation(string $key, ?string $locale = null): string
    {
        $locale   ??= App::getLocale();
        $fallback   = config('languages.fallback', 'en');


        return $this->translations
            ->where('locale', $locale)
            ->where('key', $key)
            ->first()?->value
            ?? $this->translations
                ->where('locale', $fallback)
                ->where('key', $key)
                ->first()?->value
            ?? $this->getRawOriginal($key) 
            ?? '';
    }

    public function setTranslation(string $key, string $locale, string $value): void
    {
        // Validate key is in translatable array — prevents silent typos
        if (!in_array($key, $this->getTranslatableFields())) {
            throw new \InvalidArgumentException(
                "Field [{$key}] is not translatable on " . static::class
            );
        }

        $this->translations()->updateOrCreate(
            ['locale' => $locale, 'key' => $key],
            [
                'value'      => $value,
                'field_type' => $this->getFieldType($key),
            ]
        );
    }

    public function __get($key)
    {
        if (in_array($key, $this->translatable ?? [])) {
            return $this->getTranslation($key);
        }
        return parent::__get($key);
    }

    public function scopeWithTranslations($query, ?string $locale = null)
    {
        $locale ??= App::getLocale();

        return $query->with(['translations' => fn($q) =>
            $q->whereIn('locale', [$locale, config('languages.fallback', 'en')])
        ]);
    }
}