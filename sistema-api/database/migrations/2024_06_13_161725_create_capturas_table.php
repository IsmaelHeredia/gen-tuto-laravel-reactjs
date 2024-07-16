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
        Schema::create('capturas', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('id_cancion');
            $table->text('nombre');
            $table->string('imagen');
            $table->integer('orden');
            $table->timestamps();

            $table->foreign('id_cancion')->references('id')->on('canciones')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('capturas', function (Blueprint $table) {
            $table->dropForeign(['id_cancion']);
        });

        Schema::dropIfExists('capturas');
    }
};
