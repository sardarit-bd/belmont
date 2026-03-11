<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PickupSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name', 'phone_number', 'street', 'city', 'zip',
        'pickup_date', 'preferred_time', 'special_instructions',
        'cardholder_name', 'card_last_four', 'card_expiry', 'status',
    ];

    protected $casts = [
        'pickup_date' => 'date',
    ];

    public function getFullAddressAttribute(): string
    {
        return "{$this->street}, {$this->city} {$this->zip}";
    }
}