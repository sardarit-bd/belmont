<?php

namespace App\Http\Controllers;

use App\Contracts\PaymentGatewayInterface;
use App\Services\PickupScheduleService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Stripe\Exception\SignatureVerificationException;
use UnexpectedValueException;

class StripeWebhookController extends Controller
{
    public function __construct(
        private readonly PaymentGatewayInterface $paymentGateway,
        private readonly PickupScheduleService $service,
    ) {}

    /**
     * Handle incoming Stripe webhook.
     *
     * Security layers:
     *  1. Stripe-Signature header verified before any business logic.
     *  2. Event age validated inside constructWebhookEvent (5-min tolerance).
     *  3. All DB work is idempotent — duplicate deliveries are safe.
     *  4. Always returns 200 on logic errors so Stripe stops retrying.
     *     Returns 400 only on invalid/forged signatures.
     */
    public function handle(Request $request): Response
    {
        $payload   = $request->getContent();
        $signature = $request->header('Stripe-Signature', '');

        if (empty($signature)) {
            Log::warning('Stripe webhook: missing signature header', [
                'ip' => $request->ip(),
            ]);
            return response('Missing signature', 400);
        }

        // Step 1 — Verify signature and event age
        try {
            $event = $this->paymentGateway->constructWebhookEvent($payload, $signature);
        } catch (SignatureVerificationException | UnexpectedValueException $e) {
            Log::warning('Stripe webhook: signature verification failed', [
                'error' => $e->getMessage(),
                'ip'    => $request->ip(),
            ]);
            return response('Invalid signature', 400);
        }

        // Step 2 — Route to the correct handler
        try {
            match ($event->type) {
                'payment_intent.succeeded'      => $this->handlePaymentSucceeded($event->data->object),
                'payment_intent.payment_failed' => $this->handlePaymentFailed($event->data->object),
                default => Log::debug('Stripe webhook: unhandled event type', ['type' => $event->type]),
            };
        } catch (\Throwable $e) {
            // Log but return 200 — prevents Stripe from retrying on application errors.
            // Stripe will retry on 4xx/5xx, so we swallow and alert instead.
            Log::error('Stripe webhook: handler threw an exception', [
                'event_id'   => $event->id,
                'event_type' => $event->type,
                'error'      => $e->getMessage(),
                'trace'      => $e->getTraceAsString(),
            ]);
        }

        return response('OK', 200);
    }

    private function handlePaymentSucceeded(object $paymentIntent): void
    {
        Log::info('Stripe webhook: payment succeeded', [
            'payment_intent_id' => $paymentIntent->id,
        ]);

        $this->service->confirmBooking($paymentIntent->id);
    }

    private function handlePaymentFailed(object $paymentIntent): void
    {
        Log::warning('Stripe webhook: payment failed', [
            'payment_intent_id'  => $paymentIntent->id,
            'failure_message'    => $paymentIntent->last_payment_error?->message,
            'failure_code'       => $paymentIntent->last_payment_error?->code,
        ]);

        $this->service->markPaymentFailed($paymentIntent->id);
    }
}