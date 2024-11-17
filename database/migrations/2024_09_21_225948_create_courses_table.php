<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('courses', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->text('description');
        $table->boolean('is_free')->default(false);
        $table->decimal('price', 10, 2)->nullable();
        $table->timestamp('expires_at')->nullable();
        $table->binary('video_blob')->nullable();
        $table->timestamps(); // Esto ya incluye created_at y updated_at
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
