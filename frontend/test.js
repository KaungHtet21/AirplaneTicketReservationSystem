let arr = [
    {
        "ticket_id": 3,
        "ticket_number": "E1",
        "flight_id": 1,
        "available": 1,
        "class": "economy",
        "price": "80",
        "created_at": null,
        "updated_at": null
    },
    {
        "ticket_id": 4,
        "ticket_number": "E2",
        "flight_id": 1,
        "available": 1,
        "class": "economy",
        "price": "80",
        "created_at": null,
        "updated_at": null
    },
    {
        "ticket_id": 147,
        "ticket_number": "E1",
        "flight_id": 28,
        "available": 1,
        "class": "economy",
        "price": "80",
        "created_at": null,
        "updated_at": null
    },
    {
        "ticket_id": 148,
        "ticket_number": "E2",
        "flight_id": 28,
        "available": 1,
        "class": "economy",
        "price": "80",
        "created_at": null,
        "updated_at": null
    },
    {
        "ticket_id": 151,
        "ticket_number": "E1",
        "flight_id": 28,
        "available": 1,
        "class": "economy",
        "price": "80",
        "created_at": null,
        "updated_at": null
    },
    {
        "ticket_id": 152,
        "ticket_number": "E2",
        "flight_id": 28,
        "available": 1,
        "class": "economy",
        "price": "80",
        "created_at": null,
        "updated_at": null
    },
    {
        "ticket_id": 155,
        "ticket_number": "E1",
        "flight_id": 29,
        "available": 1,
        "class": "economy",
        "price": "80",
        "created_at": null,
        "updated_at": null
    },
    {
        "ticket_id": 156,
        "ticket_number": "E2",
        "flight_id": 29,
        "available": 1,
        "class": "economy",
        "price": "80",
        "created_at": null,
        "updated_at": null
    },
    {
        "ticket_id": 159,
        "ticket_number": "E1",
        "flight_id": 29,
        "available": 1,
        "class": "economy",
        "price": "80",
        "created_at": null,
        "updated_at": null
    },
    {
        "ticket_id": 160,
        "ticket_number": "E2",
        "flight_id": 29,
        "available": 1,
        "class": "economy",
        "price": "80",
        "created_at": null,
        "updated_at": null
    }
]

let alreadyTaken = new Set();
let result = [];

for(let i = 0; i < arr.length; i++) {
    const ticket = arr[i];
    if(alreadyTaken.has(ticket.flight_id)) {
        continue;
    }

    result.push(ticket);
    alreadyTaken.add(ticket.flight_id);
}

console.log(result);