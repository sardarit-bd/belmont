<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('consultation_requests', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique()->index();

            $table->enum('package', ['wedding', 'corporate', 'hospitality']);
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone');
            $table->string('company')->nullable();
            $table->enum('service_type', ['wedding', 'corporate', 'hospitality', 'theatre']);
            $table->enum('item_count', ['1-40', '41-100', '101-200', '201-500']);
            $table->date('needed_by')->nullable();
            $table->text('details')->nullable();
            $table->enum('status', ['new', 'contacted', 'quoted', 'closed'])->default('new');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultation_requests');
    }
};
