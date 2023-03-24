import React from "react"
import Navbar from "../components/Navbar/Navbar";
import { AboutUsBodyParaItems } from "../components/Lists/AboutUsBodyParaItems";
import Foot from "../components/Foot/Foot";

export default function About() {
  return (
    <>
      <Navbar />
      {/* <Hero
        cName="hero"
        heroImg={AboutImg}
        title="About"
        btnClass="hide"
      /> */}
      <div style={{ padding: "50px", marginTop: "70px" }}>
        <h2 style={{ color: "#065a9e", marginBottom: "30px" }}>About us</h2>
        {AboutUsBodyParaItems.map((item, index) => {
          return (
            <div>
              <h3 style={{ color: "#065a9e" }}>{item.title}</h3>
              <p style={{lineHeight: "30px", marginBottom: "20px"}}>{item.para}</p>
            </div>
          );
        })}
      </div>
      <Foot/>
    </>
  );
}
