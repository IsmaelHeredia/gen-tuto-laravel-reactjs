<?php

namespace Database\Seeders;

use App\Models\Usuario;
use App\Models\Genero;
use App\Models\Dificultad;
use App\Models\Afinacion;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $datetime = date('Y-m-d H:i:s');

        Usuario::insert([
            ['nombre' => 'supervisor', 'clave' => Hash::make('supervisor'), 'created_at' => $datetime, 'updated_at' => $datetime],
        ]);

        Genero::insert([
            ['nombre' => 'Rock'],
            ['nombre' => 'Metal'],
            ['nombre' => 'Blues'],
            ['nombre' => 'Pop'],
            ['nombre' => 'Clásico'],
            ['nombre' => 'Country'],
            ['nombre' => 'Reggae'],
            ['nombre' => 'Jazz'],
            ['nombre' => 'Funk'],
        ]);

        Dificultad::insert([
            ['nombre' => 'Fácil'],
            ['nombre' => 'Intermedio'],
            ['nombre' => 'Difícil'],
        ]);

        Afinacion::insert([
            ['nombre' => 'Estándar'],
            ['nombre' => 'Drop C'],
            ['nombre' => 'Drop D'],
            ['nombre' => 'Drop Db'],
            ['nombre' => 'Medio tono abajo'],
            ['nombre' => 'Dadgad'],
        ]);

    }
}
