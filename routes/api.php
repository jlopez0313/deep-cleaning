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

Route::post('v1/login', [App\Http\Controllers\Api\V1\LoginController::class, 'login']);

Route::middleware(['auth:sanctum', 'verified'])->prefix('v1')->group(function () {

    // Roles
    Route::apiResource('roles', 'App\Http\Controllers\api\v1\RolesController');
    
    // Usuarios
    Route::apiResource('users', 'App\Http\Controllers\api\v1\UserController');

    // Categorias
    Route::apiResource('categorias', 'App\Http\Controllers\api\v1\CategoriasController');

});
