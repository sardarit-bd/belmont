<?php

namespace App\Models;

use App\Concerns\Translatable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasUuids, Translatable;

    protected $fillable = ['name', 'slug', 'description', 'sort_order'];

    protected array $translatable = ['name', 'description'];

    protected array $translatableTypes = [
        'name'        => 'text',
        'description' => 'textarea',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}