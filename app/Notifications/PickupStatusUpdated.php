<?php

namespace App\Notifications;

use App\Models\PickupSchedule;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PickupStatusUpdated extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        private readonly PickupSchedule $schedule,
    ) {}

    public function via(): array
    {
        return ['mail'];
    }

    public function toMail(): MailMessage
    {
        return (new MailMessage)
            ->subject("Your Pickup Status: {$this->schedule->getStatusLabel()}")
            ->greeting("Hello {$this->schedule->full_name}!")
            ->line("Your pickup status has been updated.")
            ->line("Current Status: **{$this->schedule->getStatusLabel()}**")
            ->line($this->getStatusMessage())
            ->salutation('— ' . config('app.name'));
    }

    private function getStatusMessage(): string
    {
        return match ($this->schedule->status) {
            'picked_up' => 'Great news! Our driver has picked up your items and they are on their way to our facility for cleaning.',
            'delivered' => 'Your freshly cleaned items have been delivered. Thank you for choosing ' . config('app.name') . '!',
            default     => 'Your booking status has been updated.',
        };
    }
}