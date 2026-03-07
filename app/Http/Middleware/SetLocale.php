<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        $supported = array_keys(config('languages.supported'));
        
        // Priority: session → user preference (DB) → browser → default
        $locale = Session::get('locale')
            ?? ($request->user()?->preferred_locale)
            ?? $this->parseAcceptLanguage($request, $supported)
            ?? config('languages.default');

        if (!in_array($locale, $supported)) {
            $locale = config('languages.default');
        }

        App::setLocale($locale);
        Session::put('locale', $locale);

        return $next($request);
    }

    private function parseAcceptLanguage(Request $request, array $supported): ?string
    {
        $header = $request->header('Accept-Language', '');
        preg_match_all('/([a-z]{1,8}(?:-[a-z]{1,8})?)\s*(?:;\s*q\s*=\s*([\d.]+))?/i', $header, $matches);
        
        foreach ($matches[1] as $lang) {
            $short = strtolower(substr($lang, 0, 2));
            if (in_array($short, $supported)) return $short;
        }
        return null;
    }
}