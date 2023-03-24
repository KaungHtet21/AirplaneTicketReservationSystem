<?php

use App\Http\Controllers\MailController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/mail',[MailController::class,'sendEticket'])->name('sendEticket');
Route::get('/counter',[MailController::class,'overTheCounter'])->name('overthecounter');
Route::get('/member',[MailController::class,'member'])->name('member');
Route::get('/code',[UserController::class,'getCode']);
Route::get('/transaction',[MailController::class,'gettransaction']);