<?php

namespace App\Http\Controllers;

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

    public function showLessons($courseId)
    {
        $course = Course::with('lessons.modules', 'lessons.comments.user')->findOrFail($courseId);

        return Inertia::render('Lessons', [
            'course' => $course,
            'authUser' => auth()->user(), // Pasar datos del usuario autenticado
        ]);
    }
}
