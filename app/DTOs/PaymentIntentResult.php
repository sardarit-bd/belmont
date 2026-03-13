<?php

namespace App\DTOs;

readonly class PaymentIntentResult
{
    public function __construct(
        public string $paymentIntentId,
        public string $clientSecret,
        public string $status,
    ) {}
}