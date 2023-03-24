<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('passengers', function (Blueprint $table) {
            $table->id('passenger_id');
            $table->string('title');
            $table->string('first_name');
              $table->string('last_name');
              $table->string('gender');
              $table->date('dob');
             $table->string('doc_type');
             $table->string('nrc_passport');
              $table->integer('contact_id');
              $table->integer('ticket_id');
              $table->string('way');
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
        Schema::dropIfExists('passengers');
    }
};
