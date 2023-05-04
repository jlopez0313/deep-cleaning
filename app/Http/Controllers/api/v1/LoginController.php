<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $this->validateLogin($request);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Credenciales Invalidas'
            ], 401);
        }

        return response()->json([
            'token' => $request->user()->createToken($request->device)->plainTextToken,
            'user' => $request->user()->with('rol', 'local')->first(),
            'message' => 'Success'
        ]);
    }

    public function validateLogin(Request $request)
    {
        return $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device' => 'required'
        ]);
    }
}