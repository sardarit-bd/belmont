<?php

namespace App\Services;

use App\Models\User;
use App\Jobs\SendPasswordResetEmail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class PasswordResetService
{
    private const MAX_ATTEMPTS = 5;
    private const DECAY_SECONDS = 60;

    public function sendResetLink(string $email, string $ip): void
    {
        $this->checkRateLimit($email, $ip);

        // Always respond the same way — prevents user enumeration
        $user = User::where('email', $email)->first();

        if ($user) {
            $token = Password::broker()->createToken($user);
            SendPasswordResetEmail::dispatch($user, $token);
        }

        // Always increment hits regardless of whether user exists
        RateLimiter::hit($this->throttleKey($email, $ip), self::DECAY_SECONDS);

        \Log::info('PasswordResetService called', ['email' => $email]);
    }

    public function reset(array $credentials): void
    {
        $status = Password::broker()->reset(
            $credentials,
            function (User $user, string $password) {
                $user->forceFill([
                    'password'       => bcrypt($password),
                    'remember_token' => Str::random(60),
                ])->save();
            }
        );

        if ($status !== Password::PASSWORD_RESET) {
            throw ValidationException::withMessages([
                'email' => [__($status)],
            ]);
        }
    }

    private function checkRateLimit(string $email, string $ip): void
    {
        $key = $this->throttleKey($email, $ip);

        if (RateLimiter::tooManyAttempts($key, self::MAX_ATTEMPTS)) {
            $seconds = RateLimiter::availableIn($key);
            throw ValidationException::withMessages([
                'email' => ["Too many attempts. Please wait {$seconds} seconds."],
            ]);
        }
    }

    private function throttleKey(string $email, string $ip): string
    {
        return 'password-reset:' . Str::lower($email) . '|' . $ip;
    }
}