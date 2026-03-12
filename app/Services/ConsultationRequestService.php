<?php

namespace App\Services;

use App\DTOs\ConsultationRequestData;
use App\Models\ConsultationRequest;
use App\Notifications\ConsultationRequestReceived;
use App\Repositories\Contracts\ConsultationRequestRepositoryInterface;
use Illuminate\Support\Facades\Notification;

class ConsultationRequestService
{
    public function __construct(
        private readonly ConsultationRequestRepositoryInterface $repository,
    ) {}

    public function submit(ConsultationRequestData $data): ConsultationRequest
    {
        $request = $this->repository->create($data);

        Notification::route('mail', config('app.admin_email'))
            ->notify(new ConsultationRequestReceived($request));

        return $request;
    }
}