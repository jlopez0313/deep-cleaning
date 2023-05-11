<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Local extends Model
{
    use SoftDeletes, HasFactory;

    protected $table = 'locales';
    protected $fillable = [
        'created_by',
        'local',
        'direccion',
        'latitud',
        'longitud',
        'foto',
    ];
    
    public function usuarios() {
        return $this->hasMany(LocalesUsers::class, 'locales_id');
    }

    public function creador() {
        return $this->hasOne(User::class, 'id', 'created_by');
    }

    public function visitas() {
        return $this->hasMany(Visitas::class, 'locales_id');
    }
}
