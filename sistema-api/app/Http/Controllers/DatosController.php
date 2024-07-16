<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Genero;
use App\Models\Dificultad;
use App\Models\Afinacion;
use App\Models\Cancion;
use App\Models\Captura;
use App\Traits\RespuestaTrait;

class DatosController extends Controller
{
    use RespuestaTrait;

    public function listarDatosCancion()
    {
        $generos = Genero::all();
        $dificultades = Dificultad::all();
        $afinaciones = Afinacion::all();
        //$canciones = Cancion::all();
        $canciones = Cancion::with(['genero','dificultad','afinacion'])->paginate($_ENV['PER_PAGE'], ['*'], 'page', 1);
        return $this->data($generos,$dificultades,$afinaciones,$canciones);
    }

    public function listarDatosCaptura($id)
    {
        $cancion = Cancion::with(['genero','dificultad','afinacion'])->find($id);
        $capturas = Captura::with(['cancion'])->orderBy('orden', 'asc')->get();
        return $this->data2($cancion,$capturas);
    }

}
