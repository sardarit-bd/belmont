<?php

namespace App\Notifications;

use App\Models\PickupSchedule;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PickupConfirmedAdmin extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(private readonly PickupSchedule $schedule) 
    {
        $this->onQueue('notifications');
    }

    public function via(object $notifiable): array { return ['mail']; }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Pickup Scheduled — Action Required')
            ->greeting('New Booking Alert')
            ->line("**Customer:** {$this->schedule->full_name}")
            ->line("**Phone:** {$this->schedule->phone_number}")
            ->line("**Address:** {$this->schedule->full_address}")
            ->line("**Date:** {$this->schedule->pickup_date->format('F j, Y')}")
            ->line("**Time:** {$this->schedule->preferred_time}")
            ->line("**Card (last 4):** •••• {$this->schedule->card_last_four}")
            ->when($this->schedule->special_instructions, fn($mail) =>
                $mail->line("**Notes:** {$this->schedule->special_instructions}")
            )
            ->action('View Dashboard', url('/admin/pickups'));
    }
}