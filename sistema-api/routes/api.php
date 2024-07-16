<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\IngresoController;
use App\Http\Controllers\GeneroController;
use App\Http\Controllers\DificultadController;
use App\Http\Controllers\AfinacionController;
use App\Http\Controllers\CancionController;
use App\Http\Controllers\CapturaController;
use App\Http\Controllers\DatosController;
use App\Http\Controllers\CuentaController;
use App\Http\Controllers\ReporteController;

use App\Http\Middleware\ValidarIngreso;

Route::post('/ingreso', [IngresoController::class, 'ingreso'])->name('ingreso');
Route::post('/validar', [IngresoController::class, 'validar'])->name('validar');

Route::middleware([ValidarIngreso::class])->group(function () {
    
    Route::get('/generos', [GeneroController::class, 'listar'])->name('listarGeneros');
    Route::get('/dificultades', [DificultadController::class, 'listar'])->name('listarDificultades');
    Route::get('/afinaciones', [AfinacionController::class, 'listar'])->name('listarAfinaciones');

    Route::get('/datosCancion', [DatosController::class, 'listarDatosCancion'])->name('listarDatosCancion');
    Route::get('/datosCaptura/{id}', [DatosController::class, 'listarDatosCaptura'])->name('listarDatosCaptura');

    Route::post('/canciones/pagina/{pagina}', [CancionController::class, 'listar'])->name('listarCanciones');
    Route::get('/canciones/{id}', [CancionController::class, 'cargar'])->name('cargarCancion');
    Route::post('/canciones', [CancionController::class, 'crear'])->name('crearCancion');
    Route::put('/canciones/{id}', [CancionController::class, 'actualizar'])->name('actualizarCancion');
    Route::delete('/canciones/{id}', [CancionController::class, 'borrar'])->name('borrarCancion');

    Route::post('/capturas/pagina/{pagina}', [CapturaController::class, 'listar'])->name('listarCapturas');
    Route::get('/cancion/{id}/capturas', [CapturaController::class, 'listarCapturasCancion'])->name('listarCapturasCancion');
    Route::get('/capturas/{id}', [CapturaController::class, 'cargar'])->name('cargarCaptura');
    Route::post('/capturas', [CapturaController::class, 'crear'])->name('crearCaptura');
    Route::put('/capturas/{id}', [CapturaController::class, 'actualizar'])->name('actualizarCaptura');
    Route::delete('/capturas/{id}', [CapturaController::class, 'borrar'])->name('borrarCaptura');

    Route::put('/cancion/{id}/capturas/ordenar', [CapturaController::class, 'ordenarCapturasCancion'])->name('ordenarCapturasCancion');

    Route::post('/cuenta', [CuentaController::class, 'actualizarDatos'])->name('actualizarDatos');

    Route::get('/estadisticas', [ReporteController::class, 'generarDatos'])->name('generarDatos');

});
