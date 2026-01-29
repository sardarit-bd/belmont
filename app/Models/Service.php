<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasUuids;

    protected $fillable = ['name', 'slug', 'description', 'image_path', 'is_active'];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
