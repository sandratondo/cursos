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
        ]);

        // Crear un nuevo registro en la base de datos
        $contact = Contact::create([
            'name' => $request->name,
            'email' => $request->email,
            'message' => $request->message,
        ]);

        // Responder con un mensaje de éxito
        return response()->json(['message' => 'Mensaje enviado correctamente'], 200);
    }
}

