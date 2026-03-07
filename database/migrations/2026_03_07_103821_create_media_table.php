<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id();

            // Storage
            $table->string('disk')->default('public');       
            $table->string('path');                          
            $table->string('url')->nullable();               

            // File info
            $table->string('mime_type');                     
            $table->unsignedInteger('size_bytes');           
            $table->string('original_filename');             

            // Image dimensions — null for non-image files
            $table->unsignedSmallInteger('width')->nullable();
            $table->unsignedSmallInteger('height')->nullable();

            // Organisation
            $table->string('folder')->default('general');   
            $table->string('collection')->nullable();        

            // Audit
            $table->unsignedBigInteger('uploaded_by')->nullable();

            $table->timestamps();

            // Indexes
            $table->index('folder');
            $table->index('mime_type');
            $table->index('disk');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};