<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PickupSchedule extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'full_name', 'phone_number', 'street', 'city', 'zip',
        'pickup_date', 'preferred_time', 'special_instructions',
        'cardholder_name', 'card_last_four', 'card_expiry',
        'gateway',
        'stripe_payment_intent_id', 'stripe_customer_id', 'stripe_payment_method_id',
        'payment_status', 'status',
    ];

    protected $casts = [
        'pickup_date' => 'date',
    ];

    public function getFullAddressAttribute(): string
    {
        return "{$this->street}, {$this->city} {$this->zip}";
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function getRouteKeyName(): string
    {
        return 'id';
    }
}