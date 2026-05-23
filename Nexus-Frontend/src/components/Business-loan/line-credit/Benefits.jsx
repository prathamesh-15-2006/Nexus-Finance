import React from "react";
import { Box, Typography, Grid, useTheme as useMuiTheme } from "@mui/material";
import { useTheme } from "../../../contexts/ThemeContext";
import CampaignIcon from "@mui/icons-material/Campaign";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { motion } from "framer-motion";
const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";


const benefitSteps = [
  {
    id: 1,
    title: "Fast Decisions",
    description: "Approval in less than 59 minutes",
    icon: <CampaignIcon fontSize="large" />,
  },
  {
    id: 2,
    title: "Quick Funding",
    description: "Receive funds in 12–24 business hours",
    icon: <TrendingUpIcon fontSize="large" />,
  },
  {
    id: 3,
    title: "Low-Doc Options",
    description: "Borrow up to $250,000 with minimal paperwork",
    icon: <StorefrontIcon fontSize="large" />,
  },
  {
    id: 4,
    title: "Affordable Rates",
    description: "Interest starting from 7.95% p.a.",
    icon: <AccountBalanceWalletIcon fontSize="large" />,
  },
];

// Animation containers
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25 },
  },
};


const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Benefits = () => {
  const { isDarkMode } = useTheme();
  const muiTheme = useMuiTheme();

  const gradientText = {
    background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textFillColor: "transparent",
  };

  const boxShadowColor = isDarkMode ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.15)";
  const badgeBackground = isDarkMode
    ? muiTheme.palette.background.default
    : "#fff";

  return (
    <Box
      sx={{
        py: { xs: 5, sm: 6, md: 10 },
        px: { xs: 2, sm: 4, md: 6 },
        background: isDarkMode ? "#121212" : "#f8f8f8",
        color: isDarkMode ? "#e0e0e0" : "#222",
        // transition: "background 0.3s ease, color 0.3s ease",
        userSelect: "none",
      }}
      // component={motion.div}
      // initial="hidden"
      // animate="visible"
      // variants={containerVariants}
    >
      {/* Heading */}
           <Typography
                                               variant="h3"
                                               textAlign="center"
                                               gutterBottom
                                               sx={{
                                                 backgroundImage: cardGradient,
                                                 backgroundSize: "200%",
                                                                                    fontWeight:800,

                                                 backgroundClip: "text",
                                                 textFillColor: "transparent",
                                                 WebkitBackgroundClip: "text",
                                                 WebkitTextFillColor: "transparent",
                                                 mb: 5,
                                               }}
                                             >
                                              Key Benefits
                                             </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        gutterBottom
        fontWeight={500}
        sx={{  opacity: 0.9, mb: { xs: 4, sm: 6 } }}
      >
        Unlock the advantages of smarter finance
      </Typography>

      {/* Cards */}
      <Box>
        {benefitSteps.map((step, index) => {
          const isEven = index % 2 === 1;

          return (
            <Grid
              container
              key={step.id}
              justifyContent="center"
              alignItems="center"
              direction={{ xs: "column", sm: isEven ? "row-reverse" : "row" }}
              sx={{
                mb: { xs: 4, sm: 6, md: 8 },
                px: { xs: 0, sm: 2 },
              }}
              component={motion.div}
              variants={stepVariants}
            >
              <Grid
                item
                xs={12}
                sm={10}
                md={8}
                sx={{
                  maxWidth: 900,
                  mx: "auto",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                    justifyContent: "flex-start",
                    gap: { xs: 2, sm: 3 },
                    transform: {
                      xs: "translateX(0)",
                      sm: isEven ? "translateX(15px)" : "translateX(-15px)",
                      md: isEven ? "translateX(20px)" : "translateX(-20px)",
                    },
                    background: cardGradient,
                    color: "#fff",
                    borderRadius: 3,
                    px: { xs: 3, md: 4 },
                    py: { xs: 3, md: 4 },
                    boxShadow: `0 10px 20px ${boxShadowColor}`,
                    position: "relative",
                    minHeight: { xs: 160, sm: 180, md: 200 }, // equal height
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: {
                        xs: "translateX(0) scale(1.02)",
                        sm: isEven
                          ? "translateX(25px) scale(1.05)"
                          : "translateX(-25px) scale(1.05)",
                        md: isEven
                          ? "translateX(30px) scale(1.05)"
                          : "translateX(-30px) scale(1.05)",
                      },
                      boxShadow: `0 14px 30px ${boxShadowColor}`,
                    },
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      zIndex: 2,
                      fontSize: { xs: "2rem", md: "3rem" },
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minWidth: { xs: "auto", sm: 60 },
                      flexShrink: 0,
                    }}
                  >
                    {step.icon}
                  </Box>

                  {/* Text */}
                  <Box sx={{ zIndex: 2, flex: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{
                        color: "#fff",
                        mb: 0.5,
                        fontSize: { xs: "1.1rem", md: "1.25rem" },
                      }}
                    >
                      {step.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.85)",
                        fontSize: { xs: "0.9rem", md: "1rem" },
                      }}
                    >
                      {step.description}
                    </Typography>
                  </Box>

                  {/* Number Badge */}
                  <Box
                    sx={{
                      position: "absolute",
                      right: isEven ? "auto" : { xs: -40, md: -48 },
                      left: isEven ? { xs: -40, md: -48 } : "auto",
                      top: "50%",
                      transform: "translateY(-50%) rotate(45deg)",
                      backgroundColor: badgeBackground,
                      width: { xs: 36, md: 44 },
                      height: { xs: 36, md: 44 },
                      zIndex: 3,
                      boxShadow: `0 4px 8px ${boxShadowColor}`,
                      borderRadius: 2,
                      display: { xs: "none", sm: "flex" },
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      color: "#10b981",
                      userSelect: "none",
                      cursor: "default",
                      fontSize: { xs: "0.85rem", md: "1rem" },
                    }}
                  >
                    <Box sx={{ transform: "rotate(-45deg)" }}>
                      {String(step.id).padStart(2, "0")}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          );
        })}
      </Box>
    </Box>
  );
};

export default Benefits;
