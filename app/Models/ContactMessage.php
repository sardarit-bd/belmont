<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ContactMessage extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['name', 'email', 'phone', 'message', 'status'];

    public function uniqueIds(): array
    {
        return ['uuid'];
    }
}
