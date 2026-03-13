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

    // ── Relationships ─────────────────────────────────────────────────────────

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    // ── Accessors ─────────────────────────────────────────────────────────────

    public function getFullAddressAttribute(): string
    {
        return "{$this->street}, {$this->city} {$this->zip}";
    }

    // ── Status helpers ────────────────────────────────────────────────────────

    public function getNextStatus(): ?string
    {
        return match ($this->status) {
            'confirmed'        => 'picked_up',
            'picked_up'        => 'being_cleaned',
            'being_cleaned'    => 'out_for_delivery',
            'out_for_delivery' => 'delivered',
            default            => null,
        };
    }

    public function getNextStatusLabel(): ?string
    {
        return match ($this->getNextStatus()) {
            'picked_up'        => 'Mark Picked Up',
            'being_cleaned'    => 'Mark Being Cleaned',
            'out_for_delivery' => 'Mark Out for Delivery',
            'delivered'        => 'Mark Delivered',
            default            => null,
        };
    }

    public function getStatusColor(): string
    {
        return match ($this->status) {
            'confirmed'        => 'info',
            'picked_up'        => 'warning',
            'being_cleaned'    => 'warning',
            'out_for_delivery' => 'primary',
            'delivered'        => 'success',
            'cancelled'        => 'danger',
            default            => 'gray',
        };
    }

    public function getStatusLabel(): string
    {
        return match ($this->status) {
            'pending'          => 'Pending',
            'confirmed'        => 'Confirmed',
            'picked_up'        => 'Picked Up',
            'being_cleaned'    => 'Being Cleaned',
            'out_for_delivery' => 'Out for Delivery',
            'delivered'        => 'Delivered',
            'cancelled'        => 'Cancelled',
            default            => ucfirst($this->status),
        };
    }

    public function isCancelled(): bool
    {
        return $this->status === 'cancelled';
    }

    public function isDelivered(): bool
    {
        return $this->status === 'delivered';
    }

    public function isTerminal(): bool
    {
        return in_array($this->status, ['delivered', 'cancelled']);
    }

    // ── Routing ───────────────────────────────────────────────────────────────

    public function getRouteKeyName(): string
    {
        return 'id';
    }
}