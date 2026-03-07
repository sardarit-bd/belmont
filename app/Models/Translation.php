<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Translation extends Model
{
    protected $fillable = ['locale', 'key', 'field_type', 'value'];

    protected $casts = [
        'field_type' => 'string',
    ];

    public function translatable()
    {
        return $this->morphTo();
    }
}