<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrdenarCapturasRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'capturas' => 'required'
        ];
    }

    public function messages(): array
    {
        return [
            'capturas.required' => 'Las capturas son obligatorias'
        ];
    }
}
