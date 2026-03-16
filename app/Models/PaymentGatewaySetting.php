<?php

namespace App\Models;

use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

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
        try {
            return $this->credentials[$key] ?? null;
        } catch (DecryptException $e) {
            Log::error('PaymentGatewaySetting: failed to decrypt credentials — APP_KEY may have changed.', [
                'gateway' => $this->gateway,
                'error'   => $e->getMessage(),
            ]);

            return null;
        }
    }
}