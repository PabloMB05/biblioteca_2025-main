<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('loans', function (Blueprint $table) {
            $table->uuid('id')->primary();  // Se usa uuid y se establece como clave primaria
            $table->foreignUuid('user_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('book_id')->constrained()->onDelete('cascade');
            $table->date('due_date');
            $table->date('return_date')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_late')->default(false);
            $table->timestamps();
        });
        
    }
    public function down(): void
    {
        Schema::dropIfExists('loans');
    }
};
