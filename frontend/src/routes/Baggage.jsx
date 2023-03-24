import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import {BaggageRate} from "../components/Lists/BaggageRate";

function Baggage() {
  return (
    <div style={{display: "flex", justifyContent: "center", padding: "200px"}}>
      <Navbar/>
      <table style={{width: "60%", border: "1px solid black"}}>
        <tr>
            <th style={{border: "1px solid black", padding: "10px"}}>No.</th>
            <th style={{border: "1px solid black", padding: "10px"}}>Sector</th>
            <th style={{border: "1px solid black", padding: "10px"}}>Excess Rate / Kg</th>
        </tr>
        {BaggageRate.map((item,index) => {
            return(
                <tr>
                    <td style={{border: "1px solid black", padding: "10px"}}>{item.no}</td>
                    <td style={{border: "1px solid black", padding: "10px"}}>{item.sector}</td>
                    <td style={{border: "1px solid black", padding: "10px"}}>{item.rate}</td>
                </tr>
            )
        })}
      </table>
    </div>
  )
}

export default Baggage
