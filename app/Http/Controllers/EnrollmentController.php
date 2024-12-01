<?php
namespace App\Http\Controllers;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Exception;
use Inertia\Inertia;

class EnrollmentController extends Controller
{
    public function index()
    {
        // Obtener los cursos a los que el usuario está inscrito y pasarlos a la vista

        // Obtiene el usuario autenticado
        $user = Auth::user();

        // Filtra las inscripciones solo del usuario autenticado
        $enrollments = Enrollment::with('course')
                                 ->where('user_id', $user->id)
                                 ->get();

        return Inertia::render('Enrollments/Index', [
            'enrollments' => $enrollments,
        ]);
       
    }

    public function enroll(Request $request)
    {
        $user = Auth::user();
        $courseId = $request->input('course_id'); //Obtiene el ID del curso desde la solicitud.

        try {
            // Verificar si el usuario ya está inscrito en el curso
            $existingEnrollment = Enrollment::where('course_id', $courseId)
                ->where('user_id', $user->id)
                ->first();

            if ($existingEnrollment) {
                return response()->json(['message' => 'Ya estás inscrito en este curso.'], 400);
            }

            // Crear una nueva inscripción
            Enrollment::create([
                'user_id' => $user->id,
                'course_id' => $courseId,
                'enrollment_date' => now(),
                'status' => 'in_progress',
            ]);

            return response()->json(['message' => 'Inscripción exitosa.'], 200);
        } catch (\Exception $e) {
            Log::error('Error al inscribir al usuario en el curso: ' . $e->getMessage());
            return response()->json(['message' => 'Error al inscribirse en el curso.'], 500);
        }
    }



}
