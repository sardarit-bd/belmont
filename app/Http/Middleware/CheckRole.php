<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (!Auth::check()) {
            return redirect('/login');
        }

        $user = Auth::user()->load('role');

        if ($user->hasAnyRole($roles)) {
            return $next($request);
        }

        // Wrong role — redirect to correct panel
        if ($user->hasAnyRole(['admin', 'driver', 'cleaner'])) {
            return redirect('/admin');
        }

        return redirect('/dashboard');
    }
}