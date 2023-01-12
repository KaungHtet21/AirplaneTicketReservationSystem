import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { OfficesList } from "../components/Lists/OfficesList";
import Foot from "../components/Foot/Foot";

export default function Offices() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "50px", marginTop: "70px" }}>
        <h2 style={{ color: "#065a9e", marginBottom: "30px" }}>Our Stations</h2>
        <h3 style={{ color: "#065a9e", marginBottom: "6px" }}>Air MIIT Limited</h3>
        <ul style={{ listStyle: "none" }}>
          <li>International Business Center (IBC)</li>
          <li>No. 88, 11 Quarter, Pyay Road, Hlaing Township</li>
          <li>Yangon 11051, Myanmar.</li>
          <li>Tel: +95 (01) 967 0007</li>
          <li>
            Email:{" "}
            <a href="" style={{ textDecoration: "none", color: "#065a9e" }}>
              info@airkbz.com
            </a>
          </li>
        </ul>
        <h3 style={{ color: "#065a9e", marginBottom: "20px", marginTop: "20px" }}>Air MIIT (Ticketing & Sales Offices)</h3>
        {OfficesList.map((item,index) => {
            return(
                <div>
                    <h3 style={{ color: "#065a9e", marginBottom: "6px" }}>{item.title}</h3>
                    <p>{item.location}</p>
                    <p>{item.tele}</p>
                    <p>Email: <a href="" style={{textDecoration: "none", color: "#065a9e"}}>{item.email}</a></p>
                    <hr style={{marginTop: "10px", marginBottom: "10px"}} />
                </div>
            )
        })}
      </div>
      <Foot/>
    </div>
  );
}
