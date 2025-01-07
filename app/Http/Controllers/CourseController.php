<?php

namespace App\Http\Controllers;
use App\Models\Enrollment; // Importa el modelo Enrollment
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

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
        return Inertia::render('Courses/main');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'nullable|numeric|min:0',
            'is_free' => 'required|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'objetivo' => 'nullable|string',
            'duracion' => 'nullable|integer|min:0',
        ]);

        $course = new Course();
        $course->title = $request->title;
        $course->description = $request->description;
        $course->price = $request->price;
        $course->is_free = $request->is_free;
        $course->objetivo = $request->objetivo;
        $course->duracion = $request->duracion;
        $course->user_id = auth()->id();

        if ($request->hasFile('image')) {
            // Guardar la nueva imagen
            $path = $request->file('image')->store('images', 'public');
            $course->image_url = $path;
        }
        $course->save();

        return redirect()->route('dashboard')->with('message', 'Curso creado correctamente');
    }

    public function edit(Course $course)
    {
        return Inertia::render('Courses/Edit', [
            'course' => $course,
        ]);
    }

    public function update(Request $request, Course $course)
    {
        // Validación de los campos
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'nullable|numeric|min:0',
            'is_free' => 'required|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'objetivo' => 'nullable|string',
            'duracion' => 'nullable|integer|min:0',
            'expires_at' => 'nullable|date',
        ]);
    
        // Actualización de los campos del curso
        $course->title = $request->title;
        $course->description = $request->description;
        $course->price = $request->price;
        $course->is_free = $request->is_free;
        $course->objetivo = $request->objetivo;
        $course->duracion = $request->duracion;
        $course->expires_at = $request->expires_at;
        
        if ($request->hasFile('image')) {
            // Eliminar la imagen anterior si existe
            if ($course->image_url) {
                Storage::delete('public/' . $course->image_url);
            }
            // Guardar la nueva imagen
            $path = $request->file('image')->store('images', 'public');
            $course->image_url = $path;
        }
    
        $course->save();
    
        return redirect()->route('dashboard')->with('message', 'Curso editado correctamente');
    }

    public function destroy(Course $course)
    {
        // Eliminar lecciones y módulos asociados
        foreach ($course->lessons as $lesson) {
            $lesson->modules()->delete();
            $lesson->delete();
        }

        // Eliminar el curso
        $course->delete();

        return response()->json(['message' => 'Curso eliminado correctamente']);
    }

}
