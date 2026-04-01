<?php

use App\Services\Payment\PayrocGateway;
use App\Services\Payment\StripeGateway;

return [
    /*
    |--------------------------------------------------------------------------
    | Default Payment Gateway
    |--------------------------------------------------------------------------
    | Supported: "stripe", "payroc", "paypal", "cod"
    */
    'default' => env('PAYMENT_GATEWAY', 'stripe'),

    'gateways' => [
        'stripe' => StripeGateway::class,
        'payroc' => PayrocGateway::class,
    ],
];
