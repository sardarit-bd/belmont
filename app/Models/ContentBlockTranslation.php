<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContentBlockTranslation extends Model
{
    protected $fillable = ['locale', 'value', 'updated_by'];

    public function contentBlock()
    {
        return $this->belongsTo(ContentBlock::class);
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}