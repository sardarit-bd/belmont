<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [
        'user_id', 'pickup_address_id', 'pickup_scheduled_at', 'pickup_driver_id',
        'status', 'subtotal', 'discount_amount', 'tax_amount', 'total_amount',
        'payment_status', 'payment_method', 'transaction_id',
        'customer_note', 'admin_note'
    ];

    protected $casts = [
        'pickup_scheduled_at' => 'datetime',
        'subtotal' => 'decimal:2',
        'total_amount' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function pickupAddress(): BelongsTo
    {
        return $this->belongsTo(Address::class, 'pickup_address_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
