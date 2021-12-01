<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EducationsController;
use App\Http\Controllers\Api\StudentsController;
use App\Http\Controllers\Api\GradesController;
use App\Http\Controllers\Api\CoursesController;
use App\Http\Controllers\Api\CustomerController;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::resource('users',AuthController::class);
Route::resource('educations',EducationsController::class);
Route::resource('students',StudentsController::class);
Route::resource('grades',GradesController::class);
Route::resource('courses',CoursesController::class);
Route::resource('customers',CustomerController::class);
Route::post('users/login', [AuthController::class, 'loginuser']);