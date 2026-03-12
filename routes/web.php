<?php

use App\Http\Controllers\ConsultationRequestController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\PickupScheduleController;
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

// pickup schedule
Route::get('/schedule', fn() => Inertia::render('schedule'));
Route::post('/schedule', [PickupScheduleController::class, 'store']);

// Route::get('/checkrate', function () {
//     $locale   = App::getLocale();
//     $fallback = config('languages.fallback', 'en');

//     $services = Service::where('is_active', true)
//         ->with([
//             'translations',
//             'categories' => fn($q) => $q
//                 ->orderBy('sort_order')
//                 ->with([
//                     'translations',
//                     'products' => fn($q) => $q
//                         ->where('is_active', true)
//                         ->orderBy('sort_order')
//                         ->with('translations'),
//                 ]),
//         ])
//         ->orderBy('sort_order')
//         ->get()
//         ->map(fn($service) => [
//             'slug' => $service->slug,
//             'name' => $service->translations->where('locale', $locale)->first()?->value
//                       ?? $service->translations->where('locale', $fallback)->first()?->value
//                       ?? $service->getRawOriginal('name'),
//             'categories' => $service->categories->map(fn($category) => [
//                 'slug' => $category->slug,
//                 'name' => $category->translations->where('locale', $locale)->first()?->value
//                           ?? $category->translations->where('locale', $fallback)->first()?->value
//                           ?? $category->getRawOriginal('name'),
//                 'products' => $category->products->map(fn($product) => [
//                     'id'    => $product->id,
//                     'name'  => $product->translations->where('locale', $locale)->first()?->value
//                                ?? $product->translations->where('locale', $fallback)->first()?->value
//                                ?? $product->getRawOriginal('name'),
//                     'price' => (float) $product->price,
//                 ]),
//             ]),
//         ]);

//     return Inertia::render('Checkrate', [
//         'services' => $services,
//     ]);
// });



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
            'name' => $service->translations->where('locale', $locale)->where('key', 'name')->first()?->value
                      ?? $service->translations->where('locale', $fallback)->where('key', 'name')->first()?->value
                      ?? $service->getRawOriginal('name'),
            'categories' => $service->categories->map(fn($category) => [
                'slug' => $category->slug,
                'name' => $category->translations->where('locale', $locale)->where('key', 'name')->first()?->value
                          ?? $category->translations->where('locale', $fallback)->where('key', 'name')->first()?->value
                          ?? $category->getRawOriginal('name'),
                'products' => $category->products->map(fn($product) => [
                    'id'    => $product->id,
                    'name'  => $product->translations->where('locale', $locale)->where('key', 'name')->first()?->value
                               ?? $product->translations->where('locale', $fallback)->where('key', 'name')->first()?->value
                               ?? $product->getRawOriginal('name'),
                    'price' => (float) $product->price,
                ]),
            ]),
        ]);

    return Inertia::render('Checkrate', [
        'services' => $services,
    ]);
});

// luxury
Route::get('/luxury', function () {
    return Inertia::render('Luxury');
});
Route::post('/luxury/consultation', [ConsultationRequestController::class, 'store']);
Route::post('/contact',             [ContactMessageController::class, 'store']);

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

// Route::get('dashboard', function () {
//     return Inertia::render('dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'role:customer'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');
});

// language switch
Route::post('/language/switch', [LanguageController::class, 'switch'])->name('language.switch');

require __DIR__.'/settings.php';
