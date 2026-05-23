import React from "react";
import { Box, Paper, Typography, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTheme } from "../../../contexts/ThemeContext";

export default function FinanceCard() {
  const { isDarkMode } = useTheme();
  
  const features = [
    { bold: "Fast Access to Funds: ", text: " Pre-approval in 12–24 hours; funds disbursed in 2–3 business days." },
    { bold: "Borrow from $10,000 to $150,000:", text: " Suited for both residential and commercial projects." },
    { bold: "No Hidden Fees:", text: "No establishment, monthly, or early repayment fees." },
    { bold: "Low Interest from 6.50%:", text: "Competitive, fixed rates." },
    { bold: "No Credit Check Until Offer Accepted:", text: " Apply with confidence." },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: 4,
        py: 6,
        background: isDarkMode 
          ? "linear-gradient(135deg, #0a0a0a, #1a1a1a, #2d2d2d)" 
          : "linear-gradient(135deg, #c2d2d9ff, #d6e3e8ff, #c5d7deff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "background 0.3s ease",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {/* Card 1 */}
        <motion.div
          style={{ flex: "1 1 48%" }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <Paper
            sx={{
              p: 4,
              borderRadius: "24px",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(15px)",
              color: isDarkMode ? "white" : "black",
              boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
              height: "100%",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                fontWeight: "bold",
                position: "relative",
                background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -6,
                  height: "4px",
                  background: "linear-gradient(90deg, #00c6ff, #0072ff)",
                  borderRadius: "2px",
                  width: "30%",
                  left: "0%",
                  animation: "underlineSlide 2s ease-in-out infinite",
                },
                "@keyframes underlineSlide": {
                  "0%": { left: "0%" },
                  "50%": { left: "70%" },
                  "100%": { left: "0%" },
                },
              }}
            >
               Why Finance Your Solar Investment?
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, mt:1}}>
              {features.map((item, index) => (
                <Box
                  key={index}
                  component="li"
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    mb: 2.5,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "transparent",
                      mr: 2,
                      width: 28,
                      height: 28,
                    }}
                  >
                    <CheckCircleIcon sx={{ color: "#00c6ff" }} />
                  </Avatar>
                  <Typography variant="body1">
                    <strong>{item.bold}</strong>
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          style={{ flex: "1 1 48%" }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <Paper
            sx={{
              p: 4,
              borderRadius: "24px",
              background:
                "linear-gradient(135deg, rgba(0,198,255,0.15), rgba(0,114,255,0.15))",
              backdropFilter: "blur(15px)",
              color: isDarkMode ? "white" : "black",
              boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
              height: "100%",
            }}
          >
              <Typography
               variant="h4"
               sx={{
               mb: 4,
               fontWeight: "bold",
               position: "relative",
               background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
               WebkitBackgroundClip: "text",
               WebkitTextFillColor: "transparent",
               display: "inline-block",
               "&::after": {
                 content: '""',
                 position: "absolute",
                 bottom: -6,
                 height: "4px",
                 background: "linear-gradient(90deg, #00c6ff, #0072ff)",
                 borderRadius: "2px",
                 width: "30%",
                 left: "0%",
                 animation: "underlineSlide 2s ease-in-out infinite",
               },
               "@keyframes underlineSlide": {
                 "0%": { left: "0%" },
                 "50%": { left: "70%" },
                 "100%": { left: "0%" },
                 },
                }}
               >
              Why Choose Nexus Finance?
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mt:3 }}>
            We’ve helped dozens of businesses and homeowners across  access solar finance that delivers real cost savings and energy independence. From navigating approvals to selecting eligible products, our tailored advice simplifies the process. With access to 50+ private lenders, we ensure the best deal—backed by personalised support, transparent terms, and exclusive cashback offers.

            Start your transition to renewable energy today—with Nexus Finance, you get<strong> extra savings on borrowing</strong>, expert advice, and a future powered by clean energy.
            </Typography>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
}
