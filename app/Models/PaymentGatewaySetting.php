<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentGatewaySetting extends Model
{
    protected $fillable = [
        'gateway',
        'is_active',
        'credentials',
    ];

    protected $casts = [
        'is_active'   => 'boolean',
        'credentials' => 'encrypted:array',
    ];

    public static function getActive(): ?self
    {
        return static::where('is_active', true)->first();
    }

    public function getCredential(string $key): ?string
    {
        return $this->credentials[$key] ?? null;
    }
}