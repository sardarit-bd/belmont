<?php

namespace App\Repositories;

use App\DTOs\ConsultationRequestData;
use App\Models\ConsultationRequest;
use App\Repositories\Contracts\ConsultationRequestRepositoryInterface;

class ConsultationRequestRepository implements ConsultationRequestRepositoryInterface
{
    public function create(ConsultationRequestData $data): ConsultationRequest
    {
        return ConsultationRequest::create([
            'package'      => $data->package,
            'first_name'   => $data->firstName,
            'last_name'    => $data->lastName,
            'email'        => $data->email,
            'phone'        => $data->phone,
            'company'      => $data->company,
            'service_type' => $data->serviceType,
            'item_count'   => $data->itemCount,
            'needed_by'    => $data->neededBy,
            'details'      => $data->details,
        ]);
    }
}