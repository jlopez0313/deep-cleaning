<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use \App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return \App\Models\User::with('rol')->latest()->paginate( config('general.paginate') );
    }

    /**
     * Store a newly created resource in storage. Request is set by FORM ENCODE
     */
    public function store(Request $request)
    {
        $user = \App\Models\User::create([
            'roles_id' => $request->roles_id,
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make( $request->password ),
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now(),
        ]);

        return $user;
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $data = $user;
        $data->rol = $user->rol;
        return $data;
    }

    /**
     * Update the specified resource in storage. Request is sent by FORM ENCODE
     */
    public function update(Request $request, User $user)
    {
        $user->roles_id = $request->roles_id;
        $user->name     = $request->name;
        $user->email    = $request->email;
        $user->password = Hash::make( $request->password );
        $user->save();

        $data = $user;
        $data->rol = $user->rol;
        return $data;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return $user;
    }
}
