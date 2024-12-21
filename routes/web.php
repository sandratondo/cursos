<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\InstructorDashboardController;
use App\Http\Controllers\StudentDashboardController;
use App\Http\Middleware\RoleMiddleware;
use App\Http\Controllers\VideoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth; 
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;
use App\Models\Course;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


    Route::get('/dashboard', function () {
        $user = Auth::user(); // Utiliza el facade de Auth para obtener el usuario autenticado

        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => $user, // Pasa el usuario autenticado
            ],
            'courses' => Course::all(), // Obtén todos los cursos
        ]);
    })->middleware(['auth', 'verified'])->name('dashboard');




//rutas login
Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LoginController::class, 'logout'])->name('logout');

// Rutas de registro
Route::get('register', [RegisterController::class, 'showRegistrationForm'])->name('register');
Route::post('register', [RegisterController::class, 'register']);

// Google OAuth
Route::get('auth/google', [GoogleController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

// Rutas protegidas por autenticación y rol
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
});

Route::middleware(['auth', 'role:instructor'])->group(function () {
    Route::get('/instructor/dashboard', [InstructorDashboardController::class, 'index'])->name('instructor.dashboard');
    Route::resource('courses', CourseController::class)->except(['show', 'create', 'store', 'edit', 'update']);
    Route::get('/courses/create', [CourseController::class, 'create'])->name('courses.create');
    Route::post('/courses', [CourseController::class, 'store'])->name('courses.store');
    Route::get('/courses/{course}/edit', [CourseController::class, 'edit'])->name('courses.edit');
    Route::put('/courses/{course}', [CourseController::class, 'update'])->name('courses.update');
});

Route::middleware(['auth', 'role:student'])->group(function () {
    Route::get('/student/dashboard', [StudentDashboardController::class, 'index'])->name('student.dashboard');
});

//inscripciones
Route::middleware(['auth'])->group(function () {
    Route::get('/enrollments', [EnrollmentController::class, 'index'])->name('enrollments.index');
    Route::post('/enroll', [EnrollmentController::class, 'enroll'])->name('enroll');
});

//lessons
Route::middleware(['auth'])->group(function () {
    Route::get('/courses/{course}/lessons', [CourseController::class, 'showLessons'])->name('courses.lessons');
    Route::get('/courses/{id}', [CourseController::class, 'showCourse'])->name('courses.showCourse');
});

//comments
Route::middleware(['auth'])->group(function () {
    Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
    Route::post('/comments/store', [CommentController::class, 'store'])->name('comments.store');
    Route::post('/comments/reply/{commentId}', [CommentController::class, 'reply']);
    Route::post('/comments', [CommentController::class, 'store']);
    Route::get('/comments/{lessonId}', [CommentController::class, 'getComments']);
    
    Route::get('/video/{videoName}', [VideoController::class, 'stream'])->name('video.stream');

    

});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

