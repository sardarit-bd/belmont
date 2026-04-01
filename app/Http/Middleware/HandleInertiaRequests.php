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
        $forcedGateway = env('PAYMENT_GATEWAY_FORCE');
        $supportedGateways = array_keys((array) config('payment.gateways', []));

        if (is_string($forcedGateway) && in_array($forcedGateway, $supportedGateways, true)) {
            $activeGatewaySetting = PaymentGatewaySetting::where('gateway', $forcedGateway)->first();
        } else {
            $activeGatewaySetting = PaymentGatewaySetting::where('is_active', true)->first();
        }

        $activeGateway = $activeGatewaySetting?->gateway ?? config('payment.default');
        
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

            'payment_gateway' => $activeGateway,
            'payment_gateway_public_key' => $activeGatewaySetting?->getCredential('public_key'),
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
