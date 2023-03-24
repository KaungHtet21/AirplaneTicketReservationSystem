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
            <b>To: </b> {{ $customer->first_name }} {{$customer->last_name}}<br>
        </div>
        <hr>
        <div class=" justify-content-center mt-5">

            <p class="mb-4">Your flight has been booked.</p>
        
            <p>Date : {{ $transaction->created_at->format('d D M/Y')  }}</p>
            <p>Amount Due : {{ $transaction->total_amount }}$</p>
        </div>
    </div>
        <h1>Plane Ticket Purchase</h1>
        
      
    <p>Dear {{$customer->first_name}} {{$customer->last_name}},
        <p>
            
Thank you for considering our online flight ticket system for your upcoming travel plans. We are pleased to provide you with the necessary information to make an informed decision regarding your booking.

Our flights depart from <b>{{$depart_flight->from}}</b> and arrive at <b>{{$depart_flight->to}}</b>.
        </p>
 
<p>
Additionally, we have several branches located throughout the city where you can purchase your 
tickets over the counter. Our branches are open 9AM.
Here's our branch information..</p>
<h2>{{$branch}}</h2>
@if($branch == 'Lashio Head Office' )
<p><h4>No36, Bogyoke Road, Quarter 2,Lashio</h4></p>
<p><h4>Tel: +95 (09) 431 201 58, (082) 292 5263</h4></p>
<p><h4>Email: <a>info@airkae.com</a></h4></p>
@endif
<p>

<div> 
      @if($return_tickets != [])
    <h2>Flight Information(Round Trip)</h2>
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
</tr><tr>
    <th>Depart Time:</th>
    <td>{{$depart_flight->depart_time}}</td>
</tr>
<tr>
    <th>Return Date:</th>
    <td>{{$return_flight->depart_date}}</td>
</tr><tr>
    <th>Return Time:</th>
    <td>{{$return_flight->depart_time}}</td>
</tr>
<tr>
    <th>Seat Class:</th>
    <td>
        {{$depart_class}}
    </td>
</tr>
<tr>
    <th>Total Ticket</th>
    <td>{{count($depart_tickets) * 2}} </td>
</tr>            
<tr>
    <td>Depart Eticket Valid Date : {{$depart_flight->depart_date}}</td>

</tr>
</table>
@else

<h2>Flight Information(One Way)</h2>
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
</div>
@endif

<div>
<h3>Passenger Info</h3>
     <table>
        <tr>
            <th>Passenger Name</th>
            <th>NRC</th>
        </tr>
        
          
            @foreach($passengers as $passenger)
            <tr>
            <td>{{$passenger->first_name}} {{$passenger->last_name}}</td>
            <td>{{$passenger->nrc_passport}}</td>
            </tr>
            @endforeach
            
       
     </table>
</div>
We kindly remind you that the ticket you have selected is available for purchase until 
<b>{{ $transaction->created_at->addDays(5)->format('d D M Y')  }}</b>.
</p>
<p>
Please ensure you comply with airport restrictions on the carriage of liquids, aerosols and gels in hand baggage
    Thank you for choosing our airline. We hope you have a pleasant flight!</p>
    </div>

    </div>
</body>

</html>