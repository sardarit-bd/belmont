<?php

namespace App\Models;

use App\Concerns\Translatable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasUuids, Translatable;

    protected $fillable = [
        'category_id', 'service_id',
        'name', 'description',
        'price', 'is_active',
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

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}