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

Route::post('v1/login', ['App\Http\Controllers\api\v1\LoginController', 'login']);

Route::middleware(['auth:sanctum', 'verified'])->prefix('v1')->group(function () {

    // Carrusel
    Route::prefix('carrusel')->group( function () {
        Route::get('all', ['App\Http\Controllers\api\v1\CarruselController', 'all']);
        Route::post('delete', ['App\Http\Controllers\api\v1\CarruselController', 'destroy']);
    });
    Route::apiResource('carrusel', 'App\Http\Controllers\api\v1\CarruselController');

    // Estados
    Route::prefix('estados')->group( function () {
        Route::get('all', ['App\Http\Controllers\api\v1\EstadosController', 'all']);
    });
    Route::apiResource('estados', 'App\Http\Controllers\api\v1\EstadosController');

    // Roles
    Route::prefix('roles')->group( function () {
        Route::get('all', ['App\Http\Controllers\api\v1\RolesController', 'all']);
    });
    Route::apiResource('roles', 'App\Http\Controllers\api\v1\RolesController');
    
    // Usuarios
    Route::prefix('users')->group( function () {
        Route::get('all', ['App\Http\Controllers\api\v1\UserController', 'all']);
        Route::post('byRol', ['App\Http\Controllers\api\v1\UserController', 'byRol']);
        Route::post('update/{id}', ['App\Http\Controllers\api\v1\UserController', 'update']);
        Route::post('delete', ['App\Http\Controllers\api\v1\UserController', 'destroy']);
    });
    Route::apiResource('users', 'App\Http\Controllers\api\v1\UserController');

    // Categorias
    Route::prefix('categorias')->group( function () {
        Route::get('all', ['App\Http\Controllers\api\v1\CategoriasController', 'all']);
        Route::post('delete', ['App\Http\Controllers\api\v1\CategoriasController', 'destroy']);
    });
    Route::apiResource('categorias', 'App\Http\Controllers\api\v1\CategoriasController');
    
    // Locales
    Route::prefix('locales')->group( function () {
        Route::get('all', ['App\Http\Controllers\api\v1\LocalesController', 'all']);
        Route::get('qr/{id}', ['App\Http\Controllers\api\v1\LocalesController', 'QR']);
        Route::post('update/{id}', ['App\Http\Controllers\api\v1\LocalesController', 'update']);
        Route::post('delete', ['App\Http\Controllers\api\v1\LocalesController', 'destroy']);
    });
    Route::apiResource('locales', 'App\Http\Controllers\api\v1\LocalesController');

    // Visitas
    Route::prefix('visitas')->group( function () {
        Route::get('/{id}', ['App\Http\Controllers\api\v1\VisitasController', 'index']);
        Route::get('/show/{visita}', ['App\Http\Controllers\api\v1\VisitasController', 'show']);
        Route::get('para-hoy/{field}/{user}', ['App\Http\Controllers\api\v1\VisitasController', 'paraHoy']);
        Route::get('my-list/{field}/{user}', ['App\Http\Controllers\api\v1\VisitasController', 'myList']);
        Route::put('iniciar/{visita}', ['App\Http\Controllers\api\v1\VisitasController', 'iniciar']);
        Route::put('evaluar/{visita}', ['App\Http\Controllers\api\v1\VisitasController', 'evaluar']);
        Route::post('finalizar/{visita}', ['App\Http\Controllers\api\v1\VisitasController', 'finalizar']);
        Route::post('aprobar/{visita}', ['App\Http\Controllers\api\v1\VisitasController', 'aprobar']);
        Route::post('delete', ['App\Http\Controllers\api\v1\VisitasController', 'destroy']);
        Route::post('locales', ['App\Http\Controllers\api\v1\VisitasController', 'locales']);
    });
    Route::apiResource('visitas', 'App\Http\Controllers\api\v1\VisitasController');

});
