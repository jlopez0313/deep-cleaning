<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Roles;

class EstadosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return \App\Models\Estados::latest()->paginate( $request->rowsPerPage );
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

    public function all()
    {
        return \App\Models\Estados::orderBy('estado')->get();
    }
}
