<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Verificar si la tabla existe
        if (Schema::hasTable('modules')) {
            // Truncar la tabla para evitar duplicados
            DB::table('modules')->truncate();

            // Crear módulos de prueba
            DB::table('modules')->insert([
                [
                    'lesson_id' => 1, // Asegúrate de que esta lección exista
                    'title' => 'Introducción al curso',
                    'type' => 'video',
                    'url' => 'http://localhost/cursos/public/storage/videos/video1.mp4',
                    'description' => 'Video introductorio sobre el curso.',
                    'order' => 1,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'lesson_id' => 1, // Cambiar según sea necesario
                    'title' => 'Primera lectura',
                    'type' => 'video',
                    'url' => 'http://localhost/cursos/public/storage/videos/video2.mp4',
                    'description' => 'Artículo sobre los fundamentos del tema.',
                    'order' => 2,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'lesson_id' => 1, 
                    'title' => 'Cuestionario introductorio',
                    'type' => 'quiz',
                    'url' => null,
                    'description' => 'Cuestionario sobre los primeros temas.',
                    'order' => 3,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'lesson_id' => 2, // Cambia esto a otra lección existente
                    'title' => 'Tarea de evaluación',
                    'type' => 'video',
                    'url' => 'http://localhost/cursos/public/storage/videos/short12.mp4',
                    'description' => 'Primera tarea del curso.',
                    'order' => 1,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);
        }
    }

}
