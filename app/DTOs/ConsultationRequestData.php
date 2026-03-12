<?php

namespace App\DTOs;

readonly class ConsultationRequestData
{
    public function __construct(
        public string  $package,
        public string  $firstName,
        public string  $lastName,
        public string  $email,
        public string  $phone,
        public ?string $company,
        public string  $serviceType,
        public string  $itemCount,
        public ?string $neededBy,
        public ?string $details,
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            package:     $data['package'],
            firstName:   $data['first_name'],
            lastName:    $data['last_name'],
            email:       $data['email'],
            phone:       $data['phone'],
            company:     $data['company']      ?? null,
            serviceType: $data['service_type'],
            itemCount:   $data['item_count'],
            neededBy:    $data['needed_by']    ?? null,
            details:     $data['details']      ?? null,
        );
    }
}