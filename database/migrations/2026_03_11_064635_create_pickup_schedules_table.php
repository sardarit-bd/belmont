<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('pickup_schedules', function (Blueprint $table) {
            $table->id();

            // Contact
            $table->string('full_name');
            $table->string('phone_number');
            $table->string('street');
            $table->string('city');
            $table->string('zip', 10);

            // Schedule
            $table->date('pickup_date');
            $table->time('preferred_time');
            $table->text('special_instructions')->nullable();

            // Payment (never store raw card data in production — use a token)
            $table->string('cardholder_name');
            $table->string('card_last_four', 4);   
            $table->string('card_expiry', 5);       

            $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pickup_schedules');
    }
};