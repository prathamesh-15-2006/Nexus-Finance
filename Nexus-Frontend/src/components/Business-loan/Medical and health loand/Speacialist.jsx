import React from "react";
import { Box, Container, Typography } from "@mui/material";
import medicalBg from "../../../asset/medical/hero.webp"; // your image
import WhoWeSupportSection from "./WhoWeSupportSection";
import FinancialServicesSection from "./FinancialServicesSection";
import LoanFeaturesSection from "./LoanFeaturesSection";
import WhyChooseUsSection from "./WhyChooseUsSection";

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

const Speacialist = () => {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${medicalBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: { xs: "70vh", md: "100vh" }, // Adjust height for mobile
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: { xs: "80px", md: "120px" }, // space below navbar
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            px: { xs: 2, sm: 3, md: 6 }, // extra padding for small screens
          }}
        >
          {/* Background blur container */}
          <Box
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(8px)",
              borderRadius: 3,
              px: { xs: 2, sm: 4, md: 6 },
              py: { xs: 2, sm: 3, md: 4 },
              maxWidth: { xs: "100%", sm: "90%", md: "70%" },
              textAlign: "center",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Responsive heading */}
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" }, // responsive font size
                background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                maxWidth:10000,
                fontWeight:800,
                backgroundClip: "text",
                lineHeight: 1.2,
              }}
            >
              Specialist Loans for Medical Professionals
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Content Sections */}
      <WhoWeSupportSection />
      <FinancialServicesSection />
      <LoanFeaturesSection />
      <WhyChooseUsSection />
    </>
  );
};

export default Speacialist;
