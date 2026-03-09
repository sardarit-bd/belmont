<?php

namespace App\Models;

use App\Concerns\Translatable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasUuids, Translatable;

    protected $fillable = [
        'category_id',
        'name', 'description',
        'price', 'is_active', 'sort_order',
    ];

    protected array $translatable = ['name', 'description'];

    protected array $translatableTypes = [
        'name'        => 'text',
        'description' => 'textarea',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function getServiceAttribute()
    {
        return $this->category?->service;
    }
}