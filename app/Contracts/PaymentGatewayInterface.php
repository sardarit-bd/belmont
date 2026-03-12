<?php

namespace App\Contracts;

use App\DTOs\PaymentIntentResult;
use App\DTOs\PickupScheduleData;

/**
 * Strategy contract for payment gateways.
 * Implement this interface to add any gateway (Stripe, PayPal, CoD, etc.)
 * without touching controllers, services, or repositories.
 */
interface PaymentGatewayInterface
{
    /**
     * Create a customer record in the gateway and return a gateway customer ID.
     */
    public function createCustomer(PickupScheduleData $data): string;

    /**
     * Attach a payment method to an existing gateway customer.
     * After this the card is vaulted — reusable for future charges.
     */
    public function attachPaymentMethod(string $customerId, string $paymentMethodId): void;

    /**
     * Create and confirm a payment intent immediately (charge now).
     *
     * @param  string  $idempotencyKey  Unique per booking — prevents double-charging on retry.
     */
    public function createAndConfirmPaymentIntent(
        string $customerId,
        string $paymentMethodId,
        int $amountInCents,
        string $currency,
        string $idempotencyKey,
        array $metadata = []
    ): PaymentIntentResult;

    /**
     * Verify a raw webhook payload against its signature.
     * Must also reject events older than 5 minutes (replay protection).
     *
     * @throws \Exception on invalid signature or stale event.
     */
    public function constructWebhookEvent(string $payload, string $signature): object;
}