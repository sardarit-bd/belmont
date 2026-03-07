<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
    protected $fillable = [
        'disk', 'path', 'url', 'mime_type', 'size_bytes',
        'original_filename', 'width', 'height',
        'folder', 'collection', 'uploaded_by',
    ];

    public function translations()
    {
        return $this->hasMany(MediaTranslation::class);
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    // Resolves correct URL regardless of disk
    public function getPublicUrl(): string
    {
        if ($this->url) return $this->url;

        return match($this->disk) {
            's3'    => Storage::disk('s3')->url($this->path),
            default => asset('storage/' . $this->path),
        };
    }

    // Get translated alt text with fallback
    public function getAltText(?string $locale = null): string
    {
        $locale   ??= App::getLocale();
        $fallback   = config('languages.fallback', 'en');

        return $this->translations->firstWhere('locale', $locale)?->alt_text
            ?? $this->translations->firstWhere('locale', $fallback)?->alt_text
            ?? $this->original_filename;   
    }

    public function isImage(): bool
    {
        return str_starts_with($this->mime_type, 'image/');
    }
}