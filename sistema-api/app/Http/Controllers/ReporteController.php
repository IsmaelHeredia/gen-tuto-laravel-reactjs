<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cancion;
use App\Traits\RespuestaTrait;
use Illuminate\Support\Facades\DB;

class ReporteController extends Controller
{
    use RespuestaTrait;

    public function generarDatos()
    {
        $lista = [];

        $datos = DB::table('canciones')
        ->join('generos', 'canciones.id_genero', '=', 'generos.id')
        ->select(DB::raw('count(id_genero) as cantidad, generos.nombre as nombre_genero'))
        ->groupBy('generos.nombre')
        ->orderBy('cantidad', 'DESC')
        ->take(3)
        ->get();

        /*
        $canciones = Cancion::orderBy('id', 'desc')->get();

        foreach($canciones as $cancion)
        {
            $id_genero = $cancion->id_genero;
            $nombre_genero = $cancion->genero->nombre; 
            $cantidad = $cancion->genero()->sum('id');
            $datos = [];
            $datos['id_genero'] = $id_genero;
            $datos['nombre_genero'] = $nombre_genero;
            $datos['cantidad'] = $cantidad;
            array_push($lista, $datos);
        }
        */

        return $this->success('Se enviaron los datos para el gráfico', $datos);
    }
}
