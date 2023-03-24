<!DOCTYPE html>
<html>

<head>
    <title>Flight e-ticket</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            margin: 0;
            padding: 0;
            background-color: #f2f2f2;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        h1 {
            font-size: 24px;
            font-weight: bold;
            margin: 0 0 20px;
            text-align: center;
            color: #333;
        }

        h2 {
            font-size: 18px;
            font-weight: bold;
            margin: 0 0 10px;
            color: #333;
        }

        table {
            width: 100%;
            margin-bottom: 20px;
            border-collapse: collapse;
        }

        th,
        td {
            padding: 10px;
            border-bottom: 1px solid #ccc;
            color: #333;
            text-align: left;
            font-size: 14px;
        }

        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }

        p {
            font-size: 14px;
            color: #333;
            margin-bottom: 20px;
        }

        .footer {
            font-size: 12px;
            color: #999;
            margin-top: 20px;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="container">
    <div class="container my-4">
        <div>
            <b>From: </b> KAE AIRLINE<br>
            <b>To: </b>{{ $customer->first_name }} {{$customer->last_name}}<br>
        </div>
        <hr>
        <div class=" justify-content-center mt-5">
            <h3>Eticket for customer id {{ $customer->contact_id }}</h3>

            <p class="mb-4">Your flight has been booked.</p>
        
            <p>Date : {{ $transaction->created_at->format('d D M/Y')  }}</p>
            <p>Amount Due : {{ $transaction->total_amount }}$</p>
        </div>
    </div>
        <h1>Plane Ticket Purchase</h1>
        <p>Electronic Ticket Receipt: {{$transaction->transcation_id}}</p>
       
        <h2>Flight Details</h2>
        <hr>
        <h3>Depart Flight</h3>
        <table>

            <tr>
                <th>Flight:</th>
                <td>AKE{{$depart_flight->fligh_id}}</td>
            </tr>
            <tr>
                <th>Departure:</th>
                <td>{{$depart_flight->from}}</td>
            </tr>
            <tr>
                <th>Arrival:</th>
                <td>{{$depart_flight->to}}</td>
            </tr>
            <tr>
                <th>Depart Date:</th>
                <td>{{$depart_flight->depart_date}}</td>
            </tr>
            <tr>
                <th>Seat Class:</th>
                <td>
                    {{$depart_class}}
                </td>
            </tr>
            <tr>
                <th>Total Ticket</th>
                <td>{{count($depart_tickets)}}</td>
            </tr>            
            <tr>
                <td>Depart Eticket Valid Date : {{$depart_flight->depart_date}}</td>
            
            </tr>
        </table>
  
        @if($return_tickets != [])
        
        <table>
            <h3>Return Flight</h3>
            <tr>
                <th>Flight:</th>
                <td>AKE{{$return_flight->fligh_id}}</td>
            </tr>
            <tr>
                <th>Departure:</th>
                <td>{{$return_flight->from}}</td>
            </tr>
            <tr>
                <th>Arrival:</th>
                <td>{{$return_flight->to}}</td>
            </tr>
            <tr>
                <th>Depart Date:</th>
                <td>{{$return_flight->depart_date}}</td>
            </tr>
            <tr>
                <th>Seat Class:</th>
                <td>
                    {{$return_class}}
                </td>
            </tr>
            <tr>
                <th>Total Ticket</th>
                <td>{{count($return_tickets)}}</td>
            </tr>
            <tr>
                <td>Return Ticket Vaild Date:{{$return_flight->depart_date}}</td>
              
            </tr>
        </table>
        @endif
     

     <h3>Passenger Info</h3>
     <table>
        <tr>
            <th>Passenger Name</th>
            <th>NRC</th>
        </tr>
        
          
            @foreach($passengers as $passenger)
            <tr>
            <td>{{$passenger->title}} {{$passenger->first_name}} {{$passenger->last_name}}</td>
            <td>{{$passenger->nrc_passport}}</td>
            </tr>
            @endforeach
            
       
     </table>

        <p>Your payment of <b>{{$transaction->total_amount}}</b> has been processed.</p>
        <p>Your Electronic Ticket is stored in our reservation system. This e-Ticket-Receipt/Itinerary is a record of your Electronic Ticket and formspart of your Contract of Carriage. You may need to present a printed copy of this receipt to enter an airport and/or to prove return or onward travel to customs and immigration officials.Your attention is drawn to the ‘Fare Conditions’ and ‘Conditions of Contract and Other Important Notices’ documents attached to your Booking Confirmation email. Please www.airkae@gmail.com to Check-in Online and for any other information.

 <ul>
    <li>Don't miss your flight. Get to the airport no later than 90 minutes before departure.</li>
    <li>Go through security no later than 60 minutes before departure.</li>
    <li>Boarding starts 45 minutes before your flight, and gates close 20 minutes before departure.</li>
 </ul>
Please ensure you comply with airport restrictions on the carriage of liquids, aerosols and gels in hand baggage
    Thank you for choosing our airline. We hope you have a pleasant flight!</p>
    </div>

    </div>
</body>

</html>