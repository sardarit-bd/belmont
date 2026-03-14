<?php

namespace App\Models;

use App\Concerns\Translatable;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use Translatable;

    protected $fillable = [
        'customer_name',
        'designation',
        'company',
        'review',
        'rating',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active'  => 'boolean',
        'rating'     => 'integer',
        'sort_order' => 'integer',
    ];

    protected array $translatable = ['review'];

    protected array $translatableTypes = [
        'review' => 'textarea',
    ];
}