<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/

Route::post('v1/login', ['App\Http\Controllers\Api\V1\LoginController', 'login']);

Route::middleware(['auth:sanctum', 'verified'])->prefix('v1')->group(function () {

    // Roles
    Route::prefix('roles')->group( function () {
        Route::get('all', ['App\Http\Controllers\api\v1\RolesController', 'all']);
    });
    Route::apiResource('roles', 'App\Http\Controllers\api\v1\RolesController');
    
    // Usuarios
    Route::prefix('users')->group( function () {
        Route::get('byRol/{rol}', ['App\Http\Controllers\api\v1\UserController', 'byRol']);
    });
    Route::apiResource('users', 'App\Http\Controllers\api\v1\UserController');

    // Categorias
    Route::prefix('categorias')->group( function () {
        Route::get('all', ['App\Http\Controllers\api\v1\CategoriasController', 'all']);
    });
    Route::apiResource('categorias', 'App\Http\Controllers\api\v1\CategoriasController');
    
    // Locales
    Route::prefix('locales')->group( function () {
        Route::get('all', ['App\Http\Controllers\api\v1\LocalesController', 'all']);
        Route::post('{id}', ['App\Http\Controllers\Api\V1\LocalesController', 'update']);
    });
    Route::apiResource('locales', 'App\Http\Controllers\api\v1\LocalesController');

    // Visitas
    Route::prefix('visitas')->group( function () {
        Route::get('my-list/{field}/{user}', ['App\Http\Controllers\api\v1\VisitasController', 'myList']);
        Route::put('iniciar/{visita}', ['App\Http\Controllers\api\v1\VisitasController', 'iniciar']);
        Route::put('finalizar/{visita}', ['App\Http\Controllers\api\v1\VisitasController', 'finalizar']);
        Route::put('evaluar/{visita}', ['App\Http\Controllers\api\v1\VisitasController', 'evaluar']);
    });
    Route::apiResource('visitas', 'App\Http\Controllers\api\v1\VisitasController');

});
