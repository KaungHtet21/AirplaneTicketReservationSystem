import React from "react";
import "./Promo.css";
import { PromoList } from "../Lists/PromoList";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";

function Promo() {
  return (
    <div className="promo">
      <h2 style={{ marginBottom: "20px", color: "#065a9e", marginLeft: "30px" }}>Promotions</h2>
      <div className="promo_cards">
        <Swiper
          spaceBetween={50}
          slidesPerView={4}
          grabCursor={true}
        >
          {PromoList.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="promo_card_container">
                  <div className="promo_image_container">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="promo_card_content">
                    <div className="promo_card_title">
                      <h3>{item.title}</h3>
                    </div>
                    <div className="promo_card_body">
                      <div
                        style={{ fontWeight: "500", color: "rgb(78, 75, 75)" }}
                      >
                        Promo Period
                      </div>
                      <div>{item.period}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default Promo;
