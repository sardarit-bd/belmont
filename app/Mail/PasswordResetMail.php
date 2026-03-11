<?php
// app/Mail/PasswordResetMail.php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PasswordResetMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $resetUrl;

    public function __construct(
        private readonly User $user,
        private readonly string $token,
    ) {
        $this->resetUrl = url(route('password.reset', [
            'token' => $token,
            'email' => $this->user->email,
        ], false));
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Reset Your Belmont Password',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.password-reset',
            with: [
                'user'     => $this->user,
                'resetUrl' => $this->resetUrl,
                'expiry'   => config('auth.passwords.users.expire'),
            ],
        );
    }
}