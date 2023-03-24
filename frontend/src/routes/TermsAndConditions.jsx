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
          <li>Booking and Ticketing: The passenger may make a reservation and purchase a ticket through the airline's website, reservation center, or authorized travel agent. The passenger must provide accurate and complete information during the booking process. The airline reserves the right to cancel the booking if any information is found to be inaccurate or incomplete.</li>
          <li>Fare Rules: The fare rules are specific to the type of ticket purchased and may include restrictions on refunds, changes, and cancellations. The passenger must review and accept the fare rules before purchasing the ticket.</li>
          <li>
            Child fares are equal to 75% of applicable adult fare, YQ, YR and
            Airport Tax.
          </li>
          <li>
          Payment: The passenger must pay the full fare at the time of booking, unless the airline offers a hold or deposit option. Payment may be made using various methods, including credit card, debit card, or online banking.
          </li>
          <li>
          Baggage: The airline may have restrictions on the number, size, and weight of baggage that a passenger may carry. The passenger must comply with the baggage rules to avoid additional charges or denied boarding.
          </li>
          <li>Check-in: The passenger must check in for the flight within the specified time frame. Failure to do so may result in the cancellation of the booking.</li>
          <li>Boarding: The passenger must arrive at the boarding gate on time. The airline may deny boarding to passengers who arrive late or do not comply with the boarding procedures.</li>
          <li>
          Flight Changes and Cancellations: The airline may change the flight schedule or cancel the flight due to various reasons. The passenger may be entitled to a refund or rebooking, depending on the fare rules and the reason for the change or cancellation.
          </li>
          <li>
          Liability: The airline's liability for any loss, damage, or injury may be limited under the applicable law and the fare rules.
          </li>
          <li>VOID ticket is not allowed.</li>
        </ol>
        <p style={{marginTop: "16px", paddingLeft: "100px", paddingRight: "100px", paddingBottom: "30px", fontSize: "18px", fontWeight: "bold", fontStyle: "italic"}}>The passenger agrees to comply with all the terms and conditions of the airline and the ticket purchased. The airline reserves the right to make changes to the terms and conditions without prior notice. Any disputes arising from the ticketing terms and conditions will be resolved in accordance with the applicable law and the fare rules.</p>
      </div>
      <Foot/>
    </div>
  );
}
