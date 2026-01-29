<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Address extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id', 'type', 'address_line_1', 'address_line_2',
        'city', 'state', 'zip_code', 'instructions', 'is_default'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
