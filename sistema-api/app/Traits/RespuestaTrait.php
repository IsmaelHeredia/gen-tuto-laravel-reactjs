<?php

namespace App\Traits;

use Symfony\Component\HttpFoundation\Response;

trait RespuestaTrait
{
    protected function success($message, $data = null)
    {
        return response()->json(['estado' => 1, 'mensaje' => $message, 'datos' => $data]);
    }

    protected function error($message, $data = null)
    {
        return response()->json(['estado' => 0, 'mensaje' => $message, 'datos' => $data]);
    }

    protected function data($generos = null, $dificultades = null, $afinaciones = null, $canciones = null)
    {
        return response()->json(['estado' => 1, 'generos' => $generos, 'dificultades' => $dificultades, 'afinaciones' => $afinaciones, 'canciones' => $canciones]);
    }

    protected function data2($cancion = null, $capturas = null)
    {
        return response()->json(['estado' => 1, 'cancion' => $cancion, 'capturas' => $capturas]);
    }

}
