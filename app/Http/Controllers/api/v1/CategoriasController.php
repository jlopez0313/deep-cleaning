<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return \App\Models\Categoria::latest()->paginate( config('general.paginate') );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $categoria = \App\Models\Categoria::create([
            'categoria' => $request->categoria,
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now(),
        ]);

        return $categoria;
    }

    /**
     * Display the specified resource.
     */
    public function show(Categoria $categoria)
    {
        return $categoria;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Categoria $categoria)
    {
        $categoria->categoria = $request->categoria;
        $categoria->save();

        return $categoria;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categoria $categoria)
    {
        $categoria->delete();
        return $categoria;
    }
}
