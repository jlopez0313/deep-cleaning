<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use \App\Models\Carrusel;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\CarruselRequest;
use Illuminate\Validation\Rule;

class CarruselController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return \App\Models\Carrusel::orderBy( 
                    is_null($request->sortBy) || $request->sortBy == 'null' ? 'created_at' : $request->sortBy, 
                    is_null($request->sortType) || $request->sortType == 'null' ? 'desc' : $request->sortType
                )
                ->paginate( $request->rowsPerPage );
    }

    /**
     * Store a newly created resource in storage. Request is set by FORM ENCODE
     */
    public function store(CarruselRequest $request)
    {
        $carrusel = new \App\Models\Carrusel();
        if ( $request->archivo ) {
            $file = $request->archivo;
            $carrusel->archivo = $file->store('carrusel');
        }

        $carrusel->save();

        return $carrusel;
    }

    /**
     * Display the specified resource.
     */
    public function show(Carrusel $carrusel)
    {
        $data = $carrusel;
        $data->rol = $carrusel->rol;
        return $data;
    }

    /**
     * Update the specified resource in storage. Request is sent by FORM ENCODE
     */
    public function update(CarruselRequest $request, Carrusel $carrusel)
    {
        if ( $request->archivo ) {
            $file = $request->archivo;
            $carrusel->archivo = $file->store('carrusel');

            if ( $request->oldPhoto ) {
                \Storage::delete($request->oldPhoto);
            }
        }

        $carrusel->save();

        return $carrusel;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $carrusels = \App\Models\Carrusel::whereIn('id', $request->ids)->delete();
        return $carrusels;
    }

    public function all()
    {
        return \App\Models\Carrusel::latest()->get();
    }
}
