<?php

namespace App\Http\Middleware;

use Filament\Http\Middleware\Authenticate as BaseAuthenticate;

class FilamentAuthenticate extends BaseAuthenticate
{
    protected function redirectTo($request): ?string
    {
        return '/login';
    }
}