<?php

use App\Http\Controllers\API\PersonController;
use Illuminate\Support\Facades\Route;

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


Route::get('/persons', [PersonController::class, 'index']);
Route::post('/persons', [PersonController::class, 'store']);
Route::get('/persons/{id}', [PersonController::class, 'show']);
Route::put('/persons/{id}', [PersonController::class, 'update']);
Route::delete('/persons/{id}', [PersonController::class, 'destroy']);