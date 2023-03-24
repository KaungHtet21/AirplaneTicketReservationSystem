import React from 'react'
import './AcceptedPayments.css'
import master_card from "../../assets/master_card.png"
import visa from "../../assets/visa_1.png"
import mpu from "../../assets/mpu.svg"
import jcb from "../../assets/jcb.svg"

export default function AcceptedPayments() {
  return (
    <div className="accepted_payments">
        <h2 style={{ marginBottom: "20px", color: "#065a9e" }}>Accepted Payments</h2>
        <div className="payment_logos">
            <img src={master_card} alt="" />
            <img src={visa} alt="" />
        </div>
    </div>
  )
}
