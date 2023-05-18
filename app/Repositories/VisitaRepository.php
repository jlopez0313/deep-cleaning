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
            'start_date' => \Carbon\Carbon::parse($data->fecha . ' ' . $data->start_time . ':00'),
            'end_date' => \Carbon\Carbon::parse($data->fecha . ' ' . $data->end_time . ':00'),
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
