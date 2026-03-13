<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("
            ALTER TABLE pickup_schedules 
            MODIFY COLUMN status ENUM(
                'pending',
                'confirmed',
                'picked_up',
                'being_cleaned',
                'out_for_delivery',
                'delivered',
                'cancelled'
            ) NOT NULL DEFAULT 'pending'
        ");
    }

    public function down(): void
    {
        DB::statement("
            ALTER TABLE pickup_schedules 
            MODIFY COLUMN status ENUM(
                'pending',
                'confirmed',
                'cancelled'
            ) NOT NULL DEFAULT 'pending'
        ");
    }
};