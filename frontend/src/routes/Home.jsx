import React from "react";
import Hero from "../components/Home/Hero";
import Navbar from "../components/Navbar/Navbar";
import HeroImg from "../assets/hero.jfif"
import Recommendation from "../components/recommendation/Recommendation";
import Promo from "../components/promo/Promo";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero
        cName="hero"
        // heroImg="https://i.pinimg.com/564x/da/61/b3/da61b356cc4cbf532d02d1f6c7df3447.jpg"
        heroImg = {HeroImg}
        title="Your Journey Your Story"
        text="Choose Your Favourite Destination"
        buttonText="Let's Go Flying"
        url="/"
        btnClass="show"
      />
      <Recommendation/>
      <hr style={{marginTop: "20px", marginBottom: "20px"}} />
      <Promo/>
    </div>
  );
}
