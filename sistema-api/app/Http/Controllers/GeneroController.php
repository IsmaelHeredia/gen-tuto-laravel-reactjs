<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Genero;
use App\Traits\RespuestaTrait;

class GeneroController extends Controller
{
    use RespuestaTrait;

    public function listar(Request $request)
    {
        $filtro = $request->input('filtro');
        $generos = Genero::where('nombre', 'like', '%' . $filtro . '%')->get();
        return $this->success('Se envío listado de géneros', $generos);
    }
}
