<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dificultad;
use App\Traits\RespuestaTrait;

class DificultadController extends Controller
{
    use RespuestaTrait;

    public function listar(Request $request)
    {
        $filtro = $request->input('filtro');
        $dificultades = Dificultad::where('nombre', 'like', '%' . $filtro . '%')->get();
        return $this->success('Se envío listado de dificultades', $dificultades);
    }
}
