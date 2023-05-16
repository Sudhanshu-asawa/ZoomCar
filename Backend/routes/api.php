<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarDetailsControler;
use App\Http\Controllers\RentDetailsControler;
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

Route::post('/signup',[AuthController::class,'SignupPost']);
Route::post('/login',[AuthController::class,'LoginPost']);

Route::post('/carPost',[CarDetailsControler::class,'carPost']);
Route::get('/carData',[CarDetailsControler::class,'carView']);

Route::get('/carData/{id}',[CarDetailsControler::class,'carUpdateView']);
Route::post('/carUpdate/{id}',[CarDetailsControler::class,'carUpdate']);

Route::delete('/carDelete/{id}',[CarDetailsControler::class,'carDelete']);
Route::delete('/carRentDelete/{id}',[RentDetailsControler::class,'carRentDelete']);

Route::post('/rentDetails',[RentDetailsControler::class,'rentData']);
Route::get('/rentData',[RentDetailsControler::class,'carView']);
Route::get('/rentDataO',[RentDetailsControler::class,'carViewO']);
Route::get('/rentCar',[RentDetailsControler::class,'rentedCar']);
Route::get('/userRentCar/{id}',[RentDetailsControler::class,'userRentedCar']);
