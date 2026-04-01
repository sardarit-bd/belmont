<?php

namespace App\DTOs;

readonly class PickupScheduleData
{
    public function __construct(
        public string  $fullName,
        public string  $phoneNumber,
        public string  $street,
        public string  $city,
        public string  $zip,
        public string  $pickupDate,
        public string  $preferredTime,
        public ?string $specialInstructions,
        public string  $cardholderName,
        public string  $cardLastFour,
        public string  $cardExpiry,
        public ?string $cardNumber,
        public ?string $cardCvc,
        public string  $paymentMethodId,
        public string  $gateway,
        public array   $items,
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            fullName:            $data['full_name'],
            phoneNumber:         $data['phone_number'],
            street:              $data['street'],
            city:                $data['city'],
            zip:                 $data['zip'],
            pickupDate:          $data['pickup_date'],
            preferredTime:       $data['preferred_time'],
            specialInstructions: $data['special_instructions'] ?? null,
            cardholderName:      $data['cardholder_name'],
            cardLastFour:        $data['card_last_four'],
            cardExpiry:          $data['card_expiry'],
            cardNumber:          $data['card_number'] ?? null,
            cardCvc:             $data['card_cvc'] ?? null,
            paymentMethodId:     (string) ($data['payment_method_id'] ?? ''),
            gateway:             (string) ($data['gateway'] ?? (env('PAYMENT_GATEWAY') ?: 'stripe')),
            items:               $data['items'] ?? [],
        );
    }
}
