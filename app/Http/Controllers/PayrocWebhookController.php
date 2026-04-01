<?php

namespace App\Http\Controllers;

use App\Contracts\PaymentGatewayInterface;
use App\Services\PickupScheduleService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

class PayrocWebhookController extends Controller
{
    public function __construct(
        private readonly PaymentGatewayInterface $paymentGateway,
        private readonly PickupScheduleService $service,
    ) {}

    public function handle(Request $request): Response
    {
        $payload = $request->getContent();
        $signature = (string) $request->header('X-Payroc-Signature', '');

        if ($signature === '') {
            Log::warning('Payroc webhook: missing signature header', ['ip' => $request->ip()]);
            return response('Missing signature', 400);
        }

        try {
            $event = $this->paymentGateway->constructWebhookEvent($payload, $signature);
        } catch (\Throwable $e) {
            Log::warning('Payroc webhook: signature verification failed', [
                'error' => $e->getMessage(),
                'ip'    => $request->ip(),
            ]);
            return response('Invalid signature', 400);
        }

        try {
            $eventType = strtolower((string) (Arr::get((array) $event, 'type')
                ?? Arr::get((array) $event, 'event_type')
                ?? Arr::get((array) $event, 'data.type')
                ?? ''));

            $transactionId = (string) (Arr::get((array) $event, 'transaction_id')
                ?? Arr::get((array) $event, 'id')
                ?? Arr::get((array) $event, 'data.transaction_id')
                ?? Arr::get((array) $event, 'data.id')
                ?? '');

            if ($transactionId === '') {
                Log::warning('Payroc webhook: missing transaction id', ['event_type' => $eventType]);
                return response('OK', 200);
            }

            match ($eventType) {
                'payment.succeeded', 'payment_success', 'charge.succeeded', 'approved', 'paid'
                    => $this->service->confirmBooking($transactionId),
                'payment.failed', 'payment_failure', 'charge.failed', 'declined', 'failed'
                    => $this->service->markPaymentFailed($transactionId),
                default => Log::debug('Payroc webhook: unhandled event type', ['type' => $eventType]),
            };
        } catch (\Throwable $e) {
            Log::error('Payroc webhook: handler exception', [
                'error' => $e->getMessage(),
            ]);
        }

        return response('OK', 200);
    }
}
