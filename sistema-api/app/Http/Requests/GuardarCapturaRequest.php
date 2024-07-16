<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GuardarCapturaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    
    public function rules(): array
    {
        return [
            'id_cancion' => 'required',
            'nombre' => 'required',
            'imagen' => 'required',
            'orden' => 'required'
        ];
    }

    public function messages(): array
    {
        return [
            'id_cancion.required' => 'Seleccione la canción',
            'nombre.required' => 'El nombre es obligatorio',
            'imagen.required' => 'La imagen es obligatoria',
            'orden.required' => 'El orden es obligatorio'
        ];
    }
}
