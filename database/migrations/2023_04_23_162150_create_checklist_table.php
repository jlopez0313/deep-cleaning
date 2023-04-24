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
        Schema::create('checklist', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('categorias_id')->required();
            $table->foreign('categorias_id')->references('id')->on('categorias')->onDelete('cascade');
            $table->unsignedBigInteger('visitas_id')->required();
            $table->foreign('visitas_id')->references('id')->on('visitas')->onDelete('cascade');
            $table->char('done', 1)->nullable();
            $table->string('evidencia')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('checklist');
    }
};
