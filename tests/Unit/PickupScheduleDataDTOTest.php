<?php

use App\DTOs\PickupScheduleData;
use App\DTOs\PaymentIntentResult;

/*
|--------------------------------------------------------------------------
| PickupScheduleData DTO
|--------------------------------------------------------------------------
*/

test('PickupScheduleData::fromRequest maps all fields correctly', function () {
    $input = [
        'full_name'            => 'Jane Doe',
        'phone_number'         => '555-999-0000',
        'street'               => '456 Oak Ave',
        'city'                 => 'Boston',
        'zip'                  => '02308',
        'pickup_date'          => '2026-04-01',
        'preferred_time'       => '14:30',
        'special_instructions' => 'Ring the bell',
        'cardholder_name'      => 'Jane Doe',
        'card_number'          => '4111111111111111',
        'card_cvc'             => '123',
        'card_last_four'       => '1234',
        'card_expiry'          => '03/27',
        'payment_method_id'    => 'pm_test_abc123',
        'items'                => [
            ['id' => 'uuid-1', 'name' => 'Shirt', 'price' => 5.00, 'quantity' => 3],
        ],
    ];

    $dto = PickupScheduleData::fromRequest($input);

    expect($dto->fullName)->toBe('Jane Doe')
        ->and($dto->phoneNumber)->toBe('555-999-0000')
        ->and($dto->street)->toBe('456 Oak Ave')
        ->and($dto->city)->toBe('Boston')
        ->and($dto->zip)->toBe('02308')
        ->and($dto->pickupDate)->toBe('2026-04-01')
        ->and($dto->preferredTime)->toBe('14:30')
        ->and($dto->specialInstructions)->toBe('Ring the bell')
        ->and($dto->cardholderName)->toBe('Jane Doe')
        ->and($dto->cardNumber)->toBe('4111111111111111')
        ->and($dto->cardCvc)->toBe('123')
        ->and($dto->cardLastFour)->toBe('1234')
        ->and($dto->cardExpiry)->toBe('03/27')
        ->and($dto->paymentMethodId)->toBe('pm_test_abc123')
        ->and($dto->items)->toHaveCount(1);
});

test('PickupScheduleData::fromRequest defaults special_instructions to null', function () {
    $input = [
        'full_name'         => 'John',
        'phone_number'      => '555-000-1111',
        'street'            => '1 Main',
        'city'              => 'Test',
        'zip'               => '12345',
        'pickup_date'       => '2026-04-01',
        'preferred_time'    => '09:00',
        'cardholder_name'   => 'John',
        'card_last_four'    => '4242',
        'card_expiry'       => '01/30',
    ];

    $dto = PickupScheduleData::fromRequest($input);

    expect($dto->specialInstructions)->toBeNull()
        ->and($dto->paymentMethodId)->toBe('')
        ->and($dto->items)->toBe([]);
});

/*
|--------------------------------------------------------------------------
| PaymentIntentResult DTO
|--------------------------------------------------------------------------
*/

test('PaymentIntentResult stores all properties', function () {
    $result = new PaymentIntentResult(
        paymentIntentId: 'pi_test_abc',
        clientSecret:    'pi_test_abc_secret_123',
        status:          'requires_action',
    );

    expect($result->paymentIntentId)->toBe('pi_test_abc')
        ->and($result->clientSecret)->toBe('pi_test_abc_secret_123')
        ->and($result->status)->toBe('requires_action');
});
