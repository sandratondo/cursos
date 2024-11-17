<!-- resources/views/dashboard.blade.php -->

@extends('layouts.app')

@section('title', 'Dashboard')

@section('content')
    <div class="container mt-4">
        <h1>Dashboard</h1>
        <div class="row">
            @foreach ($courses as $course)
                <div class="col-md-4">
                    <div class="card mb-4">
                        <img src="{{ $course->image_url ?? 'https://via.placeholder.com/150' }}" class="card-img-top" alt="{{ $course->title }}">
                        <div class="card-body">
                            <h5 class="card-title">{{ $course->title }}</h5>
                            <p class="card-text">{{ $course->description }}</p>
                            <p class="card-text">{{ $course->is_free ? 'Gratis' : '$' . $course->price }}</p>
                            <a href="#" class="btn btn-primary">Ver más</a>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
@endsection
