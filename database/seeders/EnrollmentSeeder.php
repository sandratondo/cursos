<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Enrollment;
use App\Models\User;
use App\Models\Course;

class EnrollmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Obtener usuarios y cursos de prueba (asumiendo que ya existen en la base de datos)
        $users = User::all();
        $courses = Course::all();

        // Crear inscripciones de prueba
        foreach ($users as $user) {
            foreach ($courses as $course) {
                Enrollment::create([
                    'user_id' => $user->id,
                    'course_id' => $course->id,
                    'status' => 'in_progress',
                ]);
            }
        }
    }
}
