import React from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import "./RecommendationStyles.css";
import { Places } from "./RecommendPlaces";

export default function Recommendation() {
  const navigate = useNavigate();
  function handleCardOnClick(from, to) {
    navigate(`/recommendOnClick?from=${from}&to=${to}`)
  }

  return (
    <div className="recommendation">
      <h2 style={{marginBottom: "20px", color: "#065a9e"}}>Recommend for you</h2>
      <ul className="recommend_places_list">
        {Places.map((place, index) => {
          return (
            <div className="recommend_cards" onClick={() => {handleCardOnClick(place.from, place.to)}}>
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
    </div>
  );
}
