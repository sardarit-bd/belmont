<?php

namespace App\Http\Controllers;

use App\DTOs\ContactMessageData;
use App\Http\Requests\StoreContactMessageRequest;
use App\Services\ContactMessageService;
use Illuminate\Http\RedirectResponse;

class ContactMessageController extends Controller
{
    public function __construct(
        private readonly ContactMessageService $service,
    ) {}

    public function store(StoreContactMessageRequest $request): RedirectResponse
    {
        $this->service->submit(
            ContactMessageData::fromRequest($request->validated())
        );

        return redirect()->back()->with('success', true);
    }
}
