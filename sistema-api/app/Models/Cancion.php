<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cancion extends Model
{
    use HasFactory;

    protected $table = 'canciones';

    protected $fillable = ['nombre', 'autor', 'id_genero', 'id_dificultad', 'id_afinacion', 'url_youtube', 'detalles'];

    public function genero()
    {
        return $this->hasOne(Genero::class, 'id', 'id_genero');
    }

    public function dificultad()
    {
        return $this->hasOne(Dificultad::class, 'id', 'id_dificultad');
    }

    public function afinacion()
    {
        return $this->hasOne(Afinacion::class, 'id', 'id_afinacion');
    }
}
