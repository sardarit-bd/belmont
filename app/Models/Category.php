<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasUuids;

    protected $fillable = ['name', 'slug', 'sort_order'];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
