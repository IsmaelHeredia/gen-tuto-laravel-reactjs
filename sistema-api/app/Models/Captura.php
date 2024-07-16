<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Captura extends Model
{
    use HasFactory;

    protected $table = 'capturas';

    protected $fillable = ['id_cancion', 'nombre', 'imagen', 'orden'];

    public function cancion()
    {
        return $this->hasOne(Cancion::class, 'id', 'id_cancion');
    }
}
