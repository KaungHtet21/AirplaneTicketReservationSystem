import React from "react";
import "./RecommendationStyles.css";
import { Places } from "./RecommendPlaces";

export default function Recommendation() {
  return (
    <div className="recommendation">
      <h2 style={{marginBottom: "20px", color: "#065a9e"}}>Recommend for you</h2>
      <ul className="recommend_places_list">
        {Places.map((place, index) => {
          return (
            <div className="recommend_cards">
              <li key={index}>
                <img
                  src={place.img_path}
                  alt=""
                  className="recommend_card_img"
                />

                <div className="recommend_card_image_overlay">
                  <div className="header">
                    <p className="recommend_card_image_description">
                      From {place.from}
                    </p>
                  </div>

                  <div className="recommend_card_image_destination_title">
                    {place.to}
                  </div>
                  <div className="footer">
                    <hr />
                    <p className="recommend_card_image_description">
                      Start from
                    </p>
                    <div className="recommend_card_image_title">
                      {place.price}
                    </div>
                  </div>
                </div>
              </li>
            </div>
          );
        })}
      </ul>
      {/* <div className="recommend_cards">
        <img src={bkk} alt="" className="recommend_card_img" />

        <div className="recommend_card_image_overlay">
          <div className="header">
            <p className="recommend_card_image_description">From Yangon</p>
          </div>

          <div className="recommend_card_image_destination_title">Bangkok</div>
          <div className="footer">
            <hr />
            <p className="recommend_card_image_description">Start from</p>
            <div className="recommend_card_image_title">$800</div>
          </div>
        </div>
        
      </div> */}
    </div>
  );
}
