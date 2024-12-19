<?php
// app/Http/Controllers/InstructorDashboardController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;

class InstructorDashboardController extends Controller
{
    public function index()
    {
        $courses = auth()->user()->courses;

        return Inertia::render('Instructor/DashboardInstructor', [
            'courses' => $courses,
        ]);
    }
}
