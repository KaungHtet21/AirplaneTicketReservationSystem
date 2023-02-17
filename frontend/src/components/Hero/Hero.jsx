import React from "react";
import { Link } from "react-router-dom";
import "./HeroStyle.css";

export default function Hero(props) {
  return (
    <>
      <div className={props.cName}>
        <img src={props.heroImg} alt="HerpImg" />
        <div className="hero-text">
          <h1>{props.title}</h1>
          <p>{props.text}</p>
          <Link to="/fly" style={{textDecoration: "none"}}>
            <a href={props.url} className={props.btnClass}>
              {props.buttonText}
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
