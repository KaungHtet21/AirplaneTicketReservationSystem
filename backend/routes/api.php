<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FlightController;
use App\Http\Controllers\MailController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register',[UserController::class,'register']);
Route::post('getContact',[UserController::class,'getContact']);
Route::post('getPassengerInfo',[UserController::class,'getPassengerInfo']);
Route::post('getTransaction',[MailController::class,'getTransaction']);
Route::post('ticketSelect',[UserController::class,'ticketSelect']);
Route::post('getCode',[UserController::class,'getCode']);
Route::get('flight',[FlightController::class,'flight']);
Route::get('ticket',[FlightController::class,'ticket']);
Route::get('getMembership',[FlightController::class,'getMembership']);
Route::get('getVisas',[FlightController::class,'getVisas']);
Route::get('getMasters',[FlightController::class,'getMasters']);