<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MediaTranslation extends Model
{
    protected $fillable = ['media_id', 'locale', 'alt_text', 'caption'];

    public function media()
    {
        return $this->belongsTo(Media::class);
    }
}