<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string("name",200);
            $table->string("student_id",200); 
            $table->string("nid",200); 
            $table->string("reg_no",200);
            $table->string("d_birth",200);
            $table->string("phone",100);
            $table->string("gender",10);
            $table->string("blood",10);
            $table->string("email",200);
            $table->string("password",200);
            $table->string("address",200);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
}
