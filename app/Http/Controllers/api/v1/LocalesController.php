<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Local;

class LocalesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return \App\Models\Local::with('creador', 'managers', 'visitas')
                ->latest()
                ->paginate( $request->rowsPerPage );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $local = \App\Models\Local::create([
            'created_by' => \Auth::id(),
            'local' => $request->local,
            'direccion' => $request->direccion,
            'latitud' => $request->latitud,
            'longitud' => $request->longitud,
            'foto' => $request->foto,
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now(),
        ]);

        return $local;
    }

    /**
     * Display the specified resource.
     */
    public function show(Local $locale)
    {
        $data = $locale;
        $data->managers = $locale->managers;
        $data->visitas = $locale->visitas;

        return $data;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Local $locale)
    {
        $locale->created_by  = \Auth::id();
        $locale->local       = $request->local;
        $locale->direccion   = $request->direccion;
        $locale->latitud     = $request->latitud;
        $locale->longitud    = $request->longitud;
        $locale->foto        = $request->foto;
        $locale->save();

        $data = $locale;
        $data->managers = $locale->managers;
        $data->visitas = $locale->visitas;

        return $data;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Local $locale)
    {
        $locale->delete();
        return $locale;
    }

    public function all()
    {
        return \App\Models\Local::latest()->get();
    }
}
