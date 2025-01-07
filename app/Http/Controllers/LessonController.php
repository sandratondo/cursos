<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessonController extends Controller
{
    public function create(Course $course)
    {
        return Inertia::render('Lessons/Create', [
            'course' => $course,
        ]);
    }

    public function store(Request $request, Course $course)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'order' => 'required|integer',
            'video_blob' => 'nullable|file',
        ]);

        $lesson = new Lesson();
        $lesson->course_id = $course->id;
        $lesson->title = $request->title;
        $lesson->description = $request->description;
        $lesson->order = $request->order;

        if ($request->hasFile('video_blob')) {
            $path = $request->file('video_blob')->store('videos', 'public');
            $lesson->video_blob = $path;
        }

        $lesson->save();

        return redirect()->route('courses.lessons', $course->id)->with('message', 'Lección creada correctamente');
    }
}
