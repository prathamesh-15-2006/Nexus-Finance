import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "../../../contexts/ThemeContext";
import { Sun, Battery, Droplets, Zap, Lightbulb, Leaf } from "lucide-react";

// Using lucide-react icons instead of deleted images
const Solar = () => <Sun size={48} />;
const Battrey = () => <Battery size={48} />;
const Hot = () => <Droplets size={48} />;
const Ev = () => <Zap size={48} />;
const Smart = () => <Lightbulb size={48} />;
const power = () => <Leaf size={48} />;

const services = [
  { title: "Solar Panel Finance", desc: "Finance for solar systems (6kW+), including inverters, with flexible terms of up to 10 years and low fixed interest rates.", icon: Solar() },
  { title: "Battery Storage Systems", desc: "Cover energy storage (5kWh+), ensuring you store solar power and reduce reliance on the grid.", icon: Battrey()},
  { title: "Solar Hot Water & Heat Pump Systems", desc: "Finance for energy-efficient systems (250L+), helping reduce your household or business power consumption.", icon: Hot()  },
  { title: "EV Charging Stations", desc: "Fund installation of electric vehicle chargers and future-proof your property.", icon: Ev() },
  { title: "Smart Energy Solutions", desc: "Finance smart home upgrades like LED lighting, smart thermostats, or energy-efficient window treatments.", icon: Smart()  },
  { title: "Commercial Green Upgrades", desc: "Flexible funding for businesses investing in sustainable operations, like virtual power plants or electric kitchen equipment.", icon: power() },
];

export default function WhatWeOffer() {
  const { isDarkMode } = useTheme();

  return (
    <Box
      sx={{
        py: 8,
        px: 2,
        position: "relative",
        background: isDarkMode 
          ? "linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #415a77 100%)"
          : "linear-gradient(135deg, rgba(215, 226, 225, 0.3), rgba(222, 226, 229, 0.3))",
        overflow: "hidden"
      }}
    >
      {/* Heading */}
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: "bold",
          mb: 8,
          background: isDarkMode 
            ? "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)"
            : "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        What We Offer
      </Typography>

      {/* Timeline */}
      <Box sx={{ position: "relative", maxWidth: "900px", margin: "auto" }}>
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              display: "flex",
              justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
              marginBottom: "80px",
              position: "relative"
            }}
          >
            <Paper
              sx={{
                p: 3,
                maxWidth: "350px",
                background: isDarkMode 
                  ? "rgba(30, 41, 59, 0.8)"
                  : "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                border: isDarkMode 
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(0,0,0,0.1)",
                color: isDarkMode ? "white" : "#1f2937",
                position: "relative",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
                boxShadow: isDarkMode 
                  ? "0 8px 32px rgba(0, 0, 0, 0.3)"
                  : "0 8px 32px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Icon */}
              <Box 
                component="img" 
                src={service.icon} 
                alt={service.title} 
                sx={{ 
                  width: 45, 
                  height: 45,
                  filter: isDarkMode ? "brightness(1.2)" : "none"
                }} 
              />

              {/* Text */}
              <Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: "bold",
                    mb: 1,
                    color: isDarkMode ? "#f9fafb" : "#111827"
                  }}
                >
                  {service.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: isDarkMode ? "#d1d5db" : "#4b5563",
                    lineHeight: 1.6
                  }}
                >
                  {service.desc}
                </Typography>
              </Box>
            </Paper>

            {/* Timeline Dot */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: isDarkMode 
                  ? "linear-gradient(135deg, #60a5fa, #a78bfa)"
                  : "linear-gradient(135deg, #4cc9f0, #a6e1fa)",
                zIndex: 1,
                boxShadow: isDarkMode 
                  ? "0 0 20px rgba(96, 165, 250, 0.5)"
                  : "0 0 20px rgba(76, 201, 240, 0.5)"
              }}
            />
          </motion.div>
        ))}

        {/* Timeline Line */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "4px",
            height: "100%",
            background: isDarkMode 
              ? "linear-gradient(to bottom, #60a5fa, #a78bfa)"
              : "linear-gradient(to bottom, #4cc9f0, #a6e1fa)",
            zIndex: 0,
            borderRadius: "2px"
          }}
        />
      </Box>
    </Box>
  );
}
