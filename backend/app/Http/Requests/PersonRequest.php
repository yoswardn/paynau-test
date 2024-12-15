<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class PersonRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->route('id');

        return [
            'name' => 'required|regex:/^[\pL\s\-]+$/u|min:3|max:50',
            'last_name' => 'required|regex:/^[\pL\s\-]+$/u|min:3|max:50',
            'email' => [ 'required', 'email', Rule::unique('persons')->ignore($id) ],
            'date_born' => 'nullable|date|before_or_equal:' . now()->format('Y-m-d'),
            'phone' => 'nullable|numeric|min:7',
            'address' => 'nullable|string',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation errors.',
            'errors' => $validator->errors(),
        ], 422));
    }
}
