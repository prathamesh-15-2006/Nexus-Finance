import React from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import { useTheme } from "../../../contexts/ThemeContext";
import image1 from '../../../asset/modern/1.webp';
import image2 from '../../../asset/modern/2.webp';
import image3 from '../../../asset/modern/3.webp';

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";




const stepsData = [
  {
    title: "1. Complete the application",
    description: "Once we've got your loan application, a lending specialist will give you a call to have a chat about your business needs. We're here to make sure we've got all the details right!",
    image: image1,
  },
  {
    title: "2. Review & accept your offer",
    description: "You'll be sent an offer with clear loan terms and details. We will talk you through it and answer any questions to ensure you're completely comfortable before signing. Our offers are tailored to your business needs.",
    image: image2,
  },
  {
    title: "3. Funds transferred",
    description: "After the offer is accepted, your funds are transferred directly into your business bank account. The money is usually available within 24 business hours so you can get started on your business goals immediately!",
    image: image3,
  },
];

const AlternatingLayout = () => {
  const { isDarkMode } = useTheme();

  const themeColors = {
    background: isDarkMode
      ? "linear-gradient(135deg, #16213e, #0f1423)"
      : "linear-gradient(135deg, #f0f4f8, #e6e9f0)",
    textColor: isDarkMode ? "#ffffff" : "#000000",
    headingColor: isDarkMode ? "#2ECC71" : "#2196F3",
    descriptionColor: isDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
  };

  return (
    <Box
      sx={{
        background: themeColors.background,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: { xs: 2, md: 6 },
        transition: "all 0.3s ease",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {stepsData.map((step, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: index % 2 === 0 ? "row-reverse" : "row",
              },
              alignItems: "center",
              gap: 4,
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: { xs: "100%", md: "auto" },
                p: 2,
              }}
            >
              <Box sx={{ width: "250px", height: "250px" }}>
                <img
                  src={step.image}
                  alt={step.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '16px',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ flex: 1, p: 2 }}>
             <Typography
                                variant="h4"
                                fontWeight={700}
                                gutterBottom
                                sx={{
                                  backgroundImage: cardGradient,
                                  backgroundSize: "200%",
                                  backgroundClip: "text",
                                  textFillColor: "transparent",
                                  WebkitBackgroundClip: "text",
                                                                     fontWeight:800,

                                  WebkitTextFillColor: "transparent",
                                }}
                              >
                                {step.title}
                              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: themeColors.descriptionColor,
                  lineHeight: 1.8,
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  transition: "color 0.3s ease",
                }}
              >
                {step.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AlternatingLayout;
