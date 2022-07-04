<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
    {
        Schema::create('departments_tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('department_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('task_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->text('note');
            $table->enum('status', ['opened', 'done','waiting','need-help']);
            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('departments_tasks');
    }
};