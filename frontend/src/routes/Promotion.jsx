import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import "./Promotion.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { PromoList } from "../components/Lists/PromoList";
import "swiper/css";
import jade from "../assets/jade_program.png";
import ruby from "../assets/ruby_program.png";
import diamond from "../assets/diamond_program.png";
import Foot from "../components/Foot/Foot";
import gold from "../assets/gold.jpg";
import silver from "../assets/silver.jpg";
import platinum from "../assets/platinum.jpg";

export default function Promotion() {
  const [promo, setPromo] = useState(true);
  const [program, setProgram] = useState(false);

  function handleClickPromo() {
    setPromo(true);
    setProgram(false);
  }

  function handleClickProgram() {
    setPromo(false);
    setProgram(true);
  }

  return (
    <>
      <Navbar />
      <div className="promo_container" style={{ marginTop: "20px" }}>
        <ul
          className="promo_types"
          style={{
            paddingTop: "100px",
            paddingLeft: "100px",
            paddingRight: "100px",
          }}
        >
          <li className={promo ? "active" : ""} onClick={handleClickPromo}>
            Promo
          </li>
          <li className={program ? "active" : ""} onClick={handleClickProgram}>
            Membership
          </li>
        </ul>

        <div
          className={promo ? "promo_div" : "promo_div display_none"}
          style={{ marginTop: "40px" }}
        >
          <Swiper
            style={{ padding: "50px" }}
            slidesPerView={2}
            spaceBetween={100}
          >
            {PromoList.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div
                    style={{ width: "500px" }}
                    className="promo_card_container"
                  >
                    <div className="promo_image_container">
                      <img style={{ height: "300px" }} src={item.img} alt="" />
                    </div>
                    <div className="promo_card_content">
                      <div className="promo_card_title">
                        <h3>{item.title}</h3>
                      </div>
                      <div className="promo_card_body">
                        <div
                          style={{
                            fontWeight: "500",
                            color: "rgb(78, 75, 75)",
                          }}
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

        <div
          className={program ? "program_div" : "program_div display_none"}
          style={{ marginTop: "40px" }}
        >
          <div className="program_card_container">
            <img src={silver} alt="" />
            <img src={gold} alt="" />
            <img src={platinum} alt="" />
          </div>
          <h3
            style={{
              color: "#065a9e",
              paddingLeft: "100px",
              paddingTop: "30px",
              paddingBottom: "30px",
            }}
          >
            Membership Program
          </h3>
          <ul
            style={{
              paddingLeft: "100px",
              letterSpacing: "1px",
              paddingRight: "100px",
              paddingBottom: "20px",
            }}
          >
            <li>
              Membership Program: Frequent Flyer A flight membership program is
              a loyalty program offered by KAE airlines to reward frequent
              flyers. Members of these programs are offered special benefits,
              such as access to airport lounges, priority check-in, free baggage
              allowances, and the ability to earn and redeem points or miles for
              free flights or upgrades.
            </li>
            <li>
              One of the benefits that some flight membership programs offer is
              the ability to purchase a certain number of tickets in advance at
              a discounted price. For example, an airline may offer a membership
              program that allows members to purchase 10 tickets at a discounted
              rate, which can be used for future travel. As a member, you'll
              have access to exclusive benefits and rewards to enhance your
              travel experience. One of the key benefits of our program is the
              ability to purchase a specific number of tickets in advance at a
              discounted rate.
            </li>
            <li>
              Members can earn flight credits by booking flights through the
              online flight system. Every flight booked earns one flight credit,
              and once a member reaches the required number of flight credits,
              they are automatically upgraded to the next membership level.
              Membership is free; to keep the membership active, newly
              registered members need to fly at least once within the first six
              (6) months – if this no activity is recorded, then membership
              shall be automatically terminated.
            </li>
            <li>Membership Levels:</li>
            <li>
              Silver: Achieved after 10 flights, includes all benefits listed
              above
            </li>
            <li>
              Gold: Achieved after 25 flights, includes all benefits listed
              above plus an additional free flight ticket per year
            </li>
            <li>
              Platinum: Achieved after 50 flights, includes all benefits listed
              above plus an additional free flight ticket per year and access to
              airport lounges
            </li>
            <li>Silver Membership Benefits:</li>
            <li>
              Access to exclusive deals and discounts on flights, hotels, and
              car rentals Priority check-in at the airport Free seat selection
              and extra baggage allowance Early boarding privileges 24/7
              customer support
            </li>
            <li>Gold Membership Benefits:</li>
            <li>
              All the benefits of silver membership, plus: Lounge access at
              select airports Priority baggage handling Complimentary upgrades
              to premium seats, when available Faster security checks at select
              airports Higher rewards points for each booking
            </li>
            <li>Platinum Membership Benefits :</li>
            <li>
              All the benefits of gold membership, plus: Guaranteed availability
              of seats, even during peak travel season Concierge service for
              personalized travel assistance Complimentary chauffeur service to
              and from the airport Personalized travel itineraries Exclusive
              access to private airport lounges
            </li>
          </ul>
        </div>
      </div>
      <Foot />
    </>
  );
}
