<?php

namespace App\Services\Payment;

use App\Contracts\PaymentGatewayInterface;
use App\DTOs\PaymentIntentResult;
use App\DTOs\PickupScheduleData;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

final class PayrocGateway implements PaymentGatewayInterface
{
    public function __construct(
        private readonly string $apiKey,
        private readonly string $processingTerminalId,
        private readonly string $environment = 'uat',
        private readonly ?string $tokenUrl = null,
        private readonly ?string $paymentsUrl = null,
        private readonly string $channel = 'web',
        private readonly ?string $merchantId = null,
        private readonly ?string $webhookSecret = null,
    ) {}

    public function createCustomer(PickupScheduleData $data): string
    {
        // Keep the gateway contract consistent even when provider APIs are charge-first.
        return (string) Str::uuid();
    }

    public function attachPaymentMethod(string $customerId, string $paymentMethodId): void
    {
        // No-op for direct charge flow.
    }

    public function createAndConfirmPaymentIntent(
        string $customerId,
        string $paymentMethodId,
        int $amountInCents,
        string $currency,
        string $idempotencyKey,
        array $metadata = [],
        array $paymentDetails = []
    ): PaymentIntentResult {
        $token = $this->getBearerToken();
        [$expiryMonth, $expiryYear] = $this->parseExpiry($paymentDetails['card_expiry'] ?? null);

        $payload = [
            'channel' => $this->channel,
            'processingTerminalId' => $this->processingTerminalId,
            'order' => [
                'orderId' => (string) ($metadata['schedule_id'] ?? $idempotencyKey),
                'currency' => strtoupper($currency),
                'amount' => $amountInCents,
                'description' => (string) ($metadata['description'] ?? 'Belmont pickup payment'),
            ],
        ];

        if (!empty($this->merchantId)) {
            $payload['merchant_id'] = $this->merchantId;
        }

        // Exact card-based payload as documented by Payroc.
        if (!empty($paymentDetails['card_number']) && $expiryMonth !== null && $expiryYear !== null && !empty($paymentDetails['card_cvc'])) {
            $payload['paymentMethod'] = [
                'type' => 'card',
                'cardDetails' => [
                    'number' => $paymentDetails['card_number'],
                    'expiryMonth' => $expiryMonth,
                    'expiryYear' => $expiryYear,
                    'cvv' => $paymentDetails['card_cvc'],
                ],
            ];
        } elseif ($paymentMethodId !== '') {
            // Tokenized variant if frontend later sends Payroc payment token/reference.
            $payload['paymentMethod'] = [
                'type' => 'token',
                'token' => $paymentMethodId,
            ];
        } else {
            throw new \RuntimeException('Payroc card details or token are required.');
        }

        $response = Http::acceptJson()
            ->asJson()
            ->withToken($token)
            ->withHeaders([
                'Idempotency-Key' => $idempotencyKey,
            ])
            ->timeout(20)
            ->retry(2, 300)
            ->post($this->resolvePaymentsUrl(), $payload);

        $this->throwIfFailed($response, 'Payroc payment charge request failed.');

        $body = $response->json();

        $transactionId = (string) $this->firstValue($body, [
            'id',
            'transaction_id',
            'payment_id',
            'paymentId',
            'reference',
            'data.id',
            'data.paymentId',
            'data.transaction_id',
            'result.id',
        ], (string) Str::uuid());

        $status = strtolower((string) $this->firstValue($body, [
            'status',
            'payment_status',
            'data.status',
            'result.status',
            'state',
            'data.state',
        ], 'pending'));

        $clientSecret = (string) $this->firstValue($body, [
            'client_secret',
            'redirect_url',
            'data.client_secret',
            'data.redirect_url',
        ], '');

        return new PaymentIntentResult(
            paymentIntentId: $transactionId,
            clientSecret: $clientSecret,
            status: $status,
        );
    }

    public function constructWebhookEvent(string $payload, string $signature): object
    {
        if (empty($this->webhookSecret)) {
            throw new \RuntimeException('Payroc webhook secret is not configured.');
        }

        $computed = hash_hmac('sha256', $payload, $this->webhookSecret);

        if (!hash_equals($computed, $signature)) {
            throw new \RuntimeException('Invalid Payroc signature.');
        }

        $decoded = json_decode($payload);

        if (!is_object($decoded)) {
            throw new \UnexpectedValueException('Invalid webhook payload JSON.');
        }

        return $decoded;
    }

    private function getBearerToken(): string
    {
        $tokenUrl = $this->resolveTokenUrl();
        $cacheKey = 'payroc_bearer_token_' . sha1($tokenUrl . '|' . $this->apiKey);

        $cached = Cache::get($cacheKey);
        if (is_string($cached) && $cached !== '') {
            return $cached;
        }

        $response = Http::acceptJson()
            ->asJson()
            ->timeout(15)
            ->retry(2, 300)
            ->withHeaders([
                'x-api-key' => $this->apiKey,
            ])
            ->post($tokenUrl);

        $this->throwIfFailed($response, 'Payroc bearer token request failed.');

        $body = $response->json();

        $token = (string) $this->firstValue($body, [
            'access_token',
            'token',
            'bearer_token',
            'data.access_token',
            'data.token',
        ], '');

        if ($token === '') {
            throw new \RuntimeException('Payroc bearer token is missing in response.');
        }

        $ttl = (int) $this->firstValue($body, [
            'expires_in',
            'data.expires_in',
            'ttl',
        ], 600);

        $ttl = max(60, $ttl - 60);

        Cache::put($cacheKey, $token, now()->addSeconds($ttl));

        return $token;
    }

    private function firstValue(array $payload, array $keys, mixed $default = null): mixed
    {
        foreach ($keys as $key) {
            $value = Arr::get($payload, $key);
            if ($value !== null && $value !== '') {
                return $value;
            }
        }

        return $default;
    }

    private function throwIfFailed(Response $response, string $message): void
    {
        if ($response->successful()) {
            return;
        }

        throw new \RuntimeException($message . ' HTTP ' . $response->status());
    }

    private function parseExpiry(?string $expiry): array
    {
        if (!is_string($expiry) || !preg_match('/^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/', $expiry, $matches)) {
            return [null, null];
        }

        $month = $matches[1];
        $yearRaw = $matches[2];
        $year = strlen($yearRaw) === 2 ? '20' . $yearRaw : $yearRaw;

        return [$month, $year];
    }

    private function resolveTokenUrl(): string
    {
        if ($this->isUsableUrl($this->tokenUrl)) {
            return $this->tokenUrl;
        }

        return 'https://identity.payroc.com/authorize';
    }

    private function resolvePaymentsUrl(): string
    {
        if ($this->isUsableUrl($this->paymentsUrl)) {
            return $this->paymentsUrl;
        }

        return strtolower($this->environment) === 'uat'
            ? 'https://api.uat.payroc.com/v1/payments'
            : 'https://api.payroc.com/v1/payments';
    }

    private function isUsableUrl(?string $url): bool
    {
        if (!is_string($url) || trim($url) === '') {
            return false;
        }

        $trimmed = trim($url);
        if (str_contains($trimmed, '...')) {
            return false;
        }

        return filter_var($trimmed, FILTER_VALIDATE_URL) !== false;
    }
}
