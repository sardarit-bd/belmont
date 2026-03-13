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

            $setting = cache()->rememberForever('active_payment_gateway', function () {
                return PaymentGatewaySetting::getActive();
            });

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

            return $this->app->make($concrete, [
                'secretKey'     => $setting->getCredential('secret_key'),
                'webhookSecret' => $setting->getCredential('webhook_secret'),
            ]);
        });
    }
}