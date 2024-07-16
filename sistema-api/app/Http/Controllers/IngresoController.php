<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use App\Traits\SeguridadTrait;
use App\Traits\RespuestaTrait;
use App\Http\Requests\IngresoRequest;

class IngresoController extends Controller
{
    use SeguridadTrait;
    use RespuestaTrait;

    public function ingreso(IngresoRequest $request)
    {
        $validated = $request->validated();

        $usuario = $validated['usuario'];
        $clave = $validated['clave'];

        $usuario_bd = Usuario::where('nombre', $usuario)->first();

        if(!$usuario_bd)
        {
            return $this->error('El usuario no existe');
        }

        if (Hash::check($clave, $usuario_bd->clave))
        {
            $token = $this->generarToken($usuario_bd->nombre,$usuario_bd->id);
            return $this->success('El usuario fue logeado correctamente', $token);
        }
        else
        {
            return $this->error('La contraseña es incorrecta');
        }
    }

    public function validar(Request $request)
    {
        $token = $request->input('token');

        if($this->validarToken($token))
        {
            $datos = $this->mostrarDatosToken($token);
            return $this->success('Acceso validado', $datos);
        }
        else
        {
            return $this->error('Acceso denegado');
        }
    }
}
