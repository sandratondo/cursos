<?php

namespace App\Traits;

use Illuminate\Http\Request;

trait Paginates
{
    public function paginateQuery($query, Request $request)
    {
        $perPage = 10; // Número de comentarios por página
        return $query->paginate($perPage);
    }
}
