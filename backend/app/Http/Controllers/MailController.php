<?php

namespace App\Http\Controllers;

use App\Mail\eticket;
use App\Mail\eticketMail;
use App\Mail\membershipMail;
use App\Models\contact;
use App\Models\flight;
use App\Models\master;
use App\Models\member;
use App\Models\passenger;
use App\Models\ticket;
use App\Models\transaction;
use App\Models\visa;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use PHPUnit\Util\Json;

class MailController extends Controller
{
    // public function sendEticket()
    // { 
       
    //   $transaction = transaction::orderby('transcation_id','DESC')->first();
    //     $contact = contact::where('contact_id',$transaction->customer_id)->first();
    //     $email = $contact->email;
    //     $data = [
    //         'customer' => $contact,
    //         'transaction' => $transaction,
    //     ];
    //     Mail::send('mail.eticketMail',$data,function($message){
    //         $message->to($email)
    //                 ->subject('E ticket Receipt');
    //     });
    // return 'sent';
    //    // return $this->member();
    // }
    
   function sendEticket(){
    
    $transaction = transaction::orderby('transcation_id','DESC')->first();
    $contact = contact::where('contact_id',$transaction->customer_id)->first();

    $passengers = passenger::where('contact_id',$contact->contact_id)->get();
     //  return $passengers;
      $depart_tickets= [];
        $return_tickets=[];
    
    
        foreach($passengers as $passenger){
            
            if($passenger->way == 'depart'){
              
               $ticket =  ticket::where('ticket_id',$passenger->ticket_id)->first();
               $depart_flight = flight::where('fligh_id',$ticket->flight_id)->first();
               //return $depart_flight;
               array_push($depart_tickets,$ticket);
          
            }
            else{
                
                $ticket =  ticket::where('ticket_id',$passenger->ticket_id)->first();
               // return $ticket;
                $return_flight = flight::where('fligh_id',$ticket->flight_id)->first();
                array_push($return_tickets,$ticket);
                
            }
        }
        // return passenger::where('contact_id',$contact->contact_id)->
        // where('way','depart')->get();
    $depart_class = $depart_tickets[0]->class;
    if($return_tickets != []){
        $return_class = $return_tickets[0]->class;
        $data = [
            'customer' => $contact,
            'transaction' => $transaction,
            'depart_flight' => $depart_flight,
            'return_flight' => $return_flight,
            'depart_tickets' => $depart_tickets,
            'return_tickets' => $return_tickets,
            'depart_class' => $depart_class,
            'return_class' => $return_class,
            'passengers' => passenger::where('contact_id',$contact->contact_id)->where('way','depart')->get(),
          ];
    }else{
    $data = [
        'customer' => $contact,
        'transaction' => $transaction,
        'depart_flight' => $depart_flight,
        'depart_tickets' => $depart_tickets,
        'return_tickets' => $return_tickets,
        'depart_class' => $depart_class,
        'passengers' => passenger::where('contact_id',$contact->contact_id)->where('way','depart')->get(),
      ];
    } 
    // return $data;
  // return view('mail.eticket_new',$data);
     $email = $contact->email;
   //  return $email;
     Mail::send('mail.eticket_new',$data,function($message) use($email){
        $message->to($email)
                ->subject('E ticket Receipt');
    });

  return $this->member();
   }

   function overTheCounter($branch){
        
         $transaction = transaction::orderby('transcation_id','DESC')->first();
         $contact = contact::where('contact_id',$transaction->customer_id)->first();
     
         $passengers = passenger::where('contact_id',$contact->contact_id)->get();
       //  return $passengers;
        //PASSENGER ->WAY == DEPART 
           $depart_tickets= [];
             $return_tickets=[];
         
         
             foreach($passengers as $passenger){
                 
                 if($passenger->way == 'depart'){
                   
                    $ticket =  ticket::where('ticket_id',$passenger->ticket_id)->first();
                    $depart_flight = flight::where('fligh_id',$ticket->flight_id)->first();
                    //return $depart_flight;
                    array_push($depart_tickets,$ticket);
               
                 }
                 else{
                     
                     $ticket =  ticket::where('ticket_id',$passenger->ticket_id)->first();
                    // return $ticket;
                     $return_flight = flight::where('fligh_id',$ticket->flight_id)->first();
                     array_push($return_tickets,$ticket);
                     
                 }
             }
        
         $depart_class = $depart_tickets[0]->class;
    
         
         if($return_tickets != []){
            $return_class = $return_tickets[0]->class;
             $data = [
                 'customer' => $contact,
                 'transaction' => $transaction,
                 'depart_flight' => $depart_flight,
                 'return_flight' => $return_flight,
                 'depart_tickets' => $depart_tickets,
                 'return_tickets' => $return_tickets,
                 'depart_class' => $depart_class,
                 'return_class' => $return_class,
                 'passengers' => passenger::where('contact_id',$contact->contact_id)->where('way','depart')->get(),
                 'branch' => $branch,
               ];
         }else{
         $data = [
             'customer' => $contact,
             'transaction' => $transaction,
             'depart_flight' => $depart_flight,
             'depart_tickets' => $depart_tickets,
             'return_tickets' => $return_tickets,
             'depart_class' => $depart_class,
             'passengers' => passenger::where('contact_id',$contact->contact_id)->where('way','depart')->get(),
             'branch' => $branch,
           ];
         } 
        // return view('mail.overTheCounter',$data);
          $email = $contact->email;
        //  return $email;
          Mail::send('mail.overTheCounter',$data,function($message) use($email){
             $message->to($email)
                     ->subject('Ticket Reservation');
         });
         return $this->member();
       
        }
   
