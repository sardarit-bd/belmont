<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactMessageRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'    => ['required', 'string', 'max:255'],
            'email'   => ['required', 'email', 'max:255'],
            'phone'   => ['nullable', 'regex:/^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/'],
            'message' => ['required', 'string', 'max:5000'],
        ];
    }
}
