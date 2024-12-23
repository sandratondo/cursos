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

    public function create()
    {
        return Inertia::render('Courses/Create');
    }

    public function store(Request $request)
    {
        $course = new Course();
        $course->title = $request->title;
        $course->description = $request->description;
        $course->price = $request->price;
        $course->is_free = $request->is_free;
        $course->user_id = auth()->id();
        $course->save();

        return redirect()->route('dashboard');
    }

    public function edit(Course $course)
    {
        return Inertia::render('Courses/Edit', [
            'course' => $course,
        ]);
    }

    public function update(Request $request, Course $course)
    {
        $course->title = $request->title;
        $course->description = $request->description;
        $course->price = $request->price;
        $course->is_free = $request->is_free;
        $course->save();

        return redirect()->route('dashboard')->with('message', 'Curso editado correctamente');
        
    }
}
