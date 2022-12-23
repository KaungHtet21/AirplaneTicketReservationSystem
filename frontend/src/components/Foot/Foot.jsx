import React from "react";
import "./Foot.css";
import Insta from "@iconscout/react-unicons/icons/uil-instagram";
import Facebook from "@iconscout/react-unicons/icons/uil-facebook";
import Twitter from "@iconscout/react-unicons/icons/uil-twitter";
import LinkedIn from "@iconscout/react-unicons/icons/uil-linkedin";
import Youtube from "@iconscout/react-unicons/icons/uil-youtube";
import Google_Play from "../../assets/google_play.svg";
import App_Store from "../../assets/app_store.svg";

export default function Foot() {
  return (
    <div className="foot">
      <div className="foots">
        <div className="foot_experience">
          <div
            style={{ color: "#fff", fontSize: "15px", marginBottom: "10px" }}
          >
            Air MIIT Experience
          </div>
          <div className="foot_text">Home</div>
          <div className="foot_text">About us</div>
          <div className="foot_text">Promo</div>
          <div className="foot_text">
            Charter Services
          </div>
          <div className="foot_text">Offices</div>
        </div>
        <div className="foot_plan_your_journey">
          <div
            style={{ color: "#fff", fontSize: "15px", marginBottom: "10px" }}
          >
            Plan Your Journey
          </div>
          <div className="foot_text">
            Flight Schedules
          </div>
          <div className="foot_text">
            Terms and Conditions
          </div>
          <div className="foot_text">Travel Policy</div>
          <div className="foot_text">General FAQs</div>
        </div>
        <div className="foot_follow_us">
          <div
            style={{ color: "#fff", fontSize: "15px", marginBottom: "10px" }}
          >
            Follow Us
          </div>
          <div className="foot_follow_us_icons">
            <Facebook className="foot_follow_us_icon"/>
            <Insta className="foot_follow_us_icon"/>
            <Twitter className="foot_follow_us_icon"/>
            <LinkedIn className="foot_follow_us_icon" />
            <Youtube className="foot_follow_us_icon" />
          </div>
        </div>
        <div className="foot_mobile_apps">
          <div style={{ color: "#fff", fontSize: "15px", marginBottom: "10px" }}>
            Check Our Mobile Apps
          </div>
          <div className="foot_mobile_apps_img">
            <img
              style={{ width: "100px", height: "30px" }}
              src={Google_Play}
              alt=""
            />
            <img
              style={{ width: "100px", height: "30px" }}
              src={App_Store}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
