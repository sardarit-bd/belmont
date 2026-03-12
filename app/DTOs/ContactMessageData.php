<?php

namespace App\DTOs;

readonly class ContactMessageData
{
    public function __construct(
        public string  $name,
        public string  $email,
        public ?string $phone,
        public string  $message,
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            name:    $data['name'],
            email:   $data['email'],
            phone:   $data['phone']    ?? null,
            message: $data['message'],
        );
    }
}