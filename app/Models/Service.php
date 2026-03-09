<?php

namespace App\Models;

use App\Concerns\Translatable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasUuids, Translatable;

    protected $fillable = ['name', 'slug', 'description', 'is_active', 'sort_order'];

    protected array $translatable = ['name', 'description'];

    protected array $translatableTypes = [
        'name'        => 'text',
        'description' => 'textarea',
    ];

    public function media()
    {
        return $this->belongsTo(Media::class);
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }
}