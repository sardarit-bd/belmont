<?php

use App\Models\PickupSchedule;

/*
|--------------------------------------------------------------------------
| PickupSchedule — Status Helpers
|--------------------------------------------------------------------------
*/

test('getNextStatus returns correct transition for each stage', function () {
    $transitions = [
        'confirmed'        => 'picked_up',
        'picked_up'        => 'being_cleaned',
        'being_cleaned'    => 'out_for_delivery',
        'out_for_delivery' => 'delivered',
        'delivered'        => null,
        'cancelled'        => null,
        'pending'          => null,
    ];

    foreach ($transitions as $from => $expected) {
        $schedule = new PickupSchedule(['status' => $from]);
        expect($schedule->getNextStatus())->toBe($expected, "Expected {$from} → " . ($expected ?? 'null'));
    }
});

test('getNextStatusLabel returns human-readable label', function () {
    $labels = [
        'confirmed'        => 'Mark Picked Up',
        'picked_up'        => 'Mark Being Cleaned',
        'being_cleaned'    => 'Mark Out for Delivery',
        'out_for_delivery' => 'Mark Delivered',
        'delivered'        => null,
    ];

    foreach ($labels as $status => $expected) {
        $schedule = new PickupSchedule(['status' => $status]);
        expect($schedule->getNextStatusLabel())->toBe($expected);
    }
});

test('getStatusLabel returns proper label for each status', function () {
    $expected = [
        'pending'          => 'Pending',
        'confirmed'        => 'Confirmed',
        'picked_up'        => 'Picked Up',
        'being_cleaned'    => 'Being Cleaned',
        'out_for_delivery' => 'Out for Delivery',
        'delivered'        => 'Delivered',
        'cancelled'        => 'Cancelled',
    ];

    foreach ($expected as $status => $label) {
        $schedule = new PickupSchedule(['status' => $status]);
        expect($schedule->getStatusLabel())->toBe($label);
    }
});

test('getStatusColor returns correct color for each status', function () {
    $expected = [
        'confirmed'        => 'info',
        'picked_up'        => 'warning',
        'being_cleaned'    => 'warning',
        'out_for_delivery' => 'primary',
        'delivered'        => 'success',
        'cancelled'        => 'danger',
        'pending'          => 'gray',
    ];

    foreach ($expected as $status => $color) {
        $schedule = new PickupSchedule(['status' => $status]);
        expect($schedule->getStatusColor())->toBe($color);
    }
});

test('isTerminal returns true only for delivered and cancelled', function () {
    expect((new PickupSchedule(['status' => 'delivered']))->isTerminal())->toBeTrue()
        ->and((new PickupSchedule(['status' => 'cancelled']))->isTerminal())->toBeTrue()
        ->and((new PickupSchedule(['status' => 'confirmed']))->isTerminal())->toBeFalse()
        ->and((new PickupSchedule(['status' => 'pending']))->isTerminal())->toBeFalse();
});

test('isCancelled returns true only for cancelled status', function () {
    expect((new PickupSchedule(['status' => 'cancelled']))->isCancelled())->toBeTrue()
        ->and((new PickupSchedule(['status' => 'delivered']))->isCancelled())->toBeFalse();
});

test('isDelivered returns true only for delivered status', function () {
    expect((new PickupSchedule(['status' => 'delivered']))->isDelivered())->toBeTrue()
        ->and((new PickupSchedule(['status' => 'confirmed']))->isDelivered())->toBeFalse();
});

/*
|--------------------------------------------------------------------------
| PickupSchedule — Accessors
|--------------------------------------------------------------------------
*/

test('fullAddress accessor concatenates street, city and zip', function () {
    $schedule = new PickupSchedule([
        'street' => '123 Main St',
        'city'   => 'Brockton',
        'zip'    => '0230',
    ]);

    expect($schedule->full_address)->toBe('123 Main St, Brockton 0230');
});
