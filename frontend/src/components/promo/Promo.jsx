import React from "react";
import "./Promo.css";
import new_year from "../../assets/new_year.jfif";

function Promo() {
  return (
    <div className="promo">
      <h2 style={{ marginBottom: "20px", color: "#065a9e" }}>Promotions</h2>
      <div className="promo_cards">
        <div className="promo_card_container">
          <div className="promo_image_container">
            <img src={new_year} alt="" />
          </div>
          <div className="promo_card_content">
            <div className="promo_card_title">
              <h3>New Year</h3>
            </div>
            <div className="promo_card_body">
              <div style={{fontWeight: "500", color: "rgb(78, 75, 75)"}}>Promo Period</div>
              <div>1 Dec - 31 Dec 2022</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Promo;
