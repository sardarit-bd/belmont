<?php

namespace App\Http\Middleware;

use App\Models\PaymentGatewaySetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $locale = App::getLocale();
        
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user()?->load('role'),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',

            'locale' => $locale,
            'languages' => config('languages.supported'),
            'translations' => $this->loadTranslations($locale),
            'flash' => [
                'success' => $request->session()->get('success'),
                'error'   => $request->session()->get('error'),
            ],

            'stripe_key' => cache()->rememberForever('stripe_public_key', function () {
                $setting = PaymentGatewaySetting::where('gateway', 'stripe')
                    ->where('is_active', true)
                    ->first();
                return $setting?->getCredential('public_key');
            }),
        ];
    }

    private function loadTranslations(string $locale): array
    {
        $path = lang_path("{$locale}");
        $translations = [];
        
        if (is_dir($path)) {
            foreach (glob("{$path}/*.php") as $file) {
                $group = basename($file, '.php');
                $translations[$group] = require $file;
            }
        }
        
        // Also load JSON translations
        $jsonPath = lang_path("{$locale}.json");
        if (file_exists($jsonPath)) {
            $translations['_json'] = json_decode(file_get_contents($jsonPath), true);
        }
        
        return $translations;
    }
}
