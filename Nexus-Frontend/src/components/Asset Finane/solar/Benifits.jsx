import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { motion } from "framer-motion";
import SolarIcons from "../../../asset/bgimgs/car.webp";
import { useTheme } from "../../../contexts/ThemeContext";


export default function SolarEquipmentPage() {
  const { isDarkMode } = useTheme();
  
  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
        background: isDarkMode 
          ? "linear-gradient(135deg, rgba(0, 191, 165, 0.1), rgba(33, 150, 243, 0.1))"
          : "linear-gradient(135deg, rgba(215, 226, 225, 0.3), rgba(222, 226, 229, 0.3))",
        display: "flex",
        alignItems: "center",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: isDarkMode 
          ? "1px solid rgba(255, 255, 255, 0.1)" 
          : "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: isDarkMode 
          ? "0 8px 32px rgba(0, 0, 0, 0.4)" 
          : "0 8px 32px rgba(0, 0, 0, 0.2)",
        backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
      }}
    >
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        direction={{ xs: "column", md: "row" }} // Side-by-side on desktop, stacked on mobile
      >
        {/* Left Side - 3D Icon */}
        <Grid
          item
          xs={12}
          md={5}
          sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt:7 }}
        >
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ textAlign: "center" }}
          >
            <img
              src={SolarIcons}// replace with your image path or hosted URL
              alt="3D Solar Panel"
              style={{
                width: "100%",
                maxWidth: "300px",
                height: "auto",
                filter: "drop-shadow(0 5px 15px rgba(0,0,0,0.2))"
              }}
            />
          </motion.div>
        </Grid>

        {/* Right Side - Text */}
        <Grid item xs={12} md={7}>
          <Typography
            variant="h2"
            sx={{
                fontWeight: "bold",
                mb: 2,
                fontSize: { xs: "2rem", md: "3.5rem" },
                background: isDarkMode 
                  ? "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)" 
                  : "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textFillColor: "transparent",
                textAlign:'center',
              }}
          >
            Solar Equipment Finance Solutions – Power Your Business With Green Energy
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: isDarkMode ? "rgba(255, 255, 255, 0.9)" : "#333",
              fontSize: { xs: "1rem", md: "1.2rem" },
              mb: 3,
              lineHeight: 1.6,
              textAlign:"center",
            }}
          >
            At <strong>Nexus Finance</strong>, based in , we specialise in helping businesses and homeowners transition to clean, renewable energy. Our tailored <strong>solar equipment finance solutions</strong> make sustainable upgrades accessible, offering fast approvals, flexible repayment options, and competitive rates. With a network of 50+ lenders and expert support, we help you reduce energy costs, boost property value, and make smart eco-investments—all with extra savings on borrowing.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
