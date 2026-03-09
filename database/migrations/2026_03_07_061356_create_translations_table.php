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
        Schema::create('translations', function (Blueprint $table) {
            $table->id();
            $table->string('locale', 10)->index();
            $table->string('key');
            $table->enum('field_type', ['text', 'textarea', 'richtext', 'slug', 'json'])
                ->default('text');
            $table->longText('value')->nullable();
            $table->uuidMorphs('translatable');
            $table->timestamps();

            $table->index(
                ['translatable_type', 'translatable_id', 'locale'],
                'translations_lookup'
            );
            $table->unique(
                ['locale', 'key', 'translatable_id', 'translatable_type'],
                'translations_unique'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('translations');
    }
};
