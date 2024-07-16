<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Afinacion;
use App\Traits\RespuestaTrait;

class AfinacionController extends Controller
{
    use RespuestaTrait;

    public function listar(Request $request)
    {
        $filtro = $request->input('filtro');
        $afinaciones = Afinacion::where('nombre', 'like', '%' . $filtro . '%')->get();
        return $this->success('Se envío listado de afinaciones', $afinaciones);
    }
}
