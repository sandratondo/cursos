<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    // Método para almacenar los mensajes de contacto
    public function store(Request $request)
    {
        // Validar los datos del formulario
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
            'course_id' => 'nullable|exists:courses,id',
        ]);

        // Crear un nuevo registro en la base de datos
        $contact = Contact::create([
            'name' => $request->name,
            'email' => $request->email,
            'message' => $request->message,
            'course_id' => $request->course_id,
            'user_id' => auth()->id(), // Obtener el ID del usuario autenticado
        ]);

        // Responder con un mensaje de éxito
        return response()->json(['message' => 'Mensaje enviado correctamente'], 200);
    }
}

