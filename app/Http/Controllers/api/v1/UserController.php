<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use \App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function validateRequest(Request $request)
    {
        return $request->validate([
            'parent_id' => 'sometimes|nullable|'.Rule::notIn([$request->id]),
            'roles_id' => 'required',
            'name' => 'required',
            'email' => 'required|email|'.Rule::unique(User::class)->ignore($request->id),
            'password' => 'required',
            'password' => Rule::requiredIf(!$request->id),
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return \App\Models\User::with('rol')
                ->latest()
                ->paginate( $request->rowsPerPage );
    }

    /**
     * Store a newly created resource in storage. Request is set by FORM ENCODE
     */
    public function store(Request $request)
    {
        $this->validateRequest($request);

        $hasUser = 

        $user = \App\Models\User::create([
            'parent_id' => $request->parent_id,
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
        $this->validateRequest($request);
        
        $user->parent_id = $request->parent_id;
        $user->roles_id = $request->roles_id;
        $user->name     = $request->name;
        $user->email    = $request->email;

        if ( $request->password ) {
            $user->password = Hash::make( $request->password );
        }

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

    public function byRol(Request $request)
    {
        // return $request->all();
        return \App\Models\User::with('rol')->whereIn('roles_id', $request->roles)->orderBy('name')->get();
    }

    public function all()
    {
        return \App\Models\User::latest()->get();
    }
}
