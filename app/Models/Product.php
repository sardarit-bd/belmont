<?php

namespace App\Models;

use App\Concerns\Translatable;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use Translatable;

    protected $fillable = [
        'name', 'description', 'is_active'
    ];

    protected array $translatable = ['name', 'description'];

    protected array $translatableTypes = [
        'name'        => 'text',
        'description' => 'textarea',
    ];
}