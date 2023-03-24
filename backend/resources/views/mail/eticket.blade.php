<html>
<header>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <title>Document</title>
    <style>
        #container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            background-image: linear-gradient(to bottom right, #b6cffe, #ffff);
        }

        #child_container {
            width: 100%;
            padding-left: 50px;
            padding-right: 50px;
            padding-top: 20px;
            padding-bottom: 20px;
            display: flex;
            gap: 12px;
        }

        #column_container {
            width: 100%;
            display: flex;
            flex-direction: column;
        }

    </style>
</header>

<body>
    <div id="container">
        <div id="child_container" style="justify-content: center; flex-direction: row;">
            <h3>Plane Ticket Purchase</h3>
            <hr>
        </div>
        <div id="child_container" style="flex-direction: column;">
            <div id="column_container">
                <h4>Booking Date</h4>
                <span>Saturday, December 3, 2022</span>
            </div>
            <div id="column_container">
                <h4>Guest Name</h4>
                <span>Miss Stephanie Celine Linden</span>
            </div>
            <hr>
        </div>
        <div id="child_container" style="flex-direction: column;">
            <h1>Flight Details</h1>
            <h4>Route</h4>
            <hr>
        </div>
        <div id="child_container" style="justify-content: space-between;">
            <div id="column_container">
                <span>From</span>
                <span>New York</span>
            </div>
            <div id="column_container">
                <span>Airline</span>
                <span>ACME Airlines</span>
            </div>
            <div id="column_container">
                <span>Departure Date</span>
                <span>Tuesday, December 20,</span>
                <span>2022 06:30</span>
            </div>
            <div id="column_container">
                <span>Arrival Date</span>
                <span>Tuesday, December 6,</span>
                <span>2022 23:30</span>
            </div>
            
        </div>
        <hr>
        <div id="child_container" style="justify-content: space-between;">
            <div id="column_container">
                <span>To</span>
                <span>London</span>
            </div>
            <div id="column_container">
                <span>Flight Number</span>
                <span>AA7755</span>
            </div>
            <div id="column_container">
                <span>Departure Terminal</span>
                <span>Terminal 1</span>
            </div>
            <div id="column_container">
                <span>Arrival Terminal</span>
                <span>Terminal 5</span>
            </div>
        </div>
        <hr>
        <div id="child_container" style="justify-content: space-between;">
            <div id="column_container">
                <h4>Seat Class</h4>
                <span>Business Class</span>
            </div>
            <div id="column_container">
                <h4>Extra Baggage Allowance</h4>
                <span>8</span>
            </div>
            <div id="column_container">
                <h4>Seat Number</h4>
                <span>3-A</span>
            </div>
        </div>

    </div>
</body>

</html>