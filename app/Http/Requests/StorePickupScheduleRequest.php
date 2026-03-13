<?php

namespace App\Http\Requests;

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
            'items.*.quantity'     => ['required', 'integer', 'min:1'],
        ];
    }
}