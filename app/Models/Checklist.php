<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Checklist extends Model
{
    use SoftDeletes, HasFactory;

    protected $table = 'checklist';
    protected $fillable = [
        'categorias_id',
        'visitas_id',
        'evidencia',
        'done'
    ];

    public function categoria() {
        return $this->hasOne(Categoria::class, 'id', 'categorias_id');
    }

    public function visita() {
        return $this->hasOne(Visitas::class, 'id', 'visitas_id');
    }
}
