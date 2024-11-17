<?php
// database/seeders/CoursesTableSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CoursesTableSeeder extends Seeder
{
    public function run()
    {
            // Asegúrate de que haya un usuario con ID 1 o cambia el ID según sea necesario
             // Cambia esto según el usuario que desees asignar

        DB::table('courses')->insert([
            [
                'title' => 'Curso de Laravel',
                'description' => 'Aprende Laravel desde cero',
                'image_url' => 'https://via.placeholder.com/150',
                'is_free' => true,
                'price' => 0,
                'user_id' => $userId, // Proporcionar el user_id
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Curso de React',
                'description' => 'Domina React en poco tiempo',
                'image_url' => 'https://via.placeholder.com/150',
                'is_free' => false,
                'price' => 49.99,
                'user_id' => $userId, // Proporcionar el user_id
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

