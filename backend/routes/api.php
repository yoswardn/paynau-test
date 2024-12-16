<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PersonController;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Rutas no protegidas
Route::post('/login', [AuthController::class, 'login']);
Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

// Rutas protegidas
Route::middleware([
    'auth:sanctum', 
    EnsureFrontendRequestsAreStateful::class
])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/persons', [PersonController::class, 'index']);
    Route::post('/persons', [PersonController::class, 'store']);
    Route::get('/persons/{id}', [PersonController::class, 'show']);
    Route::put('/persons/{id}', [PersonController::class, 'update']);
    Route::delete('/persons/{id}', [PersonController::class, 'destroy']);
});


