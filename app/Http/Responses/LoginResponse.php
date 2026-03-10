<?php

namespace App\Http\Responses;

use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request)
    {
        $user = Auth::user()->load('role');

        $redirectUrl = $user->hasAnyRole(['admin', 'driver', 'cleaner'])
            ? '/admin'
            : '/dashboard';

        // Force full page reload — bypass Inertia
        return response('', 409)
            ->header('X-Inertia-Location', $redirectUrl);
    }
}