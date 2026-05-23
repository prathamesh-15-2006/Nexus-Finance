import React from "react";
import { Box, Typography, Container } from "@mui/material";
import Banner from '../../../asset/bgimgs/banner.webp';
import Flexible from './Flexible-page.jsx';
import Info from './Info.jsx';
import ModernFinancePage from './Feature-Card.jsx';
import FaqSection from './Answers.jsx';

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";


const  Finance = () => {
 

  return (
      <>
    <Box
        sx={{
          backgroundImage: `url(${Banner})`,
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
                fontWeight: 700,
                fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" }, // responsive font size
                background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.2,
              }}
            >
              Smart Invoice Finance Solutions 

            </Typography>
          </Box>
        </Container>
      </Box> 
     <Flexible/>
  <Info/>
 <ModernFinancePage/>
 <FaqSection/>
 
 
  </>
  );
};

export default Finance;
