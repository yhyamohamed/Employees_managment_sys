<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ManagementSeeder extends Seeder
{

    public function run()
    {
        //create 7 users
        User::factory(3)->create(
            [
                'employee_group' => 'higher-management',
                'employee_title' => 'dep-manager'
            ]
        );
        User::factory(3)->create(
            [
                'employee_group' => 'middle-management',
                'employee_title' => 'dep-manager'
            ]
        );
    }
}