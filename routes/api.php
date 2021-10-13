<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UsersController;
use App\Http\Controllers\IssuesController;

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

Route::middleware(["auth:sanctum","isAdmin"])->get('/users', [UsersController::class, 'index']);
Route::middleware("auth:sanctum")->get('/user', [UsersController::class, 'show']);

Route::middleware("auth:sanctum")->get('/issues', [IssuesController::class, 'index']);
Route::middleware("auth:sanctum")->post('/issues', [IssuesController::class, 'store']);
Route::middleware(["auth:sanctum","isAdmin"])->delete('/issues/{issue}', [IssuesController::class, 'destroy']);
Route::middleware(["auth:sanctum","isAdmin"])->put('/issues/{issue}', [IssuesController::class, 'update']);
Route::middleware("auth:sanctum")->post('/issues/{issue}/close', [IssuesController::class, 'close']);