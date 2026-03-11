<?php

namespace App\Http\Controllers;

use App\DTOs\PickupScheduleData;
use App\Http\Requests\StorePickupScheduleRequest;
use App\Services\PickupScheduleService;
use Illuminate\Http\JsonResponse;

class PickupScheduleController extends Controller
{
    public function __construct(
        private readonly PickupScheduleService $service,
    ) {}

    public function store(StorePickupScheduleRequest $request)
    {
        $this->service->book(
            PickupScheduleData::fromRequest($request->validated())
        );

        return redirect()->back();
    }
}
