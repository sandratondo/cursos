<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Module;
use App\Models\Lesson;

class ModuleController extends Controller
{
    public function getModules($lessonId)
    {
        $modules = Module::where('lesson_id', $lessonId)->orderBy('order')->get();

        if ($modules->isEmpty()) {
            return response()->json(['message' => 'No hay módulos para esta lección'], 404);
        }

        return response()->json(['modules' => $modules]);
    }


    public function store(Request $request, $lessonId)
    {
        // Validar que la lección exista
        $lesson = Lesson::find($lessonId);
        if (!$lesson) {
            return response()->json(['error' => 'La lección no existe'], 404);
        }

        // Validar los datos enviados
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:video,article,quiz,assignment',
            'url' => 'nullable|url',
            'description' => 'nullable|string',
            'order' => 'required|integer',
        ]);

        // Crear el módulo
        $module = new Module();
        $module->lesson_id = $lessonId;
        $module->title = $validatedData['title'];
        $module->type = $validatedData['type'];
        $module->url = $validatedData['url'] ?? null;
        $module->description = $validatedData['description'] ?? null;
        $module->order = $validatedData['order'];
        $module->save();

        return response()->json([
            'message' => 'Módulo creado correctamente',
            'module' => $module,
        ]);
    }

}
