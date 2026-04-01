<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pickup_schedules', function (Blueprint $table) {
            $table->string('gateway_transaction_id')->nullable()->unique()->after('gateway');
            $table->string('gateway_customer_id')->nullable()->after('gateway_transaction_id');
            $table->string('gateway_payment_method_id')->nullable()->after('gateway_customer_id');
        });
    }

    public function down(): void
    {
        Schema::table('pickup_schedules', function (Blueprint $table) {
            $table->dropUnique(['gateway_transaction_id']);
            $table->dropColumn([
                'gateway_transaction_id',
                'gateway_customer_id',
                'gateway_payment_method_id',
            ]);
        });
    }
};
