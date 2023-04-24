<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Visitas extends Model
{
    use SoftDeletes, HasFactory;
    protected $table = 'visitas';

    protected $fillable = [
        'locales_id',
        'created_by',
        'attended_by',
        'approved_by',
        'fecha',
        'latitud',
        'longitud',
        'estados_id',
    ];

    public function attender() {
        return $this->hasOne(User::class, 'id', 'attended_by');
    }

    public function creator() {
        return $this->hasOne(User::class, 'id', 'created_by');
    }

    public function approver() {
        return $this->hasOne(User::class, 'id', 'approved_by');
    }

    public function local() {
        return $this->hasOne(Local::class, 'id', 'locales_id');
    }
    
    public function estado() {
        return $this->hasOne(Estados::class, 'id', 'estados_id');
    }

    public function checklist() {
        return $this->hasMany(Checklist::class, 'visitas_id');
    }

}