    function getTransaction(Request $req)
    {
      
        $transaction = new transaction();
        $transaction->customer_id = $req->input('customer_id');
        $transaction->ticket_number = $req->input('ticket_number');
        $transaction->total_amount = $req->input('total_amount');
        $transaction->payment_method = $req->input('payment_method');
        $transaction->card_number = $req->input('card_number');
        $transaction->transcation_status = $req->input('transcation_status');
        $transaction->save();
        $branch = $req->input('headoffice');
        $transcation = transaction::orderby('transcation_id', 'DESC')->first();
        $card_number = $transcation->card_number;
       
        if ($transcation->payment_method == 'visa') {
            error_log('Test');
            $card = visa::where('card_number', $card_number)->first();
            visa::where('card_number', $card_number)->update([
                'balance' => $card->balance - $transcation->total_amount
            ]);
            return $this->sendEticket();
        } elseif($transcation->payment_method == 'master') {
            $card =  master::where('card_number', $card_number)->first();
            master::where('card_number', $card_number)->update([
                'balance' => $card->balance - $transcation->total_amount
            ]);
            return $this->sendEticket();
        }
        elseif($transcation->payment_method == 'over_the_counter') {
        
        return $this->overTheCounter($branch);
        
        }
        
       
      
    }

    public function member(){
       
        $results = passenger::select(DB::raw('count(*) as count,nrc_passport'))
                            ->groupBy('nrc_passport')
                            ->get();
     // return $results;
        foreach($results as $result){
            
            $passenger = passenger::where('nrc_passport',$result->nrc_passport)->first();
           
            if(member::where('passenger_nrc',$passenger->nrc_passport)->exists()){
                //echo ('member');
                $passenger = passenger::where('nrc_passport',$result->nrc_passport)->first();
                $contact = contact::where('contact_id',$passenger->contact_id)->first();
                $oldMemberType =  member::where('passenger_nrc',$passenger->nrc_passport)->first()->member_type;
                $email = $contact->email;
                if($oldMemberType != 'gold'){
                    if($result->count >=5 && $result->count<8){
                     
                        $member =  member::where('passenger_nrc',$passenger->nrc_passport)->update([
                            'card_number' => rand(10000,99999),
                            'passenger_nrc' => $passenger->nrc_passport,
                            'member_type' => 'gold',
                        ]);
                        $member = member::where('passenger_nrc',$passenger->nrc_passport)->first();
                        $data = [
                           'passenger' => $passenger,
                           'member' => member::where('passenger_nrc',$passenger->nrc_passport)->first(),
                       ];
                           Mail::send('mail.memberUpdate',$data,function($message) use($email){
                               $message->to($email)->subject('Membership update');;
                           });
                           
                      
                    }
                }
                
                if($oldMemberType != 'platinum'){
                    if($result->count >= 8){
                        member::where('passenger_nrc',$passenger->nrc_passport)->update([
                            'card_number' => rand(10000,99999),
                            'passenger_nrc' => $passenger->nrc_passport,
                            'member_type' => 'platinum',
                        ]);
                        $member = member::where('passenger_nrc',$passenger->nrc_passport)->first();
                        $data = [
                           'passenger' => $passenger,
                           'member' => member::where('passenger_nrc',$passenger->nrc_passport)->first(),
                       ];
                           Mail::send('mail.memberUpdate',$data,function($message) use($email){
                               $message->to($email)->subject('Membership update');;
                           });
                    }
                }
               
              
             
            }
            else{
            
              // echo 'new';
                $passenger = passenger::where('nrc_passport',$result->nrc_passport)->first();
                $contact = contact::where('contact_id',$passenger->contact_id)->first();

            if($result->count >= 8){
                
                member::create([
                    'card_number' => rand(10000,99999),
                    'passenger_nrc' => $passenger->nrc_passport,
                    'member_type' => 'platinum',
                ]);
                $data = [
                'passenger' => $passenger,
                'member' => member::where('passenger_nrc',$passenger->nrc_passport)->first(),
            ];
            $email = $contact->email;
            Mail::send('mail.membership',$data,function($message) use ($email){
                $message->to($email)->subject('Membership ');;
            });
                
            }
                if($result->count >= 5 && $result->count <8){
                  member::create([
                        'card_number' => rand(10000,99999),
                        'passenger_nrc' => $passenger->nrc_passport,
                        'member_type' => 'gold',
                    ]);
                    $data = [
                        'passenger' => $passenger,
                        'member' => member::where('passenger_nrc',$passenger->nrc_passport)->first(),
                    ];
                    $email = $contact->email;
                    Mail::send('mail.membership',$data,function($message) use ($email){
                        $message->to($email)->subject('Membership ');;
                    });
                  
                }
                    if($result->count >= 2 && $result->count <5){
                       member::create([
                            'card_number' => rand(10000,99999),
                            'passenger_nrc' => $passenger->nrc_passport,
                            'member_type' => 'silver',
                        ]);
                        $data = [
                            'passenger' => $passenger,
                            'member' => member::where('passenger_nrc',$passenger->nrc_passport)->first(),
                        ];
                        $email = $contact->email;
                        Mail::send('mail.membership',$data,function($message) use ($email){
                            $message->to($email)->subject('Membership ');;
                        });
            }
           
            }
        }
       
    }
}