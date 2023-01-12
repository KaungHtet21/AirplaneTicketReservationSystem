import React from "react";
import "./Foot.css";
import Insta from "@iconscout/react-unicons/icons/uil-instagram";
import Facebook from "@iconscout/react-unicons/icons/uil-facebook";
import Twitter from "@iconscout/react-unicons/icons/uil-twitter";
import LinkedIn from "@iconscout/react-unicons/icons/uil-linkedin";
import Youtube from "@iconscout/react-unicons/icons/uil-youtube";
import Google_Play from "../../assets/google_play.svg";
import App_Store from "../../assets/app_store.svg";
import { Link } from "react-router-dom";

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
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="foot_text">Home</div>
          </Link>
          <Link to="/about" style={{ textDecoration: "none" }}>
            <div className="foot_text">About us</div>
          </Link>
          <Link to="/promo" style={{ textDecoration: "none" }}>
            <div className="foot_text">Promo</div>
          </Link>
          <Link to="/charter_service" style={{ textDecoration: "none" }}>
            <div className="foot_text">Charter Services</div>
          </Link>
          <Link to="/offices" style={{ textDecoration: "none" }}>
            <div className="foot_text">Offices</div>
          </Link>
        </div>
        <div className="foot_plan_your_journey">
          <div
            style={{ color: "#fff", fontSize: "15px", marginBottom: "10px" }}
          >
            Plan Your Journey
          </div>
          <div className="foot_text">Flight Schedules</div>
          <Link to="/terms&conditions" style={{ textDecoration: "none" }}>
            <div className="foot_text">Terms and Conditions</div>
          </Link>
          <Link to="/travel_policy" style={{ textDecoration: "none" }}>
            <div className="foot_text">Travel Policy</div>
          </Link>
          <div className="foot_text">General FAQs</div>
        </div>
        <div className="foot_follow_us">
          <div
            style={{ color: "#fff", fontSize: "15px", marginBottom: "10px" }}
          >
            Follow Us
          </div>
          <div className="foot_follow_us_icons">
            <Facebook className="foot_follow_us_icon" />
            <Insta className="foot_follow_us_icon" />
            <Twitter className="foot_follow_us_icon" />
            <LinkedIn className="foot_follow_us_icon" />
            <Youtube className="foot_follow_us_icon" />
          </div>
        </div>
        <div className="foot_mobile_apps">
          <div
            style={{ color: "#fff", fontSize: "15px", marginBottom: "10px" }}
          >
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
