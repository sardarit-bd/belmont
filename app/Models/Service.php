<?php

namespace App\Models;

use App\Concerns\Translatable;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use Translatable;

    protected $fillable = [
        'name', 'description', 'price_note', 'is_active'
    ];

    protected array $translatable = ['name', 'description', 'price_note'];

    protected array $translatableTypes = [
        'name'        => 'text',
        'description' => 'textarea',
        'price_note'  => 'text',
    ];
}