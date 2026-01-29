<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/schedule', function () {
    return Inertia::render('schedule');
});

Route::get('/checkrate', function () {
    return Inertia::render('Checkrate');
});

Route::get('/luxury', function () {
    return Inertia::render('Luxury');
});

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';
