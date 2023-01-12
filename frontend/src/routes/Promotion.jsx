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
          className={promo ? "promo_div": "promo_div display_none"}
          style={{ marginTop: "40px"}}
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

        <div className={program ? "program_div": "program_div display_none"} style={{ marginTop: "40px" }}>
          <div className="program_card_container">
            <img src={jade} alt="" />
            <img src={ruby} alt="" />
            <img src={diamond} alt="" />
          </div>
          <h3
            style={{
              color: "#065a9e",
              paddingLeft: "100px",
              paddingTop: "30px",
              paddingBottom: "30px"
            }}
          >
            Membership Program
          </h3>
          <ul style={{ paddingLeft: "100px", letterSpacing: "1px", paddingRight: "100px", paddingBottom: "20px" }}>
            <li>
              The Membership Program, operated by the airline Myanmar Airways
              International & Air MIIT is a loyalty program for Air MIIT
              passengers.
            </li>
            <li>
              Members of the Program are credited with miles based on the
              flights they fly with our airlines. The miles are credited by
              predefined rates and terms and conditions, and the limitations
              presented in this program.
            </li>
            <li>
              Sky Smile Program membership is open to any individual older than
              12 years, provided that the person fulfills all of the membership
              requirements and is not explicitly prohibited by the legislation
              to join such membership program.
            </li>
            <li>
              Any applicant interested in joining Sky Smile Program is required
              to complete Sky Smile Program membership form available at
              www.maiair.com or www.airkbz.com , which shall be considered to
              constitute a valid application. The person shall confirm that he
              is acquainted with the Terms & Conditions of the Program and
              agrees to abide by them.
            </li>
            <li>
              Membership is free; to keep the membership active, newly
              registered members need to fly at least once within the first six
              (6) months – if this no activity is recorded, then membership
              shall be automatically terminated.
            </li>
            <li>
              Membership takes effect immediately once the Sky Smile Program
              membership number is issued by the airlines.
            </li>
            <li>
              Membership is not open to legal persons or other groups or
              associations.
            </li>
            <li>Only one Sky Smile Program is allowed per member.</li>
            <li>
              In case of loss, members can reissue their electronic member cards
              with the penalty fee of USD 20.
            </li>
            <li>
              The validity of the program is divided into two parts, one for the
              Membership Tier and Award Mileage
            </li>
            <li>
              The exercise of rights connected with Sky Smile membership can be
              transferred from Sky Smile member to another person. Sky Smile
              Program members have the right to Sky Smile program benefits only
              after their details are recorded on the Sky Smile database.
            </li>
            <li>
              Any requests for an upgrade to any tiers by members will be
              strictly not entertained if the set criteria are adhered.
            </li>
          </ul>
        </div>
      </div>
      <Foot/>
    </>
  );
}
