<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LocalesUsers extends Model
{
    use HasFactory;
    // use SoftDeletes, HasFactory;

    protected $table = 'locales_users';
    protected $fillable = [
        'locales_id',
        'user_id',
    ];
    
    public function usuario() {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function local() {
        return $this->hasOne(Local::class, 'id', 'locales_id');
    }
}
