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
            <b>To: </b>{{$passenger->title}} {{ $passenger->first_name }} {{ $passenger->last_name }}<br>
        </div>
        <hr>
        <div class=" justify-content-center mt-5">
            <h3>Congrats! You are now updated to {{$member->member_type}} member of our airline.</h3>

            <p class="mb-4">Here's your membership code.</p>
            <p class="text-danger">{{$member->card_number}}</p>
        
        </div>
    </div>
</body>

</html>