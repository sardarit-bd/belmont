<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * Stripe signs its webhook payloads with STRIPE_WEBHOOK_SECRET.
     * CSRF protection is not applicable — and would break webhook delivery.
     */
    protected $except = [
        'webhooks/stripe',
    ];
}