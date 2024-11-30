<?php
// database/seeders/CoursesTableSeeder.php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CoursesTableSeeder extends Seeder
{
    public function run()
    {
        // Asegúrate de que haya un usuario con ID 1 o crea un usuario de prueba y obtén su ID
        $user = User::firstOrCreate(
            ['email' => 'test@example.com'],
            ['name' => 'Test User', 'password' => bcrypt('password')]
        );

        $userId = $user->id;

        DB::table('courses')->insert([
            [
                'title' => 'Curso de Laravel',
                'description' => '¿Quieres crear tu propia web o app? Con Laravel, aprenderás a construir aplicaciones web desde cero de manera fácil y organizada. ¡Ideal para emprendedores y desarrolladores!',
                'image_url' => 'https://via.placeholder.com/150',
                'is_free' => true,
                'price' => 0,
                'user_id' => $userId, // Proporcionar el user_id
                'objetivo' => json_encode([
                    'Plataformas de Inversión: TradeStation y TradingView',
                    'Introducción al Stock Market',
                    'Análisis Fundamental'
                ]),
                'duracion' => 80, // Duración en horas
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Curso de React',
                'description' => '¿Te apasionan las interfaces de usuario? React te enseñará a crear experiencias de usuario increíbles, como las de tus apps favoritas. ¡Domina las últimas tendencias en desarrollo web!',
                'image_url' => 'https://via.placeholder.com/150',
                'is_free' => false,
                'price' => 49.99,
                'user_id' => $userId, // Proporcionar el user_id
                'objetivo' => json_encode([
                    'Componentes y JSX',
                    'Hooks y Estado',
                    'Enrutamiento con React Router'
                ]),
                'duracion' => 50, // Duración en horas
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}


