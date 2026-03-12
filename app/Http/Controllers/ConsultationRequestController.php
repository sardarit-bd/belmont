<?php

namespace App\Http\Controllers;

use App\DTOs\ConsultationRequestData;
use App\Http\Requests\StoreConsultationRequestRequest;
use App\Services\ConsultationRequestService;
use Illuminate\Http\RedirectResponse;

class ConsultationRequestController extends Controller
{
    public function __construct(
        private readonly ConsultationRequestService $service,
    ) {}

    public function store(StoreConsultationRequestRequest $request): RedirectResponse
    {
        $this->service->submit(
            ConsultationRequestData::fromRequest($request->validated())
        );

        return redirect()->back()->with('success', true);
    }
}