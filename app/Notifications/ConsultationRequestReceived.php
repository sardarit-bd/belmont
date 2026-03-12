<?php

namespace App\Notifications;

use App\Models\ConsultationRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ConsultationRequestReceived extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(private readonly ConsultationRequest $request)
    {
        $this->onQueue('notifications');
    }

    public function via(object $notifiable): array { return ['mail']; }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject("New Consultation Request — {$this->request->package} Package")
            ->greeting('New Quote Request Received')
            ->line("**Name:** {$this->request->full_name}")
            ->line("**Email:** {$this->request->email}")
            ->line("**Phone:** {$this->request->phone}")
            ->line("**Company:** " . ($this->request->company ?? 'N/A'))
            // ->line("**Package:** {$this->request->package}")
            ->line("**Service Type:** {$this->request->service_type}")
            ->line("**Item Count:** {$this->request->item_count}")
            ->line("**Needed By:** " . ($this->request->needed_by?->format('F j, Y') ?? 'Not specified'))
            ->when($this->request->details, fn($mail) =>
                $mail->line("**Details:** {$this->request->details}")
            )
            ->action('View Dashboard', url('/admin/consultation-requests'));
    }
}