import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import About from "./About-Unsecured";
import Benefits from "./Benifites";
import Faq from "./Faq";
import Process from "./Process-step";
import Modern from "./Mordern-Page";
// import Banner from "../../../asset/bgimgs/banner.jpg";
import Hero from "../../Hero"
import Testmonial from "../../Testimonials";
// import Calculator from "../../Calculator";



const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";


export default function Unsecured() {
  return (
    <>
     
      {/* Other sections */}
<Hero headingLine1=" Fast & Flexible Unsecured" headingLine2="Business Loans in "/>      <Testmonial />
      {/* <Calculator /> */}
      <About />
      <Benefits />
      <Process />
      <Modern />
      <Faq />
    </>
  );
}
