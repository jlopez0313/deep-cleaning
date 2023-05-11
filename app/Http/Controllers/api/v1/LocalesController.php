<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\LocalesRequest;
use App\Http\Resources\LocalResource;
use Illuminate\Http\Request;
use App\Models\Local;

class LocalesController extends Controller
{
    public function validateRequest(Request $request)
    {
        return $request->validate([
            'local' => 'required',
            'direccion' => 'required',
            'latitud' => 'required',
            'longitud' => 'required',
            'foto' => 'required',
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return \App\Models\Local::with('creador', 'usuarios.usuario.rol', 'visitas')
                ->latest()
                ->paginate( $request->rowsPerPage );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LocalesRequest $request)
    {
        \DB::beginTransaction();

        try{

            $path = '';
            if ( $request->foto ) {
                $file = $request->foto;
                $path = $file->store('locales');
            }
    
            $local = \App\Models\Local::create([
                'created_by' => \Auth::id(),
                'local' => $request->local,
                'direccion' => $request->direccion,
                'latitud' => $request->latitud,
                'longitud' => $request->longitud,
                'foto' => $path,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ]);

        // Asignando Usuarios al Local
            $request->usuarios = json_decode($request->usuarios);
            foreach( $request->usuarios as $user ) {
                \App\Models\LocalesUsers::create([
                    'locales_id' => $local->id,
                    'user_id' => $user->id
                ]);
            }
            
            \DB::commit();

            return $local;
        } catch (Exception $ex) {
            \DB::rollback();
            return $ex;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show( $id )
    {
        $locale = \App\Models\Local::with('usuarios.usuario.rol')->findOrFail( $id );
        return $locale;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LocalesRequest $request, Local $locale)
    {
        \DB::beginTransaction();

        try {
            $locale->created_by  = \Auth::id();
            $locale->local       = $request->local;
            $locale->direccion   = $request->direccion;
            $locale->latitud     = $request->latitud;
            $locale->longitud    = $request->longitud;
            
            if ( $request->foto ) {
                $file = $request->foto;
                $path = $file->store('locales');
                $locale->foto = $path;
    
                \Storage::delete($request->oldPhoto);
            }
    
            $locale->save();
    
        // Asignando Usuarios al Local
            $request->usuarios = json_decode($request->usuarios);
            
            $usuarios = array_map( 
                function ( $user ){ 
                    return $user->id;
                },
                $request->usuarios
            );


            \App\Models\LocalesUsers::whereIn('user_id', $usuarios)
                ->where('locales_id', $locale->id)
                ->delete();

            foreach( $request->usuarios as $user ) {
                \App\Models\LocalesUsers::create([
                    'locales_id' => $locale->id,
                    'user_id' => $user->id
                ]);
            }

            \DB::commit();

            $locale;
            return $locale;

        } catch (Exception $ex) {
            \DB::rollback();
            return $ex;
        }
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
