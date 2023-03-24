<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <title>Document</title>
</head>

<body>
    <div class="container mt-4">
        <div>
            <b>From: </b> Miit Laravel <br>
            <b>Sent: </b>{{ Carbon\Carbon::now()->format('dD M/Y') }} <br>
            <b>To: </b>{{$customer->title}} {{ $customer->first_name }}<br>
        </div>
        <hr>
        <div class=" justify-content-center mt-5">
            <h3>Eticket for customer id {{ $customer->contact_id }}</h3>

            <p class="mb-4">Your flight has been booked.</p>
        
            <p>Date : {{ $transaction->created_at }}</p>
            <p>Amount Due : {{ $transaction->total_amount }}$</p>
            <a href="{{ route('download#eticket') }}">Download your eticket here.</a>
        </div>
    </div>
</body>

</html>