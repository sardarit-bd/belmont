<?php
// app/Jobs/SendPasswordResetEmail.php

namespace App\Jobs;

use App\Mail\PasswordResetMail;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendPasswordResetEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $backoff = 30;

    public function __construct(
        private readonly User $user,
        private readonly string $token,
    ) {}

    public function handle(): void
    {
        Mail::to($this->user->email)
            ->send(new PasswordResetMail($this->user, $this->token));
    }

    public function failed(\Throwable $exception): void
    {
        Log::error('Password reset email failed', [
            'user_id' => $this->user->id,
            'error'   => $exception->getMessage(),
        ]);
    }
}