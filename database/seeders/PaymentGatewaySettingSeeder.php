<?php

namespace Database\Seeders;

use App\Models\PaymentGatewaySetting;
use Illuminate\Database\Seeder;

class PaymentGatewaySettingSeeder extends Seeder
{
    public function run(): void
    {
        PaymentGatewaySetting::updateOrCreate(
            ['gateway' => 'stripe'],
            [
                'is_active'   => true,
                'credentials' => [
                    'public_key'      => config('services.stripe.key'),
                    'secret_key'      => config('services.stripe.secret'),
                    'webhook_secret'  => config('services.stripe.webhook_secret'),
                ],
            ]
        );
    }
}