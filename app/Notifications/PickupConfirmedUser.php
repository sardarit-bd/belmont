<?php

namespace App\Notifications;

use App\Models\PickupSchedule;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

/**
 * Queued — mail failure will NOT roll back the DB transaction.
 */
class PickupConfirmedUser extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        private readonly PickupSchedule $schedule
    ) {}

    public function via(): array
    {
        return ['mail', 'database'];
    }

    public function toDatabase(): array
    {
        return [
            'schedule_id'  => $this->schedule->id,
            'status'       => 'confirmed',
            'status_label' => 'Confirmed',
            'message'      => 'Your pickup has been confirmed and payment received.',
            'pickup_date'  => $this->schedule->pickup_date->format('M d, Y'),
        ];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Your Pickup is Confirmed — Belmont Cleaners')
            ->greeting('Hi ' . $this->schedule->full_name . ',')
            ->line('Your pickup has been scheduled and your payment was received.')
            ->line('**Pickup Date:** ' . $this->schedule->pickup_date->format('F j, Y'))
            ->line('**Pickup Time:** ' . $this->schedule->preferred_time)
            ->line('**Address:** ' . $this->schedule->street . ', ' . $this->schedule->city . ' ' . $this->schedule->zip)
            ->line('If you need to make any changes, please contact us.')
            ->salutation('— Belmont Cleaners');
    }
}