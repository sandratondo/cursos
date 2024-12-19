<?php
// app/Http/Controllers/AdminDashboardController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;
use App\Models\User;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $courses = Course::all();
        $users = User::all();

        return Inertia::render('Admin/DashboardAdmin', [
            'courses' => $courses,
            'users' => $users,
        ]);
    }
}
