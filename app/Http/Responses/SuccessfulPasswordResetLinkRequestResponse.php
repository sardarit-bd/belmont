<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\SuccessfulPasswordResetLinkRequestResponse as Contract;

class SuccessfulPasswordResetLinkRequestResponse implements Contract
{
    public function toResponse($request)
    {
        return back()->with('status', 'passwords.sent');
    }
}