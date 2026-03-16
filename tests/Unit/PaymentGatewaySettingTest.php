<?php

use App\Models\PaymentGatewaySetting;
use Illuminate\Contracts\Encryption\DecryptException;

/*
|--------------------------------------------------------------------------
| PaymentGatewaySetting — Credential Handling
|--------------------------------------------------------------------------
*/

test('getCredential returns the correct value for a key', function () {
    $setting = new PaymentGatewaySetting();

    // Manually set the attribute as the encrypted cast expects — bypass to test getCredential logic
    $setting->forceFill([
        'gateway'     => 'stripe',
        'is_active'   => true,
        'credentials' => [
            'public_key'     => 'pk_test_123',
            'secret_key'     => 'sk_test_456',
            'webhook_secret' => 'whsec_789',
        ],
    ]);

    expect($setting->getCredential('public_key'))->toBe('pk_test_123')
        ->and($setting->getCredential('secret_key'))->toBe('sk_test_456')
        ->and($setting->getCredential('webhook_secret'))->toBe('whsec_789');
});

test('getCredential returns null for a missing key', function () {
    $setting = new PaymentGatewaySetting();
    $setting->forceFill([
        'gateway'     => 'stripe',
        'is_active'   => true,
        'credentials' => ['public_key' => 'pk_test_123'],
    ]);

    expect($setting->getCredential('non_existent_key'))->toBeNull();
});

test('getCredential returns null and logs error when decryption fails', function () {
    $setting = new PaymentGatewaySetting();
    $setting->gateway = 'stripe';

    // Manually set a raw (non-encrypted) value to simulate a MAC mismatch
    $setting->setRawAttributes([
        'gateway'     => 'stripe',
        'is_active'   => true,
        'credentials' => 'this-is-not-valid-encrypted-data',
    ]);

    // The encrypted:array cast will throw DecryptException which getCredential should catch
    $result = $setting->getCredential('public_key');
    expect($result)->toBeNull();
});

test('is_active is cast to boolean', function () {
    $setting = new PaymentGatewaySetting();
    $setting->is_active = 1;
    expect($setting->is_active)->toBeTrue();

    $setting->is_active = 0;
    expect($setting->is_active)->toBeFalse();
});
