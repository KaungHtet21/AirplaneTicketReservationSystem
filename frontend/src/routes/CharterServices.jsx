import React from "react";
import Foot from "../components/Foot/Foot";
import Navbar from "../components/Navbar/Navbar";

export default function CharterServices() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "50px", marginTop: "70px" }}>
        <h2 style={{ marginBottom: "30px", color: "#065a9e" }}>
          Charter Services
        </h2>
        <h3 style={{ color: "#065a9e" }}>Charter A Whole Aircraft</h3>
        <p style={{ lineHeight: "30px" }}>
          We organize private flights from Yangon and other airports in Myanmar
          to enable our clients to select the schedule they need. The private
          flight can be arranged for one-way flights or round trip flights for
          any number of passengers from 1 to maximum capacity of the aircraft.
          Any private flight is arranged with the utmost security and safety.
        </p>
        <ul style={{ marginLeft: "40px" }}>
          <li>
            Private flight allows you to select your departure time and location
          </li>
          <li>
            Private flight allows you to select the traveling companions on your
            flight
          </li>
          <li>
            Private flight allows you to select the exact services and service
            levels you and your party desire
          </li>
          <li>
            Private flights are an excellent solution to logistical problems for
            groups of different sizes. Especially when scheduled connections are
            infrequent and time is an important factor.
          </li>
        </ul>
        <a href=""></a>
        <p>
          "For more information, please contact us at{" "}
          <a href="" style={{ color: "#065a9e", textDecoration: "none" }}>
            charter@airkbz.com
          </a>
          ".
        </p>
      </div>
      <Foot />
    </div>
  );
}
