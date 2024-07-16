<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cancion;
use App\Traits\RespuestaTrait;
use App\Http\Requests\GuardarCancionRequest;

class CancionController extends Controller
{
    use RespuestaTrait;

    public function listar(Request $request, string $pagina)
    {
        $porNombre = $request->input('nombre');
        $porGenero = $request->input('id_genero');
        $porDificultad = $request->input('id_dificultad');
        $porAfinacion = $request->input('id_afinacion');

        if(!is_numeric($pagina))
        {
            $pagina = 1;
        }

        $canciones = Cancion::with(['genero','dificultad','afinacion']);
        
        if($porNombre != "")
        {
            $canciones->where('nombre', 'like', '%' . $porNombre . '%');
        }

        if(is_numeric($porGenero) && $porGenero > 0)
        {
            $canciones->where('id_genero', $porGenero);
        }

        if(is_numeric($porDificultad) && $porDificultad > 0)
        {
            $canciones->where('id_dificultad', $porDificultad);
        }     
        
        if(is_numeric($porAfinacion) && $porAfinacion > 0)
        {
            $canciones->where('id_afinacion', $porAfinacion);
        }

        $canciones->orderBy('updated_at', 'DESC');
        
        $resultado = $canciones->paginate($_ENV['PER_PAGE'], ['*'], 'page', $pagina);

        return $this->success('Se envío listado de canciones', $resultado);
    }

    public function cargar(string $id)
    {
        $cancion = Cancion::with(['genero','dificultad','afinacion'])->find($id);

        if($cancion)
        {
            return $this->success('Se envío datos de la canción', $cancion);
        }
        else
        {
            return $this->error('La canción no existe');
        }
    }

    public function crear(GuardarCancionRequest $request)
    {
        $validated = $request->validated();

        $cancion = new Cancion;

        $cancion->nombre = $validated['nombre'];
        $cancion->autor = $validated['autor'];
        $cancion->id_genero = $validated['id_genero'];
        $cancion->id_dificultad = $validated['id_dificultad'];
        $cancion->id_afinacion = $validated['id_afinacion'];
        $cancion->url_youtube = $validated['url_youtube'];
        $cancion->detalles = $validated['detalles'];

        $guardado = $cancion->save();

        if($guardado)
        {
            return $this->success('La canción fue creada');
        }
        else
        {
            return $this->error('Ocurrió un error creando la canción');
        }
    }

    public function actualizar(GuardarCancionRequest $request, string $id)
    {
        $validated = $request->validated();

        $cancion = Cancion::find($id);

        if(!$cancion)
        {
            return $this->error('La canción no existe');
        }

        $cancion->nombre = $validated['nombre'];
        $cancion->autor = $validated['autor'];
        $cancion->id_genero = $validated['id_genero'];
        $cancion->id_dificultad = $validated['id_dificultad'];
        $cancion->id_afinacion = $validated['id_afinacion'];
        $cancion->url_youtube = $validated['url_youtube'];
        $cancion->detalles = $validated['detalles'];

        $guardado = $cancion->save();

        if($guardado)
        {
            return $this->success('La canción fue actualizada');
        }
        else
        {
            return $this->error('Ocurrió un error actualizando la canción');
        }
    }

    public function borrar(string $id)
    {
        $cancion = Cancion::find($id);

        if(!$cancion)
        {
            return $this->error('La canción no existe');
        }

        if($cancion->delete())
        {
            return $this->success('La canción fue borrada');
        }
        else
        {
            return $this->error('Ocurrió un error borrando la canción');
        }
    }
}
