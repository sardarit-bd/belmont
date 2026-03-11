{{-- resources/views/emails/password-reset.blade.php --}}
<x-mail::message>
# Reset Your Password

Hi {{ $user->name }},

We received a request to reset your Belmont Dry Cleaners password.

<x-mail::button :url="$resetUrl" color="primary">
Reset Password
</x-mail::button>

This link expires in **{{ $expiry }} minutes**.

If you didn't request this, you can safely ignore this email — your password won't change.

For security, never share this link with anyone.

Thanks,
{{ config('app.name') }}

<x-mail::subcopy>
If the button doesn't work, copy and paste this URL into your browser:
{{ $resetUrl }}
</x-mail::subcopy>
</x-mail::message>