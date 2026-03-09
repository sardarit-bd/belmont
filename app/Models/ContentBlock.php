<?php

namespace App\Models;

use App\Services\CacheService;
use Illuminate\Support\Facades\App;
use Illuminate\Database\Eloquent\Model;

class ContentBlock extends Model
{
    protected $fillable = [
        'section', 'key', 'type', 'is_active', 'order', 'meta', 'media_id'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'meta'      => 'array',
    ];

    public function media()
    {
        return $this->belongsTo(Media::class);
    }

    public function translations()
    {
        return $this->hasMany(ContentBlockTranslation::class);
    }

    public static function get(string $section, string $key, ?string $locale = null): string
    {
        $section = static::getSection($section, $locale);
        return $section[$key] ?? '';
    }

    public static function getSection(string $section, ?string $locale = null): array
    {
        $locale   ??= App::getLocale();
        $fallback   = config('languages.fallback', 'en');
        $cacheKey   = "content:{$section}:{$locale}";

        return app(CacheService::class)->remember($cacheKey, function () use ($section, $locale, $fallback) {
            return static::where('section', $section)
                ->where('is_active', true)
                ->with([
                    'translations' => fn($q) => $q->whereIn('locale', [$locale, $fallback]),
                    'media',
                ])
                ->orderBy('order')
                ->get()
                ->mapWithKeys(function ($block) use ($locale, $fallback) {

                    if ($block->type === 'image') {
                        return [$block->key => [
                            'url'      => $block->media?->getPublicUrl(),
                            'alt_text' => $block->media?->getAltText($locale),
                            'width'    => $block->media?->width,
                            'height'   => $block->media?->height,
                        ]];
                    }

                    $value = $block->translations->firstWhere('locale', $locale)?->value
                        ?? $block->translations->firstWhere('locale', $fallback)?->value
                        ?? '';

                    return [$block->key => $value];
                })
                ->toArray();
        }, 3600);
    }
    /**
     * Call this after admin updates content.
     * Busts cache for all locales of this section.
     */
    public static function bustCache(string $section): void
    {
        app(CacheService::class)->flushPattern("content:{$section}:*");
    }

    public function getImageUrlAttribute(): ?string
    {
        if ($this->type !== 'image') return null;

        $path = $this->meta['image_path'] ?? null;
        return $path ? asset('storage/' . $path) : null;
    }

    public function setImagePath(string $path): void
    {
        $this->update([
            'meta' => array_merge($this->meta ?? [], ['image_path' => $path])
        ]);
    }
}