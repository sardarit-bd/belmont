<?php

use App\Models\Product;
use App\Models\Category;

/*
|--------------------------------------------------------------------------
| POST /schedule — Validation Tests
|--------------------------------------------------------------------------
|
| These tests verify the StorePickupScheduleRequest validation rules.
| No Stripe calls are made — we're only testing that invalid inputs
| are rejected with correct validation errors.
|
*/

/**
 * Helper: build a valid payload.
 * Tests override individual fields to check specific validation rules.
 */
function validPayload(array $overrides = []): array
{
    $product = Product::firstOrCreate(
        ['name' => 'Test Wash & Fold'],
        [
            'category_id' => Category::firstOrCreate(['name' => 'Test Category'])->id,
            'price'       => 15.99,
            'is_active'   => true,
        ]
    );

    return array_merge([
        'full_name'            => 'John Doe',
        'phone_number'         => '(555) 123-4567',
        'street'               => '123 Main St',
        'city'                 => 'Brockton',
        'zip'                  => '02301',
        'pickup_date'          => now()->addDay()->toDateString(),
        'preferred_time'       => '10:00',
        'special_instructions' => null,
        'cardholder_name'      => 'John Doe',
        'payment_method_id'    => 'pm_test_1234567890',
        'card_last_four'       => '4242',
        'card_expiry'          => '12/28',
        'items'                => [
            [
                'id'       => $product->id,
                'name'     => $product->name,
                'price'    => $product->price,
                'quantity' => 2,
            ],
        ],
    ], $overrides);
}

/*
|--------------------------------------------------------------------------
| Required Fields
|--------------------------------------------------------------------------
*/

test('all required fields must be present', function () {
    $response = $this->postJson('/schedule', []);

    $response->assertStatus(422)
        ->assertJsonValidationErrors([
            'full_name',
            'phone_number',
            'street',
            'city',
            'zip',
            'pickup_date',
            'preferred_time',
            'cardholder_name',
            'payment_method_id',
            'card_last_four',
            'card_expiry',
            'items',
        ]);
});

/*
|--------------------------------------------------------------------------
| Phone Number
|--------------------------------------------------------------------------
*/

test('phone number must match US format', function () {
    $response = $this->postJson('/schedule', validPayload([
        'phone_number' => 'not-a-phone',
    ]));

    $response->assertJsonValidationErrors(['phone_number']);
});

test('valid phone number formats are accepted', function (string $phone) {
    $response = $this->postJson('/schedule', validPayload([
        'phone_number' => $phone,
    ]));

    $response->assertJsonMissingValidationErrors(['phone_number']);
})->with([
    '(555) 123-4567',
    '555-123-4567',
    '555.123.4567',
    '5551234567',
]);

/*
|--------------------------------------------------------------------------
| Zip Code
|--------------------------------------------------------------------------
*/

test('zip code must match the expected format', function () {
    $response = $this->postJson('/schedule', validPayload([
        'zip' => 'ABC',
    ]));

    $response->assertJsonValidationErrors(['zip']);
});

/*
|--------------------------------------------------------------------------
| Pickup Date
|--------------------------------------------------------------------------
*/

test('pickup date cannot be in the past', function () {
    $response = $this->postJson('/schedule', validPayload([
        'pickup_date' => now()->subDay()->toDateString(),
    ]));

    $response->assertJsonValidationErrors(['pickup_date']);
});

test('pickup date today or later is accepted', function () {
    $response = $this->postJson('/schedule', validPayload([
        'pickup_date' => now()->toDateString(),
    ]));

    $response->assertJsonMissingValidationErrors(['pickup_date']);
});

/*
|--------------------------------------------------------------------------
| Payment Method ID
|--------------------------------------------------------------------------
*/

test('payment_method_id must start with pm_', function () {
    $response = $this->postJson('/schedule', validPayload([
        'payment_method_id' => 'invalid_token',
    ]));

    $response->assertJsonValidationErrors(['payment_method_id']);
});

/*
|--------------------------------------------------------------------------
| Card Fields
|--------------------------------------------------------------------------
*/

test('card_last_four must be exactly 4 digits', function () {
    $response = $this->postJson('/schedule', validPayload([
        'card_last_four' => '12345',
    ]));

    $response->assertJsonValidationErrors(['card_last_four']);
});

test('card_expiry must match MM/YY format', function () {
    $response = $this->postJson('/schedule', validPayload([
        'card_expiry' => '2028-12',
    ]));

    $response->assertJsonValidationErrors(['card_expiry']);
});

/*
|--------------------------------------------------------------------------
| Items
|--------------------------------------------------------------------------
*/

test('items must contain at least one item', function () {
    $response = $this->postJson('/schedule', validPayload([
        'items' => [],
    ]));

    $response->assertJsonValidationErrors(['items']);
});

test('item quantity must be at least 1', function () {
    $product = Product::first();

    $response = $this->postJson('/schedule', validPayload([
        'items' => [
            [
                'id'       => $product->id,
                'name'     => $product->name,
                'price'    => $product->price,
                'quantity' => 0,
            ],
        ],
    ]));

    $response->assertJsonValidationErrors(['items.0.quantity']);
});

test('item with non-existent product id fails validation', function () {
    $response = $this->postJson('/schedule', validPayload([
        'items' => [
            [
                'id'       => fake()->uuid(),
                'name'     => 'Ghost Product',
                'price'    => 10.00,
                'quantity' => 1,
            ],
        ],
    ]));

    $response->assertJsonValidationErrors(['items.0.id']);
});

test('item with tampered price fails validation', function () {
    $product = Product::first();

    $response = $this->postJson('/schedule', validPayload([
        'items' => [
            [
                'id'       => $product->id,
                'name'     => $product->name,
                'price'    => 0.01, // tampered price
                'quantity' => 1,
            ],
        ],
    ]));

    $response->assertJsonValidationErrors(['items.0.price']);
});

test('item with inactive product fails validation', function () {
    $product = Product::first();
    $product->update(['is_active' => false]);

    $response = $this->postJson('/schedule', validPayload([
        'items' => [
            [
                'id'       => $product->id,
                'name'     => $product->name,
                'price'    => $product->price,
                'quantity' => 1,
            ],
        ],
    ]));

    $response->assertJsonValidationErrors(['items.0.id']);

    // Clean up
    $product->update(['is_active' => true]);
});
