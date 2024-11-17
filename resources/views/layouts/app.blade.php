<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name', 'Laravel') }}</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!-- css -->
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <!--videos personalizados-->
    <link href="https://vjs.zencdn.net/7.20.3/video-js.css" rel="stylesheet" />
    <script src="https://vjs.zencdn.net/7.20.3/video.min.js"></script>


    @vite(['resources/js/app.tsx']) <!-- Asegúrate de tener esta línea -->

</head>
<body>

<div id="app" class="container mx-auto">
        @if(auth()->check())
            <p>Bienvenido, {{ auth()->user()->name }}</p>
        @else
            <p>Bienvenido, invitado</p>
        @endif

        @inertia <!-- Incluye esta línea para renderizar Inertia -->
    </div>


    <div id="notification" style="display: none;border-radius:50px;"></div>
</body>
</html>
