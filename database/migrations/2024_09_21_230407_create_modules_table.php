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
    Schema::create('modules', function (Blueprint $table) {
        $table->id();
        $table->foreignId('lesson_id')->constrained('lessons');
        $table->string('title');
        $table->enum('type', ['video', 'article', 'quiz', 'assignment']);
        $table->text('url')->nullable();
        $table->text('description')->nullable();
        $table->integer('order')->default(0);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modules');
    }
};
