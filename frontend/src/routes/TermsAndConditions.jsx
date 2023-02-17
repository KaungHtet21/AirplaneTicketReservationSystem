import React from "react";
import Foot from "../components/Foot/Foot";
import Navbar from "../components/Navbar/Navbar";

export default function TermsAndConditions() {
  return (
    <div>
      <Navbar />
      <div>
        <h3 style={{ color: "#065a9e", paddingTop: "120px", paddingLeft: "100px", paddingRight: "100px", paddingBottom: "30px" }}>
          Ticketing Terms & Conditions
        </h3>
        <ol style={{paddingLeft: "100px", paddingRight: "100px", letterSpacing: "1px", paddingBottom: "20px"}}>
          <li>Tickets are Valid for AIR MIIT only and non-transferable.</li>
          <li>Selling Fares are equal to Air fares, YQ, YR and Airport Tax.</li>
          <li>
            Child fares are equal to 75% of applicable adult fare, YQ, YR and
            Airport Tax.
          </li>
          <li>
            Infant Fares for Foreigner passenger shall be charged at 5 USD for
            fare and 3 USD for YQ for any sector which is not applicable for
            agent commission and non-refundable
          </li>
          <li>
            Infant Fares for local passenger shall be charged at 2USD for fare
            and 3 USD for YQ for any sector which is not applicable for agent
            commission and non-refundable.
          </li>
          <li>Child must be the age of between 2 to 12 years old.</li>
          <li>Infant must be under 2 years old.</li>
          <li>
            Infant fares are not occupied seat and if infant is occupying seat,
            then that infant need to pay child fare.
          </li>
          <li>
            Fuel Surcharge is subject to change depending on aviation fuel
            price.
          </li>
          <li>
            Both adults and child passengers are need to pay Domestic Departure
            Airport Tax MMK 3,000 for RGN,MDL and NYT airport and MMK 1000 for
            the rest domestic airport or the equivalent USD as shown in system
            will be collected at the time of ticket issue.
          </li>
          <li>VOID ticket is not allowed.</li>
        </ol>
      </div>
      <Foot/>
    </div>
  );
}
