<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GuardarCancionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    
    public function rules(): array
    {
        return [
            'nombre' => 'required',
            'autor' => 'required',
            'id_genero' => 'required',
            'id_dificultad' => 'required',
            'id_afinacion' => 'required',
            'url_youtube' => 'required',
            'detalles' => 'required'
        ];
    }

    public function messages(): array
    {
        return [
            'nombre.required' => 'El nombre es obligatorio',
            'autor.required' => 'El autor es obligatorio',
            'id_genero.required' => 'Seleccione el género',
            'id_dificultad.required' => 'Seleccione la dificultad',
            'id_afinacion.required' => 'Seleccione la afinación',
            'url_youtube.required' => 'La URL de youtube es obligatoria',
            'detalles.required' => 'Los detalles son obligatorios'
        ];
    }
}
