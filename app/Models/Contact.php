<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    // Los campos que son asignables masivamente
    protected $fillable = [
        'name',
        'email',
        'message',
        'course_id',
        'user_id',
    ];

    // Si es necesario, puedes definir qué campos no son asignables masivamente.
    // protected $guarded = ['id'];

    // Si deseas establecer los campos que se deben manejar como fechas
    protected $dates = ['created_at', 'updated_at'];

    // Si deseas configurar un formato de fecha específico
    // protected $dateFormat = 'Y-m-d H:i:s';
}
