<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use PHPUnit\Metadata\Test;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            // CatalogSeeder::class,
            HeroContentSeeder::class,
            PricingSeeder::class,
            TranslationSeeder::class,
            PaymentGatewaySettingSeeder::class,
            TestimonialSeeder::class,
        ]);
    }
}
