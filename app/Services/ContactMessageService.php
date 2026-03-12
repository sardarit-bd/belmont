<?php

namespace App\Services;

use App\DTOs\ContactMessageData;
use App\Models\ContactMessage;
use App\Notifications\ContactMessageReceived;
use App\Repositories\Contracts\ContactMessageRepositoryInterface;
use Illuminate\Support\Facades\Notification;

class ContactMessageService
{
    public function __construct(
        private readonly ContactMessageRepositoryInterface $repository,
    ) {}

    public function submit(ContactMessageData $data): ContactMessage
    {
        $message = $this->repository->create($data);

        Notification::route('mail', config('app.admin_email'))
            ->notify(new ContactMessageReceived($message));

        return $message;
    }
}