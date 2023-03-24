import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

function RecommendOnclick() {
    const [flights, setFlights] = useState([])
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/flight")
        .then((response) => response.json())
        .then((data) => setFlights(data));
    }, []);

    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    let location = useLocation();
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setFrom(searchParams.get("from"))
        setTo(searchParams.get("to"))
    }, [location.search])

    const filteredFlights = flights.filter((flight) => {
        return flight.from == from && flight.to == to;
    })

  return (
    <div style={{display: "flex", justifyContent: "center", padding: "200px"}}>
        <Navbar/>
      <table style={{width: "60%", border: "1px solid black"}}>
        <tr>
            <th style={{border: "1px solid black", padding: "10px"}}>From</th>
            <th style={{border: "1px solid black", padding: "10px"}}>To</th>
            <th style={{border: "1px solid black", padding: "10px"}}>Depart Date</th>
            <th style={{border: "1px solid black", padding: "10px"}}>Depart Time</th>
            <th style={{border: "1px solid black", padding: "10px"}}>Arrive Time</th>
        </tr>
        {filteredFlights.map((flight,index) => {
            return(
                <tr>
                    <td style={{border: "1px solid black", padding: "10px"}}>{flight.from}</td>
                    <td style={{border: "1px solid black", padding: "10px"}}>{flight.to}</td>
                    <td style={{border: "1px solid black", padding: "10px"}}>{flight.depart_date}</td>
                    <td style={{border: "1px solid black", padding: "10px"}}>{flight.depart_time}</td>
                    <td style={{border: "1px solid black", padding: "10px"}}>{flight.arrive_time}</td>
                </tr>
            )
        })}
      </table>
    </div>
  )
}

export default RecommendOnclick
