import React from "react";
import {
  Box,
  Typography,
  useTheme,
  Grid,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTheme as useAppTheme } from "../../../contexts/ThemeContext";
const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";


// 🔹 Define gradientBorder variable here so it's always available
const gradientBorder =
  "linear-gradient(90deg, #3264c1, #24a6ddff, #29aa95ff)";

const cardData = [
  {
    title: "Who’s Eligible?",
    items: [
      "Active ABN",
      "Minimum 12 months of trading",
      "Monthly turnover of $10,000 or more",
    ],
  },
  {
    title: "What You Can Use It For:",
    items: [
      "Purchasing inventory",
      "Paying staff and operational costs",
      "Covering marketing or ad campaigns",
      "Managing seasonal cash flow dips",
    ],
  },
  {
    title: "Loan Features:",
    items: [
      "Loan Amount: $10,000 to $10M",
      "Term: Up to 5 years",
      "Repayments: Weekly, fortnightly, or monthly",
      "Security: Required for larger loans",
    ],
  },
  {
    title: "Documents Required:",
    items: [
      "Low-Doc: Last 6 months’ bank statements & valid ID",
      "Full-Doc: Financials, ATO statements, or other lender documents",
    ],
  },
  {
    title: "Types of Business Lines of Credit",
    items: [
      "Revolving LOC: Flexible access with reuse option",
      "Non-Revolving LOC: One-time use; ideal for planned expenses",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, when: "beforeChildren" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const BenefitsCard = () => {
  const theme = useTheme();
  const { isDarkMode } = useAppTheme();

  return (
    <Box
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 4 },
        backgroundColor: isDarkMode
          ? theme.palette.grey[900]
          : theme.palette.grey[50],
        transition: "background-color 0.3s ease",
      }}
    >
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
                                                       mb: 5,
                                                     }}
                                                   >
                                                    Unsecured Business Loan Detail
                                                   </Typography>
     

      <Grid container spacing={4} justifyContent="center">
        {cardData.map((card, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            key={index}
            display="flex"
            justifyContent="center"
            component={motion.div}
            variants={cardVariants}
          >
            <Box
              sx={{
                height: "100%",
                width: "100%",
                p: "2px",
                position: "relative",
                borderRadius: "2rem 0.5rem 2rem 0.5rem", // unique shape
                background: gradientBorder,
                backgroundSize: "300% 300%",
                animation: "borderShift 6s ease infinite",
                boxShadow: isDarkMode
                  ? "0 15px 40px rgba(0,0,0,0.4)"
                  : "0 15px 40px rgba(0,0,0,0.15)",
                "&:hover": {
                  transform: "translateY(-10px) rotate(-1deg)",
                  transition: "all 0.4s ease",
                },
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: isDarkMode
                    ? "rgba(20, 20, 20, 0.7)"
                    : "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(16px)",
                  borderRadius: "2rem 0.5rem 2rem 0.5rem",
                  padding: "2rem",
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                <Typography
  variant="h6"
  sx={{
    fontWeight: 700,
    mb: 3,
    background: isDarkMode ? gradientBorder : "none",
    WebkitBackgroundClip: isDarkMode ? "text" : "unset",
    WebkitTextFillColor: isDarkMode ? "transparent" : "black",
    color: !isDarkMode ? "#ffffff" : "inherit", // fallback for non-WebKit
    fontFamily: "'Poppins', sans-serif",
    fontSize: "1.3rem",
    letterSpacing: "0.5px",
  }}
>
                    {card.title}
                  </Typography>

                  <List dense>
                    {card.items.map((item, idx) => (
                      <ListItem
                        key={idx}
                        disableGutters
                        sx={{
                          justifyContent: "center",
                          mb: 1,
                        }}
                      >
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{
                            fontSize: "1rem",
                            color: isDarkMode
                              ? theme.palette.common.white
                              : theme.palette.text.primary,
                            textAlign: "center",
                            lineHeight: 1.6,
                            fontWeight: 400,
                            // fontFamily: "'Poppins', sans-serif",
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <style>{`
        .animated-gradient-text {
          background: ${gradientBorder};
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: animatedGradient 6s ease infinite;
        }
        @keyframes animatedGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes borderShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </Box>
  );
};

export default BenefitsCard;
