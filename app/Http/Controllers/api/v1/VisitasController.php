<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Visitas;
use App\Models\User;
use Illuminate\Http\Request;

class VisitasController extends Controller
{
    public function validateRequest(Request $request)
    {
        return $request->validate([
            'local' => 'required',
            'limpiador' => 'required',
            'fecha' => 'required',
        ]);
    }

    public function validateFinalizar(Request $request)
    {
        return $request->validate([
            'estados_id' => 'required',
        ]);
    }

    public function validateEvaluar(Request $request)
    {
        return $request->validate([
            'approved_by' => 'required',
            'estados_id' => 'required',
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return \App\Models\Visitas::with('attender', 'creator', 'approver', 'local', 'estado', 'checklist')
                ->latest()
                ->paginate( $request->rowsPerPage );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $this->validateRequest($request);

            \DB::beginTransaction();

            $visita = \App\Models\Visitas::create([
                'locales_id' => $request->local['id'],
                'created_by' => \Auth::id(),
                'attended_by' => $request->limpiador['id'],
                'fecha' => $request->fecha,
                'latitud' => $request->latitud,
                'longitud' => $request->longitud,
                'estados_id' => 1,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ]);

            $list = [];
            foreach( $request->checkList as $categoria ) {
                $list[] = [
                    'categorias_id' => $categoria->id,
                    'visitas_id' => $visita->id,
                ];
            }

            count( $list ) > 0 && \App\Models\Checklist::create( $list );
            \DB::commit();

            return $visita;
        } catch (Exception $ex) {
            \DB::rollback();
            return $ex;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Visitas $visita)
    {
        $data = $visita;
        $data->attender = $visita->attender;
        $data->creator = $visita->creator;
        $data->approver = $visita->creator;
        $data->local = $visita->local;
        $data->estado = $visita->estado;

        foreach($visita->checklist as $key => $item) {
            $data->checklist[$key] = $item->categoria;
        }

        return $data;
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Visitas $visita)
    {
        $this->validateRequest($request);

        $visita->locales_id     = $request->local['id'];
        $visita->attended_by    = $request->$request->limpiador['id'];
        $visita->fecha          = $request->fecha;
        $visita->latitud        = $request->latitud;
        $visita->longitud       = $request->longitud;
        $visita->save();

        $list = [];
        foreach( $request->checkList as $checklist ) {
            $list[] = [
                'id' => $checklist->id,
                'categorias_id' => $checklist->categorias_id,
                'visitas_id' => $visita->id,
            ];
        }

        count( $list ) > 0 && \App\Models\Checklist::create( $list );

        $data = $visita;
        $data->attender = $visita->attender;
        $data->creator = $visita->creator;
        $data->approver = $visita->creator;
        $data->local = $visita->local;
        $data->estado = $visita->estado;
        $data->checklist = $visita->checklist;

        return $data;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Visitas $visita)
    {
        $visita->delete();
        return $visita;
    }
    

    public function iniciar(Request $request, Visitas $visita)
    {

        $visita->latitud    = $request->latitud;
        $visita->longitud   = $request->longitud;
        $visita->started_at = \Carbon\Carbon::now();
        $visita->save();

        $data = $visita;
        $data->attender = $visita->attender;
        $data->creator = $visita->creator;
        $data->approver = $visita->creator;
        $data->local = $visita->local;
        $data->estado = $visita->estado;
        $data->checklist = $visita->checklist;

        return $data;
    }

    public function finalizar(Request $request, Visitas $visita)
    {
        $this->validateFinalizar($request);

        $visita->estados_id = $request->estados_id;
        $visita->finished_at = \Carbon\Carbon::now();
        $visita->save();

        $list = [];
        foreach( $request->checklist as $checklist ) {
            $list[] = [
                'id' => $checklist->id,
                'done' => $checklist->done,
                'evidencia' => $checklist->evidencia,
            ];
        }

        \App\Models\Checklist::create( $list );

        $data = $visita;
        $data->attender = $visita->attender;
        $data->creator = $visita->creator;
        $data->approver = $visita->creator;
        $data->local = $visita->local;
        $data->estado = $visita->estado;
        $data->checklist = $visita->checklist;

        return $data;
    }

    public function evaluar( Request $request, Visitas $visita)
    {
        $this->validateEvaluar($request);

        $visita->approved_by    = $request->approved_by;
        $visita->estados_id     = $request->estados_id;
        $visita->observaciones  = $request->observaciones;
        $visita->save();

        $data = $visita;
        $data->attender = $visita->attender;
        $data->creator = $visita->creator;
        $data->approver = $visita->creator;
        $data->local = $visita->local;
        $data->estado = $visita->estado;
        $data->checklist = $visita->checklist;

        return $data;
    }

    public function myList($field, User $user)
    {
        return \App\Models\Visitas::with('attender', 'creator', 'approver', 'local', 'estado', 'checklist')
                ->where($field, $user->id)
                ->latest()
                ->get();
    }
}
