import React from 'react'
import Hero from '../components/Home/Hero'
import Navbar from '../components/Navbar/Navbar'
import AboutImg from '../assets/night.jpg'

export default function Service() {
  return (
    <>
    <Navbar/>
    <Hero
      cName="hero"
      heroImg={AboutImg}
      title="Service"
      btnClass="hide"
    />
  </>
  )
}
