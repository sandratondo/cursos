<!-- resources/views/enrollments/index.blade.php -->

@extends('layouts.app')

@section('title', 'Mis Inscripciones')

@section('content')
    <div class="container mx-auto mt-4">
        <h1 class="text-3xl font-bold mb-6">Mis Inscripciones</h1>
        
        @if ($enrollments->isEmpty())
            <p class="text-gray-700 text-lg">No estás inscrito en ningún curso actualmente.</p>
        @else
            <!-- Contenedor de las cards, usando grid para mostrar una al lado de la otra -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                @foreach ($enrollments as $enrollment)
                    <div class="bg-white shadow-md rounded-lg overflow-hidden">
                        <!-- Imagen del curso -->
                        <img src="{{ $enrollment->course->image_url ?? 'https://via.placeholder.com/150' }}" class="w-full h-48 object-cover" alt="{{ $enrollment->course->title }}">

                        <div class="p-4">
                            <!-- Título del curso -->
                            <h5 class="text-lg font-bold mb-2">{{ $enrollment->course->title }}</h5>

                            <!-- Descripción del curso -->
                            <p class="text-gray-700 mb-3">{{ $enrollment->course->description }}</p>

                            <!-- Fecha de inscripción -->
                            <p class="text-gray-600 text-sm mb-1">
                                <strong>Fecha de inscripción:</strong> {{ $enrollment->created_at->format('d M, Y') }}
                            </p>

                            <!-- Estado de la inscripción (in_progress, completed, expired) -->
                            <p class="text-gray-600 text-sm mb-3">
                                <strong>Estado:</strong> 
                                @if ($enrollment->status == 'in_progress')
                                    <span class="text-blue-500">En progreso</span>
                                @elseif ($enrollment->status == 'completed')
                                    <span class="text-green-500">Completado</span>
                                @elseif ($enrollment->status == 'expired')
                                    <span class="text-red-500">Expirado</span>
                                @endif
                            </p>

                            <!-- Botón de acción  -->
                            <a href="{{ route('courses.lessons', $enrollment->course->id) }}" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Ver curso</a>
                        </div>
                    </div>
                @endforeach
            </div>
        @endif
    </div>
@endsection
