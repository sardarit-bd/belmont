<?php

namespace App\Repositories\Contracts;

use App\DTOs\ConsultationRequestData;
use App\Models\ConsultationRequest;

interface ConsultationRequestRepositoryInterface
{
    public function create(ConsultationRequestData $data): ConsultationRequest;
}