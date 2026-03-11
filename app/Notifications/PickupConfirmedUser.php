<?php

namespace App\Notifications;

use App\Models\PickupSchedule;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PickupConfirmedUser extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(private readonly PickupSchedule $schedule) {}

    public function via(object $notifiable): array { return ['mail']; }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Your Pickup is Confirmed — Belmont Cleaners')
            ->greeting("Hello, {$this->schedule->full_name}!")
            ->line('Your laundry pickup has been successfully scheduled.')
            ->line("📅 **Date:** {$this->schedule->pickup_date->format('F j, Y')}")
            ->line("⏰ **Time:** {$this->schedule->preferred_time}")
            ->line("📍 **Address:** {$this->schedule->full_address}")
            ->line('We look forward to serving you!')
            ->salutation('— Belmont Cleaners Team');
    }
}
