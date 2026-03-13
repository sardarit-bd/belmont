<?php

namespace App\Filament\Resources\PaymentGatewaySettings\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;

class PaymentGatewaySettingForm
{
    // Credential fields per gateway — add new gateways here as you expand
    private static array $credentialFields = [
        'stripe' => [
            ['key' => 'public_key',     'label' => 'Publishable Key',  'prefix' => 'pk_'],
            ['key' => 'secret_key',     'label' => 'Secret Key',       'prefix' => 'sk_'],
            ['key' => 'webhook_secret', 'label' => 'Webhook Secret',   'prefix' => 'whsec_'],
        ],
        'paypal' => [
            ['key' => 'client_id',     'label' => 'Client ID',     'prefix' => null],
            ['key' => 'client_secret', 'label' => 'Client Secret', 'prefix' => null],
            ['key' => 'webhook_id',    'label' => 'Webhook ID',    'prefix' => null],
        ],
    ];

    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Gateway Configuration')
                    ->description('Select the payment gateway and configure its credentials.')
                    ->icon(\Filament\Support\Icons\Heroicon::OutlinedCreditCard)
                    ->schema([
                        Select::make('gateway')
                            ->label('Payment Gateway')
                            ->options(array_combine(
                                array_keys(self::$credentialFields),
                                array_map('ucfirst', array_keys(self::$credentialFields))
                            ))
                            ->required()
                            ->native(false)
                            ->live()
                            ->columnSpanFull(),

                        Toggle::make('is_active')
                            ->label('Set as Active Gateway')
                            ->helperText('Only one gateway can be active at a time. Activating this will deactivate others.')
                            ->columnSpanFull()
                            ->afterStateUpdated(function ($state, $record) {
                                if ($state && $record) {
                                    \App\Models\PaymentGatewaySetting::where('id', '!=', $record->id)
                                        ->update(['is_active' => false]);
                                    \Illuminate\Support\Facades\Cache::forget('active_payment_gateway');
                                }
                            })
                            ->live(),
                    ]),

                Section::make('Credentials')
                    ->description('All credentials are encrypted before being stored in the database.')
                    ->icon(\Filament\Support\Icons\Heroicon::OutlinedLockClosed)
                    ->schema(function (Get $get): array {
                        $gateway = $get('gateway');

                        if (!$gateway || !isset(self::$credentialFields[$gateway])) {
                            return [
                                \Filament\Forms\Components\Placeholder::make('no_gateway')
                                    ->label('')
                                    ->content('Select a gateway above to configure its credentials.'),
                            ];
                        }

                        return array_map(function ($field) {
                            return TextInput::make("credentials.{$field['key']}")
                                ->label($field['label'])
                                ->password()
                                ->revealable()
                                ->required()
                                ->placeholder($field['prefix'] ? "{$field['prefix']}..." : 'Enter value...')
                                ->helperText("Starts with: {$field['prefix']}" ?? null);
                        }, self::$credentialFields[$gateway]);
                    })
                    ->columns(1),
            ]);
    }
}