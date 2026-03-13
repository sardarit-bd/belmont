<?php

return [
    // Page header
    'title'    => 'Schedule Your Pickup',
    'subtitle' => 'Complete these 3 simple steps and we\'ll take care of the rest',

    // Progress steps
    'step_contact'  => 'Contact',
    'step_schedule' => 'Schedule',
    'step_confirm'  => 'Confirm',

    // Step 1
    'contact_title'    => 'Contact Information',
    'contact_subtitle' => 'Tell us where to find you',
    'full_name'        => 'Full Name',
    'phone_number'     => 'Phone Number',
    'street'           => 'Street',
    'city_state'       => 'City/State',
    'zip'              => 'Zip',
    'continue_schedule'=> 'Continue to Schedule',

    // Step 2
    'schedule_title'    => 'Pick Your Perfect Time',
    'schedule_subtitle' => 'When should we swing by?',
    'pickup_date'       => 'Pickup Date',
    'preferred_time'    => 'Preferred Time',
    'special_instructions'             => 'Special Instructions',
    'special_instructions_hint'        => 'Optional',
    'special_instructions_placeholder' => 'Gate code, parking instructions...',

    // Payment
    'payment_title'    => 'Payment Information',
    'payment_subtitle' => 'Secure payment - Card charged only after service completion',
    'cardholder_name'  => 'Cardholder Name',
    'card_number'      => 'Card Number',
    'expiry_date'      => 'Expiry Date',
    'cvc'              => 'CVC',
    'card_consent'     => 'I acknowledge and authorize :company to charge my provided credit or debit card upon the successful completion of the cleaning services.',
    'continue_review'  => 'Continue to Review',

    // Step 3
    'review_title'     => 'Almost There!',
    'review_subtitle'  => 'Review your details and confirm',
    'label_name'       => 'Name',
    'label_phone'      => 'Phone',
    'label_address'    => 'Address',
    'label_date'       => 'Date',
    'label_time'       => 'Time',
    'label_payment'    => 'Payment Method',
    'confirm_pickup'   => 'Confirm Pickup',
    'success_title'    => 'Pickup Confirmed!',
    'success_message'  => 'Your pickup has been successfully scheduled.',
    'schedule_another' => 'Schedule Another Pickup',

    // Shared
    'back'     => '← Back',
    'optional' => 'Optional',

    // Processing states
    'processing'         => 'Processing...',
    'processing_payment' => 'Processing Payment...',

    // Error states
    'error_generic'            => 'Something went wrong. Please try again.',
    'error_3ds_failed'         => 'Card authentication failed. Please try again.',
    'error_payment_incomplete' => 'Payment could not be completed. Please try again.',
    'error_no_items'           => 'Your cart is empty. Please add items before scheduling.',

    // Validation errors
    'error_full_name_required'   => 'Full name is required',
    'error_phone_required'       => 'Phone number is required',
    'error_phone_invalid'        => 'Please enter a valid phone number',
    'error_street_required'      => 'Street address is required',
    'error_city_required'        => 'City/State is required',
    'error_zip_required'         => 'Zip code is required',
    'error_zip_invalid'          => 'Please enter a valid zip code',
    'error_date_required'        => 'Pickup date is required',
    'error_date_past'            => 'Please select a future date',
    'error_time_required'        => 'Preferred time is required',
    'error_cardholder_required'  => 'Cardholder name is required',
    'error_card_number_required' => 'Card number is required',
    'error_card_number_invalid'  => 'Please enter a valid card number',
    'error_expiry_required'      => 'Expiry date is required',
    'error_expiry_invalid'       => 'Format: MM/YY',
    'error_cvc_required'         => 'CVC is required',
    'error_cvc_invalid'          => 'Please enter a valid CVC',
];