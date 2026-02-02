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

Route::get('/about-us', function () {
    return Inertia::render('AboutUs');
});

Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy');
});

Route::get('/terms', function () {
    return Inertia::render('Terms');
});

Route::get('/faq', function () {
    return Inertia::render('FAQ');
});

Route::get('/refund', function () {
    return Inertia::render('Refund');
});

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';
