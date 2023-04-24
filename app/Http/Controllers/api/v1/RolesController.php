<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Roles;

class RolesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return \App\Models\Roles::latest()->paginate( config('general.paginate') );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Roles $rol)
    {
        // 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Roles $rol)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Roles $rol)
    {
        // 
    }
}
