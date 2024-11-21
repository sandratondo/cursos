<?php

namespace App\Http\Controllers;
use App\Models\Enrollment; // Importa el modelo Enrollment
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    
    public function index()
    {
        $courses = Course::all();
        return view('courses.index', compact('courses'));
    }

    public function showCourse($id)
    {
        $course = Course::with('lessons')->findOrFail($id);
        $user = auth()->user(); // Obtener el usuario autenticado

        // Verificar si el usuario está inscrito en el curso
        $isEnrolled = Enrollment::where('course_id', $id)
                                ->where('user_id', $user->id)
                                ->exists();

        return Inertia::render('CoursesLanding', [
            'course' => $course,
            'isEnrolled' => $isEnrolled,
            'user' => $user,
        ]);
    }

    public function showLessons($courseId)
    {
        $course = Course::with('lessons.modules', 'lessons.comments.user')->findOrFail($courseId);

        return Inertia::render('Lessons', [
            'course' => $course,
            'authUser' => auth()->user(), // Pasar datos del usuario autenticado
        ]);
    }
}
