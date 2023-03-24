<?php

namespace App\Http\Controllers;

use App\Models\contact;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ticket;
use App\Models\flight;
use App\Models\passenger;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    //
    function register(Request $req) {
        $user = new User;
        $user->name = $req->input('name');
        $user->surname = $req->input('surname');
        $user->title = $req->input('title');
        $user->email = $req->input('email');
        $user->password = Hash::make($req->input('password'));
        $user->save();
        return User::get();
        return $user;
    }

    function getContact(Request $req) {
      $contact = new contact();
      $contact->email = $req->input('email');
      $contact->first_name = $req->input('contactFirstName');
      $contact->last_name = $req->input('contactLastName');
      $contact->save();
      return contact::get();
      return $contact;
    }

    function getPassengerInfo(Request $req) {
      $passenger = new passenger();
      $passenger->title = $req->input('pTitle');
      $passenger->first_name = $req->input('pFirstName');
      $passenger->last_name = $req->input('pLastName');
      $passenger->gender = $req->input('gender');
      $passenger->dob = $req->input('formated_dob');
      $passenger->doc_type = $req->input('documentType');
      $passenger->nrc_passport = $req->input('nationalIDNumber');
      $passenger->contact_id = $req->input('contactId');
      $passenger->ticket_id = $req->input('ticket_id');
      $passenger->way = $req->input('way');
      $passenger->save();
      return passenger::get();
      return $passenger;
    }


    // function register2(Request $req) {
    //     $users = $req->input('users');

    //     for ($i=0; $i < ; $i++) { 
    //         # code...
    //         $user = new User;
    //     $user->name = $req->input('name');
    //     $user->surname = $req->input('surname');
    //     $user->title = $req->input('title');
    
    //     $user->email = $req->input('email');
    //     $user->password = Hash::make($req->input('password'));
    //     $user->save();
    //     }

        
    //     return User::get();
    //     return $user;
    // }
     public function ticketSelect(Request $request)
     {
        $total = $request-> totalPassengers;
        $class = $request->eco_or_business;
        $id = $request->flightID;
        
         $available = ticket::where(['flight_id'=>$id,'class'=>'economy','available'=>'1'])->count();
          if($class == 'business'){
            $ticket=  ticket::where(['flight_id'=>$id,'class'=>'business','available'=>'1'])->take($total)->get();
            
            ticket::where(['flight_id'=>$id,'class'=>'business','available'=>'1'])->take($total)->update([
                'available' => '0'
            ]);
                
          }else{
             $ticket = ticket::where(['flight_id'=>$id,'class'=>'economy','available'=>'1'])->take($total)->get();
           
            ticket::where(['flight_id'=>$id,'class'=>'economy','available'=>'1'])->take($total)->update([
                'available' => '0'
            ]);
        
          }
     }

     public function getCode(Request $req) {
      // return $req->all();
       // $code = $req->code;
        $data = [
          'code' => $req->test,
        ];
        $email = $req->email;
        Mail::send('mail.emailCode',$data,function($message) use ($email){
          $message->to($email)->subject('Email Code ');
      });
     }
}
