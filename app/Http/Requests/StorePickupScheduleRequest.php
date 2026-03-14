<?php

namespace App\Http\Requests;

use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;

class StorePickupScheduleRequest extends FormRequest
{
    public function authorize(): bool { return true; }

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
            'payment_method_id'    => ['required', 'string', 'starts_with:pm_'],
            'card_last_four'       => ['required', 'digits:4'],
            'card_expiry'          => ['required', 'regex:/^(0[1-9]|1[0-2])\/\d{2}$/'],
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
}