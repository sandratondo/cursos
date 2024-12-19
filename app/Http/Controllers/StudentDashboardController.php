<?php
// app/Http/Controllers/StudentDashboardController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;

class StudentDashboardController extends Controller
{
    public function index()
    {
        $courses = auth()->user()->enrolledCourses;

        return Inertia::render('Student/DashboardStudent', [
            'courses' => $courses,
        ]);
    }
}
