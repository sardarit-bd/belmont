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
        Schema::create('consultations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->nullable()->constrained('users')->nullOnDelete();

            $table->string('full_name');
            $table->string('company_name')->nullable();
            $table->string('email');
            $table->string('phone');

            $table->string('service_type'); 
            $table->string('estimated_item_count'); 
            $table->date('event_date')->nullable(); 
            
            $table->text('additional_details')->nullable(); 

            $table->enum('status', [
                'pending',    
                'contacted',   
                'quoted',   
                'converted',    
                'archived'     
            ])->default('pending');

            $table->text('admin_notes')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultations');
    }
};
