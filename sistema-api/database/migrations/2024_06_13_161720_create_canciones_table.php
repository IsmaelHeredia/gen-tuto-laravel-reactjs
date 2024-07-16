<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('canciones', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre');
            $table->string('autor');
            $table->unsignedInteger('id_genero');
            $table->unsignedInteger('id_dificultad');
            $table->unsignedInteger('id_afinacion');
            $table->string('url_youtube');
            $table->text('detalles');
            $table->timestamps();

            $table->foreign('id_genero')->references('id')->on('generos')->onDelete('cascade');
            $table->foreign('id_dificultad')->references('id')->on('dificultades')->onDelete('cascade');
            $table->foreign('id_afinacion')->references('id')->on('afinaciones')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('canciones', function (Blueprint $table) {
            $table->dropForeign(['id_genero', 'id_dificultad', 'id_afinacion']);
        });

        Schema::dropIfExists('canciones');
    }
};
