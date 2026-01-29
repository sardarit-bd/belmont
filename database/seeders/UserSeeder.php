<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::where('name', 'admin')->first();
        $customerRole = Role::where('name', 'customer')->first();

        User::create([
            'role_id' => $adminRole->id,
            'name' => 'Admin',
            'email' => 'admin@belmont.com',
            'password' => Hash::make('admin@2026#'),
            'phone' => '508-555-0199',
        ]);

        $john = User::create([
            'role_id' => $customerRole->id,
            'name' => 'John Smith',
            'email' => 'john@example.com',
            'password' => Hash::make('00000000'),
            'phone' => '508-718-7711',
        ]);

        $john->addresses()->create([
            'type' => 'home',
            'address_line_1' => '123 Maple Street',
            'city' => 'Belmont',
            'state' => 'MA',
            'zip_code' => '02478',
            'is_default' => true,
        ]);
    }
}
