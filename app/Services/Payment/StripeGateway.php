<?php

namespace App\Services\Payment;

use App\Contracts\PaymentGatewayInterface;
use App\DTOs\PaymentIntentResult;
use App\DTOs\PickupScheduleData;
use Stripe\Exception\SignatureVerificationException;
use Stripe\StripeClient;
use Stripe\Webhook;
use UnexpectedValueException;

final class StripeGateway implements PaymentGatewayInterface
{
    private StripeClient $client;

    public function __construct(
        string $secretKey,
        private readonly string $webhookSecret,
    ) {
        $this->client = new StripeClient($secretKey);
    }

    /**
     * Create a Stripe Customer and vault their identity.
     */
    public function createCustomer(PickupScheduleData $data): string
    {
        $customer = $this->client->customers->create([
            'name'  => $data->fullName,
            'phone' => $data->phoneNumber,
            'address' => [
                'line1'       => $data->street,
                'city'        => $data->city,
                'postal_code' => $data->zip,
                'country'     => 'US',
            ],
            'metadata' => [
                'pickup_date' => $data->pickupDate,
            ],
        ]);

        return $customer->id;
    }

    /**
     * Attach a PaymentMethod to a Stripe Customer and set it as default.
     * The card is now vaulted — can be reused, subscribed, or charged later.
     */
    public function attachPaymentMethod(string $customerId, string $paymentMethodId): void
    {
        $this->client->paymentMethods->attach($paymentMethodId, [
            'customer' => $customerId,
        ]);

        // Set as default so future charges and invoices use this card
        $this->client->customers->update($customerId, [
            'invoice_settings' => [
                'default_payment_method' => $paymentMethodId,
            ],
        ]);
    }

    /**
     * Create and immediately confirm a PaymentIntent (charge now).
     *
     * Idempotency key prevents double-charging on network retries.
     * Returns client_secret for frontend 3DS confirmation if required.
     */
    public function createAndConfirmPaymentIntent(
        string $customerId,
        string $paymentMethodId,
        int $amountInCents,
        string $currency,
        string $idempotencyKey,
        array $metadata = [],
        array $paymentDetails = []
    ): PaymentIntentResult {
        $intent = $this->client->paymentIntents->create(
            [
                'amount'              => $amountInCents,
                'currency'            => $currency,
                'customer'            => $customerId,
                'payment_method'      => $paymentMethodId,
                'confirmation_method' => 'manual',
                'confirm'             => true,
                'return_url'          => config('app.url') . '/schedule/complete',
                'metadata'            => $metadata,
            ],
            [
                // Stripe idempotency header — same key = same intent, no duplicate charge
                'idempotency_key' => $idempotencyKey,
            ]
        );

        return new PaymentIntentResult(
            paymentIntentId: $intent->id,
            clientSecret:    $intent->client_secret,
            status:          $intent->status,
        );
    }

    /**
     * Verify Stripe webhook signature and reject stale events.
     *
     * Two layers of protection:
     *  1. Signature verification — rejects forged/tampered payloads.
     *  2. Age check — rejects replayed events older than 5 minutes.
     *
     * @throws SignatureVerificationException|UnexpectedValueException|\RuntimeException
     */
    public function constructWebhookEvent(string $payload, string $signature): object
    {
        return Webhook::constructEvent(
            $payload,
            $signature,
            $this->webhookSecret,
            Webhook::DEFAULT_TOLERANCE
        );
    }
}
