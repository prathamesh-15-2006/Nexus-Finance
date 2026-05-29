import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  CssBaseline,
  useTheme as useMuiTheme,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTheme as useCustomTheme } from "../../../../src/contexts/ThemeContext";

import heroImage from '../../../asset/Overdraft/Banner2.webp'
import fact1 from '../../../asset/Overdraft/banner.webp';
import fact2 from '../../../asset/Overdraft/i2.webp';
import fact3 from '../../../asset/Overdraft/i3.webp';
import fact4 from '../../../asset/Overdraft/i4.webp';
import fact5 from '../../../asset/Overdraft/image.webp';

import feature1 from '../../../asset/Overdraft/Banner2.webp';
import feature2 from '../../../asset/Overdraft/i2.webp';
import feature3 from '../../../asset/Overdraft/i5.webp';


const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

const containerVariants = {
  visible: { transition: { staggerChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const quickFacts = [
  { title: "Decision in less than 59 minutes", image: fact1 },
  { title: "Disbursement in 12-24 Business Hours", image: fact2 },
  { title: "Low Doc Loans up to $500,000", image: fact3 },
  { title: "Interest Rates start from 7.75%", image: fact4 },
  { title: "Nexus Finance = Extra Savings", image: fact5 },
];

const keyFeatures = [
  {
    title: "Flexible Access to Funds",
    content:
      "Enjoy ongoing access to extra capital, helping to cover cash flow shortfalls. Our flexible terms are designed to support your business's unique rhythm and growth.",
    image: feature1,
  },
  {
    title: "Interest Only on Utilised Amount",
    content:
      "You only pay interest on the amount you actually use, calculated daily for maximum cost efficiency. This ensures you're never paying for capital you don't need.",
    image: feature2,
  },
  {
    title: "Secured & Unsecured Options",
    content:
      "Choose between secured and unsecured loan options to best fit your business's needs. Secured options offer lower rates, while unsecured loans provide flexibility up to $250,000.",
    image: feature3,
  },
];



function BusinessOverdraftPage() {
  const muiTheme = useMuiTheme();
  const { isDarkMode } = useCustomTheme();

  return (
    <Box
      sx={{
        background: isDarkMode
          ? "linear-gradient(to bottom, #121212, #1e1e1e)"
          : "linear-gradient(to bottom, #f9f9f9, #ffffff)",
        color: "text.primary",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />

      {/* HERO SECTION */}
      <Box
        sx={{
          position: "relative",
          height: "110vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(0,0,0,0.3))",
            zIndex: 1,
          },
        }}
      >
        <Container sx={{ position: "relative", zIndex: 2 }}>
          <Box
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(8px)",
              borderRadius: "20px",
              padding: "40px",
              display: "inline-block",
              maxWidth: "10000px",
              margin: "0 auto",
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: "2.25rem", sm: "3rem" },
                fontWeight: 700,
                mb: 5,
                textAlign: "center",
                background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Flexible Business Overdraft Options 
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "#ffffff",
                maxWidth: 800,
                mx: "auto",
                opacity: 0.9,
                mb: 4,
              }}
            >
              Business Overdraft - Flexible Financial Support for Your Business Growth
            </Typography>
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button
                                   onClick={() => window.open('/?openInquiry=business', '_blank')}

                variant="contained"
                size="large"
                sx={{
                  background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
                  color: 'white',
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  borderRadius: '50px',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Apply Now
              </Button>
            </Box>
          </Box>
        </Container>

        <style>
          {`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeInDown {
              from { opacity: 0; transform: translateY(-20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
      </Box>

      {/* QUICK FACTS SECTION */}
      <Container sx={{ py: 12 }}>
        <Typography
          variant="h3"
          textAlign="center"
          gutterBottom
          sx={{
            backgroundImage: cardGradient,
            backgroundSize: "200%",
            backgroundClip: "text",
            fontWeight:800,
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 8,
          }}
        >
          Quick Facts
        </Typography>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid container spacing={4} justifyContent="center">
            {quickFacts.slice(0, 3).map((item, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <motion.div variants={itemVariants}>
                  <Box
                    sx={{
                      width: 250,
                      height: 250,
                      borderRadius: "50%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      mx: "auto",
                      p: 2,
                      backgroundColor: muiTheme.palette.background.paper,
                      boxShadow: muiTheme.shadows[4],
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: muiTheme.shadows[8],
                      },
                      border: `1px solid ${muiTheme.palette.divider}`,
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: 90,
                          height: 90,
                          borderRadius: "50%",
                        }}
                      />
                    </Box>
                    <Typography variant="body1" fontWeight={700} sx={{ mt: 1 }}>
                      {item.title}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
            {quickFacts.slice(3, 5).map((item, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <motion.div variants={itemVariants}>
                  <Box
                    sx={{
                      width: 250,
                      height: 250,
                      borderRadius: "50%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      mx: "auto",
                      p: 2,
                      backgroundColor: muiTheme.palette.background.paper,
                      boxShadow: muiTheme.shadows[4],
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: muiTheme.shadows[8],
                      },
                      border: `1px solid ${muiTheme.palette.divider}`,
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: 90,
                          height: 90,
                          borderRadius: "50%",
                        }}
                      />
                    </Box>
                    <Typography variant="body1" fontWeight={700} sx={{ mt: 1 }}>
                      {item.title}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* KEY FEATURES */}
      <Box
        sx={{
          background: isDarkMode
            ? "linear-gradient(to top, #1a1a1a, #121212)"
            : "linear-gradient(to top, #e4e7ea, #f4f6f8)",
          py: 12,
        }}
      >
        <Container>
          <Typography
            variant="h3"
            textAlign="center"
            gutterBottom
            sx={{
              backgroundImage: cardGradient,
              backgroundSize: "200%",
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
                          fontWeight:800,

              WebkitTextFillColor: "transparent",
              mb: 10,
            }}
          >
            Key Features & Benefits
          </Typography>
          {keyFeatures.map((item, index) => (
            <Grid
              container
              spacing={6}
              key={index}
              direction={index % 2 === 0 ? "row" : "row-reverse"}
              alignItems="center"
              sx={{ mb: 10 }}
            >
              <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
                <motion.img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    maxWidth: 500,
                    borderRadius: "16px",
                    boxShadow: muiTheme.shadows[4],
                  }}
                  whileHover={{ scale: 1.03, boxShadow: muiTheme.shadows[8] }}
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -50 : 50,
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  textAlign: {
                    xs: "center",
                    md: index % 2 === 0 ? "left" : "right",
                  },
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
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
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: isDarkMode ? "#ffffff" : "#000000",
                      fontSize: "1.1rem",
                      maxWidth: 500,
                      mx: "auto",
                    }}
                  >
                    {item.content}
                  </Typography>
                </motion.div>
              </Grid>
            </Grid>
          ))}
        </Container>
      </Box>
    </Box>
  );
}

export default BusinessOverdraftPage;
