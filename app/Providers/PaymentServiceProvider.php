<?php

namespace App\Providers;

use App\Contracts\PaymentGatewayInterface;
use App\Models\PaymentGatewaySetting;
use Illuminate\Support\ServiceProvider;

class PaymentServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(PaymentGatewayInterface::class, function () {
            $forcedGateway = env('PAYMENT_GATEWAY_FORCE');
            $supportedGateways = array_keys((array) config('payment.gateways', []));
            $isForcedGatewayValid = is_string($forcedGateway) && in_array($forcedGateway, $supportedGateways, true);

            if ($isForcedGatewayValid) {
                $setting = PaymentGatewaySetting::where('gateway', $forcedGateway)->first();
            } else {
                $setting = PaymentGatewaySetting::getActive();
            }

            if (!$setting && $isForcedGatewayValid) {
                $concrete = config("payment.gateways.{$forcedGateway}");

                if (!$concrete || !class_exists($concrete)) {
                    throw new \InvalidArgumentException(
                        "Payment gateway [{$forcedGateway}] is not supported or not configured."
                    );
                }

                return match ($forcedGateway) {
                    'payroc' => $this->app->make($concrete, [
                        'apiKey'        => env('PAYROC_API_KEY')
                            ?: throw new \RuntimeException('Missing PAYROC_API_KEY in .env'),
                        'processingTerminalId' => env('PAYROC_TERMINAL_ID')
                            ?: throw new \RuntimeException('Missing PAYROC_TERMINAL_ID in .env'),
                        'environment'   => env('PAYROC_ENV', 'uat'),
                        'tokenUrl'      => env('PAYROC_TOKEN_URL'),
                        'paymentsUrl'   => env('PAYROC_PAYMENTS_URL'),
                        'channel'       => env('PAYROC_CHANNEL', 'web'),
                        'merchantId'    => env('PAYROC_MERCHANT_ID'),
                        'webhookSecret' => env('PAYROC_WEBHOOK_SECRET'),
                    ]),
                    'stripe' => $this->app->make($concrete, [
                        'secretKey'     => env('STRIPE_SECRET')
                            ?: throw new \RuntimeException('Missing STRIPE_SECRET in .env'),
                        'webhookSecret' => env('STRIPE_WEBHOOK_SECRET'),
                    ]),
                    default => throw new \InvalidArgumentException(
                        "Forced payment gateway [{$forcedGateway}] fallback is not implemented."
                    ),
                };
            }

            if (!$setting) {
                throw new \RuntimeException(
                    'No active payment gateway found. Please configure one in the admin panel.'
                );
            }

            $concrete = config("payment.gateways.{$setting->gateway}");

            if (!$concrete || !class_exists($concrete)) {
                throw new \InvalidArgumentException(
                    "Payment gateway [{$setting->gateway}] is not supported or not configured."
                );
            }

            return match ($setting->gateway) {
                'stripe' => $this->app->make($concrete, [
                    'secretKey'     => $setting->getCredential('secret_key'),
                    'webhookSecret' => $setting->getCredential('webhook_secret'),
                ]),
                'payroc' => $this->app->make($concrete, [
                    'apiKey'        => $setting->getCredential('api_key')
                        ?? $setting->getCredential('app_key')
                        ?? throw new \RuntimeException('Payroc api_key is missing.'),
                    'processingTerminalId' => $setting->getCredential('terminal_id')
                        ?? $setting->getCredential('processing_terminal_id')
                        ?? throw new \RuntimeException('Payroc terminal_id is missing.'),
                    'environment'   => $setting->getCredential('environment')
                        ?? env('PAYROC_ENV', 'uat'),
                    'tokenUrl'      => $setting->getCredential('token_url') ?: env('PAYROC_TOKEN_URL'),
                    'paymentsUrl'   => $setting->getCredential('payments_url') ?: env('PAYROC_PAYMENTS_URL'),
                    'channel'       => $setting->getCredential('channel') ?: (env('PAYROC_CHANNEL', 'web')),
                    'merchantId'    => $setting->getCredential('merchant_id'),
                    'webhookSecret' => $setting->getCredential('webhook_secret'),
                ]),
                default => throw new \InvalidArgumentException(
                    "Payment gateway [{$setting->gateway}] binding is not implemented."
                ),
            };
        });
    }
}
