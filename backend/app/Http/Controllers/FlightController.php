<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\flight;
use App\Models\master;
use App\Models\member;
use App\Models\ticket;
use App\Models\visa;

class FlightController extends Controller
{
    public function flight(){
        return flight::get();
    
    }
    public function ticket(){
        return ticket::get();
    }

    public function getMembership() {
        return member::get();
    }

    public function getVisas() {
        return visa::get();
    }

    public function getMasters() {
        return master::get();
    }
}
