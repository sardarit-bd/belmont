<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ConsultationRequest extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'package', 'first_name', 'last_name', 'email', 'phone',
        'company', 'service_type', 'item_count', 'needed_by',
        'details', 'status',
    ];

    protected $casts = [
        'needed_by' => 'date',
    ];

    // Tell HasUuids to only auto-generate for the uuid column, not id
    public function uniqueIds(): array
    {
        return ['uuid'];
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
