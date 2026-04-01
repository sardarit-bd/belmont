<?php

namespace App\Http\Requests;

use App\Models\PaymentGatewaySetting;
use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;

class StorePickupScheduleRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    protected function prepareForValidation(): void
    {
        $cardNumber = preg_replace('/\D+/', '', (string) $this->input('card_number', ''));
        $cardCvc = preg_replace('/\D+/', '', (string) $this->input('card_cvc', ''));

        $this->merge([
            'card_number' => $cardNumber !== '' ? $cardNumber : null,
            'card_cvc' => $cardCvc !== '' ? $cardCvc : null,
        ]);
    }

    public function rules(): array
    {
        return [
            'full_name'            => ['required', 'string', 'max:255'],
            'phone_number'         => ['required', 'regex:/^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/'],
            'street'               => ['required', 'string', 'max:255'],
            'city'                 => ['required', 'string', 'max:255'],
            'zip'                  => ['required', 'regex:/^\d{5}(-\d{4})?$/'],
            'pickup_date'          => ['required', 'date', 'after_or_equal:today'],
            'preferred_time'       => ['required', 'date_format:H:i'],
            'special_instructions' => ['nullable', 'string', 'max:1000'],
            'cardholder_name'      => ['required', 'string', 'max:255'],
            'payment_method_id'    => ['nullable', 'string', 'max:255'],
            'card_last_four'       => ['required', 'digits:4'],
            'card_expiry'          => ['required', 'regex:/^(0[1-9]|1[0-2])\/\d{2}$/'],
            'card_number'          => ['nullable', 'digits_between:13,19'],
            'card_cvc'             => ['nullable', 'digits_between:3,4'],
            'items'                => ['required', 'array', 'min:1'],
            'items.*.id'           => ['required', 'uuid'],
            'items.*.name'         => ['required', 'string'],
            'items.*.price'        => ['required', 'numeric', 'min:0'],
            'items.*.quantity'     => ['required', 'integer', 'min:1', 'max:50'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $gateway = $this->resolveGateway();

            if ($gateway === 'stripe') {
                if (!str_starts_with((string) $this->input('payment_method_id', ''), 'pm_')) {
                    $validator->errors()->add(
                        'payment_method_id',
                        'A valid Stripe payment method token is required.'
                    );
                }
            }

            if ($gateway === 'payroc') {
                $hasToken = filled($this->input('payment_method_id'));
                $hasCard = filled($this->input('card_number')) && filled($this->input('card_cvc'));

                if (!$hasToken && !$hasCard) {
                    $validator->errors()->add(
                        'payment_method_id',
                        'Provide a Payroc payment token, or card number and CVC for direct charge.'
                    );
                }
            }

            foreach ($this->input('items', []) as $index => $item) {
                $product = Product::find($item['id'] ?? null);

                // Product must exist
                if (!$product) {
                    $validator->errors()->add(
                        "items.{$index}.id",
                        'Product not found.'
                    );
                    continue;
                }

                // Product must be active
                if (!$product->is_active) {
                    $validator->errors()->add(
                        "items.{$index}.id",
                        "Product \"{$product->name}\" is no longer available."
                    );
                }

                // Price must match DB — prevent client-side tampering
                if (isset($item['price']) && (float) $item['price'] !== (float) $product->price) {
                    $validator->errors()->add(
                        "items.{$index}.price",
                        "Price mismatch for \"{$product->name}\". Please refresh and try again."
                    );
                }
            }
        });
    }

    private function resolveGateway(): string
    {
        $forcedGateway = env('PAYMENT_GATEWAY_FORCE');
        $supportedGateways = array_keys((array) config('payment.gateways', []));

        if (is_string($forcedGateway) && in_array($forcedGateway, $supportedGateways, true)) {
            return $forcedGateway;
        }

        return PaymentGatewaySetting::where('is_active', true)->value('gateway')
            ?? config('payment.default');
    }
}
