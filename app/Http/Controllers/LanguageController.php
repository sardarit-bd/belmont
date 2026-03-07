<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;

class LanguageController extends Controller
{
    public function switch(Request $request)
    {
        $request->validate([
            'locale' => ['required', 'string', 'in:' . implode(',', array_keys(config('languages.supported')))]
        ]);

        $locale = $request->input('locale');
        Session::put('locale', $locale);

        // Persist for authenticated users
        if (Auth::check()) {
            Auth::user()->update(['preferred_locale' => $locale]);
        }

        return back();
    }
}