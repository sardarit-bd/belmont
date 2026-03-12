<?php

namespace App\Notifications;

use App\Models\ContactMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactMessageReceived extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(private readonly ContactMessage $message)
    {
        $this->onQueue('notifications');
    }

    public function via(object $notifiable): array { return ['mail']; }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Contact Message — Belmont Cleaners')
            ->greeting('New Message Received')
            ->line("**Name:** {$this->message->name}")
            ->line("**Email:** {$this->message->email}")
            ->line("**Phone:** " . ($this->message->phone ?? 'N/A'))
            ->line("**Message:** {$this->message->message}")
            ->action('View Dashboard', url('/admin/messages'));
    }
}