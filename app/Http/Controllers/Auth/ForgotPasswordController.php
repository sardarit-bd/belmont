<?php
// app/Http/Controllers/Auth/ForgotPasswordController.php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Services\PasswordResetService;

class ForgotPasswordController extends Controller
{
    public function __construct(
        private readonly PasswordResetService $service,
    ) {}

    public function store(ForgotPasswordRequest $request): \Illuminate\Http\JsonResponse
    {
        $this->service->sendResetLink(
            $request->validated('email'),
            $request->ip(),
        );

        return response()->json([
            'message' => 'If that email is registered, a reset link is on its way.',
        ]);
    }
}