<?php

namespace App\Repositories\Contracts;

use App\DTOs\ContactMessageData;
use App\Models\ContactMessage;

interface ContactMessageRepositoryInterface
{
    public function create(ContactMessageData $data): ContactMessage;
}