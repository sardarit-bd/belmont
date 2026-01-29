<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Consultation extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [
        'user_id', 'full_name', 'company_name', 'email', 'phone',
        'service_type', 'estimated_item_count', 'event_date',
        'additional_details', 'status', 'admin_notes'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
