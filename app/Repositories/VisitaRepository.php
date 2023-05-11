<?php

namespace App\Repositories;

class VisitaRepository
{
    public function __construct()
    {
        //
    }

    public function store( $data ) {
        $visita = \App\Models\Visitas::create([
            'locales_id' => $data->local['id'],
            'created_by' => \Auth::id(),
            'attended_by' => $data->limpiador['id'],
            'fecha' => $data->fecha,
            'start_time' => $data->start_time,
            'end_time' => $data->end_time,
            'latitud' => $data->latitud,
            'longitud' => $data->longitud,
            'estados_id' => 1,
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now(),
        ]);


        foreach( $data->checkList as $categoria ) {
            
            $checklist = \App\Models\Checklist::create([
                'categorias_id' => $categoria['id'],
                'visitas_id' => $visita->id,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ]);
        }

        return $visita;
    }
}
