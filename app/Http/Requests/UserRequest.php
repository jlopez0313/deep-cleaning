<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use \App\Models\User;

class UserRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'parent_id' => 'sometimes|nullable|'.Rule::notIn([$this->id]),
            'roles_id' => 'required',
            'name' => 'required',
            'email' => 'required|email|'.Rule::unique(User::class)->ignore($this->id),
            'password' => 'sometimes|nullable',
            'foto' => 'sometimes|nullable|image',
        ];
    }
}