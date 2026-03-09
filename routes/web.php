<?php

use App\Http\Controllers\LanguageController;
use App\Models\ContentBlock;
use App\Models\Service;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'hero' => ContentBlock::getSection('hero'),
    ]);
})->name('home');

Route::get('/schedule', function () {
    return Inertia::render('schedule');
});

Route::get('/checkrate', function () {
    $locale   = App::getLocale();
    $fallback = config('languages.fallback', 'en');

    $services = Service::where('is_active', true)
    ->with([
        'translations',                   
        'categories' => fn($q) => $q
            ->orderBy('sort_order')
            ->with([
                'translations',            
                'products' => fn($q) => $q
                    ->where('is_active', true)
                    ->orderBy('sort_order')
                    ->with('translations'), 
            ]),
    ])
    ->orderBy('sort_order')
    ->get()
    ->map(fn($service) => [
        'slug' => $service->slug,
        'name' => $service->getTranslation('name', $locale),
        'categories' => $service->categories->map(fn($category) => [
            'slug' => $category->slug,
            'name' => $category->getTranslation('name', $locale),
            'products' => $category->products->map(fn($product) => [
                'id'    => $product->id,
                'name'  => $product->getTranslation('name', $locale),
                'price' => (float) $product->price,
            ]),
        ]),
    ]);

    // 2. Pass to Inertia → becomes React prop
    return Inertia::render('Checkrate', [
        'services' => $services,
    ]);
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

// language switch
Route::post('/language/switch', [LanguageController::class, 'switch'])->name('language.switch');

require __DIR__.'/settings.php';
