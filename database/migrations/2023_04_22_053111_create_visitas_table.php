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
        Schema::create('visitas', function (Blueprint $table) {
            $table->id();
            
            $table->unsignedBigInteger('locales_id')->required();
            $table->foreign('locales_id')->references('id')->on('locales')->onDelete('cascade');
            
            $table->unsignedBigInteger('created_by')->required();
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedBigInteger('attended_by')->required();
            $table->foreign('attended_by')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedBigInteger('approved_by')->nullable();
            $table->foreign('approved_by')->references('id')->on('users')->onDelete('cascade');

            $table->timestamp('start_date')->required();
            $table->timestamp('end_date')->required();
            $table->string('latitud')->nullable();
            $table->string('longitud')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('finished_at')->nullable();
            $table->text('observaciones')->nullable();
            $table->string('firma')->nullable();

            $table->unsignedBigInteger('estados_id')->required();
            $table->foreign('estados_id')->references('id')->on('estados')->onDelete('cascade');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visitas');
    }
};
