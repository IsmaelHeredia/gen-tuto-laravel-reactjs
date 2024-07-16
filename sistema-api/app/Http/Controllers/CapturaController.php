<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Captura;
use App\Traits\RespuestaTrait;
use App\Http\Requests\GuardarCapturaRequest;
use App\Http\Requests\OrdenarCapturasRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CapturaController extends Controller
{
    use RespuestaTrait;

    public function listar(Request $request, string $pagina)
    {
        $nombre = $request->input('nombre');

        if(!is_numeric($pagina))
        {
            $pagina = 1;
        }

        $capturas = Captura::with(['cancion'])
            ->where('nombre', 'like', '%' . $nombre . '%')
            ->orderBy('orden', 'ASC')
            ->paginate($_ENV['PER_PAGE'], ['*'], 'page', $pagina);

        return $this->success('Se envío listado de capturas', $capturas);
    }

    public function listarCapturasCancion(string $id)
    {
        $capturas = Captura::with(['cancion'])->orderBy('orden', 'asc')->find($id);
        return $this->success('Se envío listado de capturas', $capturas);
    }

    public function ordenarCapturasCancion(OrdenarCapturasRequest $request, string $id)
    {
        $validated = $request->validated();

        $capturas = $validated['capturas'];

        foreach($capturas as $captura)
        {
            $id = $captura['id'];
            $orden = $captura['orden'];

            $cap = Captura::find($id);
            $cap->orden = $orden;
            $cap->save();
        }

        return $this->success('Se ordeno el listado de capturas');
    }

    public function cargar(string $id)
    {
        $captura = Captura::with(['cancion'])->find($id);

        if($captura)
        {
            return $this->success('Se envío datos de la captura', $captura);
        }
        else
        {
            return $this->error('La captura no existe');
        }
    }

    public function crear(GuardarCapturaRequest $request)
    {
        $validated = $request->validated();

        $imagen_contenido = $validated['imagen'];

        if (preg_match('/^data:image\/(\w+);base64,/', $imagen_contenido, $formato)) {

            $imagen_contenido = substr($imagen_contenido, strpos($imagen_contenido, ',') + 1);
            $formato = strtolower($formato[1]);
        
            if (!in_array($formato,['jpg','jpeg','gif','png'])) {
                return $this->error('El formato de la imagen es incorrecto');
            }

            $imagen_contenido = str_replace(' ','+',$imagen_contenido);
            $imagen_contenido = base64_decode($imagen_contenido);

        }

        $imagen_nuevo_nombre = Str::random(10) . '.jpg';
    
        Storage::disk('public')->put($imagen_nuevo_nombre, $imagen_contenido);

        $captura = new Captura;

        $captura->id_cancion = $validated['id_cancion'];
        $captura->nombre = $validated['nombre'];
        $captura->imagen = $imagen_nuevo_nombre;
        $captura->orden = $validated['orden'];
        
        $guardado = $captura->save();

        if($guardado)
        {
            return $this->success('La captura fue creada');
        }
        else
        {
            return $this->error('Ocurrió un error creando la captura');
        }

    }

    public function actualizar(GuardarCapturaRequest $request, string $id)
    {
        $validated = $request->validated();

        $captura = Captura::find($id);

        if(!$captura)
        {
            return $this->error('La captura no existe');
        }

        $imagen_contenido = $validated['imagen'];

        $imagen_nuevo_nombre = Str::random(10) . '.jpg';

        if (preg_match('/^data:image\/(\w+);base64,/', $imagen_contenido, $formato))
        {

            $imagen_contenido = substr($imagen_contenido, strpos($imagen_contenido, ',') + 1);
            $formato = strtolower($formato[1]);
        
            if (!in_array($formato,['jpg','jpeg','gif','png']))
            {
                return $this->error('El formato de la imagen es incorrecto');
            }

            $imagen_contenido = str_replace(' ','+',$imagen_contenido);
            $imagen_contenido = base64_decode($imagen_contenido);

            Storage::disk('public')->put($imagen_nuevo_nombre, $imagen_contenido);

            Storage::disk('public')->delete(Captura::find($id)->imagen);

        }
        else
        {
            $imagen = Captura::where('imagen', $imagen_contenido)->get();

            if($imagen != null)
            {
                $imagen_nuevo_nombre = $imagen_contenido;
            }
            else
            {
                return $this->error('La imagen no existe');
            }
        }
    
        $captura->id_cancion = $validated['id_cancion'];
        $captura->nombre = $validated['nombre'];
        $captura->imagen = $imagen_nuevo_nombre;
        $captura->orden = $validated['orden'];

        $guardado = $captura->save();

        if($guardado)
        {
            return $this->success('La captura fue actualizada');
        }
        else
        {
            return $this->error('Ocurrió un error actualizando la captura');
        }
    }

    public function borrar(string $id)
    {
        $captura = Captura::find($id);

        if(!$captura)
        {
            return $this->error('La captura no existe');
        }

        Storage::disk('public')->delete(Captura::find($id)->imagen);

        if($captura->delete())
        {
            return $this->success('La captura fue borrada');
        } 
        else
        {
            return $this->error('Ocurrió un error borrando la captura');
        }
    }
}
