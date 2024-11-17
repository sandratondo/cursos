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
        /*
        // Obtener los cursos a los que el usuario está inscrito y pasarlos a la vista
        $enrollments = auth()->user()->enrollments; // Ajustar según tu lógica de datos
        return view('enrollments.index', compact('enrollments'));
        
        $user = Auth::user(); // Utiliza el facade Auth para obtener el usuario autenticado
        $enrollments = $user->enrollments; // Ajustar según tu lógica de datos
        return view('enrollments.index', compact('enrollments'));
        */
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


}
