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
            'start_time' => 'required',
            'end_time' => 'required',
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
    public function index($id, Request $request)
    {
        return \App\Models\Visitas::with('attender', 'creator', 'approver', 'local', 'estado', 'checklist')
                ->where('attended_by', $id)
                ->orderBy('fecha', 'desc')
                ->paginate( $request->rowsPerPage );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        \DB::beginTransaction();

        try {
            $this->validateRequest($request);

            if ( $request->tipo == 'date') {
                $visitaRepo = new \App\Repositories\VisitaRepository();
                $visita = $visitaRepo->store( $request );
            } else {
                $daysInMonth = \Carbon\Carbon::parse($request->fecha)->daysInMonth;
                
                for ($day = 1; $day <= $daysInMonth; $day++) {
                    $tmpFecha = $request->fecha;

                    $visitaRepo = new \App\Repositories\VisitaRepository();
                    $request->fecha = $tmpFecha . '-' . $day;
                    $visita = $visitaRepo->store( $request );

                    $request->fecha = $tmpFecha;
                }
            }
            
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
            $checklist = $item;
            $checklist->categoria = $item->categoria;
            $data->checklist[$key] = $checklist;
        }

        return $data;
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Visitas $visita)
    {
        $this->validateRequest($request);

        $visita->fecha          = $request->fecha;
        $visita->locales_id     = $request->local['id'];
        $visita->attended_by    = $request->limpiador['id'];
        $visita->start_time     = $request->start_time;
        $visita->end_time       = $request->end_time;
        $visita->estados_id     = $request->estados_id;
        $visita->save();

        \App\Models\Checklist::whereIn('id', $request->deletedServices)->delete();

        foreach( $request->checkList as $servicio ) {
            if ( !$servicio['id'] ) {
                $checklist = \App\Models\Checklist::create([
                    'categorias_id' => $servicio['categorias_id'],
                    'visitas_id' => $visita->id,
                    'created_at' => \Carbon\Carbon::now(),
                    'updated_at' => \Carbon\Carbon::now(),
                ]);
            } else {
                $checklist = \App\Models\Checklist::find($servicio['id'])
                ->update([
                    'categorias_id' => $servicio['categorias_id'],
                    'visitas_id' => $visita->id,
                    'created_at' => \Carbon\Carbon::now(),
                    'updated_at' => \Carbon\Carbon::now(),
                ]);
            }
        }

        return $visita;
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

    public function paraHoy($field, User $user)
    {
        return \App\Models\Visitas::with('attender', 'creator', 'approver', 'local', 'estado', 'checklist')
                ->where($field, $user->id)
                ->where('fecha', \Carbon\Carbon::now()->toDateString() )
                ->latest()
                ->get();
    }
}
