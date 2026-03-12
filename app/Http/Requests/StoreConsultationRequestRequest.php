<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreConsultationRequestRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'package'      => ['required', 'in:wedding,corporate,hospitality'],
            'first_name'   => ['required', 'string', 'max:255'],
            'last_name'    => ['required', 'string', 'max:255'],
            'email'        => ['required', 'email', 'max:255'],
            'phone'        => ['required', 'regex:/^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/'],
            'company'      => ['nullable', 'string', 'max:255'],
            'service_type' => ['required', 'in:wedding,corporate,hospitality,theatre'],
            'item_count'   => ['required', 'in:1-40,41-100,101-200,201-500'],
            'needed_by'    => ['nullable', 'date', 'after_or_equal:today'],
            'details'      => ['nullable', 'string', 'max:2000'],
        ];
    }
}