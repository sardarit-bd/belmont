<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\FailedPasswordResetLinkRequestResponse as Contract;

class FailedPasswordResetLinkRequestResponse implements Contract
{
    public function toResponse($request)
    {
        // Return the same neutral message as success — never leak
        // whether the email exists in the database.
        return back()->with('status', 'passwords.sent');
    }
}