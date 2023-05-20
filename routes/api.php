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
        Route::post('{id}', ['App\Http\Controllers\api\v1\UserController', 'update']);
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
        Route::post('{id}', ['App\Http\Controllers\api\v1\LocalesController', 'update']);
        Route::get('qr/{id}', ['App\Http\Controllers\api\v1\LocalesController', 'QR']);
    });
    Route::apiResource('locales', 'App\Http\Controllers\api\v1\LocalesController');

    // Visitas
    Route::prefix('visitas')->group( function () {
        Route::get('/{id}', ['App\Http\Controllers\api\v1\VisitasController', 'index']);
        Route::get('/show/{visita}', ['App\Http\Controllers\api\v1\VisitasController', 'show']);
        Route::get('para-hoy/{field}/{user}', ['App\Http\Controllers\api\v1\VisitasController', 'paraHoy']);
        Route::get('my-list/{field}/{user}', ['App\Http\Controllers\api\v1\VisitasController', 'myList']);
        Route::put('iniciar/{visita}', ['App\Http\Controllers\api\v1\VisitasController', 'iniciar']);
        Route::post('finalizar/{visita}', ['App\Http\Controllers\api\v1\VisitasController', 'finalizar']);
        Route::put('evaluar/{visita}', ['App\Http\Controllers\api\v1\VisitasController', 'evaluar']);
    });
    Route::apiResource('visitas', 'App\Http\Controllers\api\v1\VisitasController');

});
