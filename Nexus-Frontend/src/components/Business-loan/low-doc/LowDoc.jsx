import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Button,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { useTheme } from '../../../contexts/ThemeContext';
import bgimage from '../../../asset/bgimgs/image.webp';
import FaqSection from "./Faq";

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";


const featuresData = [
  {
    title: "Key Features:",
    points: ["Borrow from $5,000 to $250,000", "Interest rates starting from 7.75% p.a.", "Repay on your terms: Daily, Weekly, or Fortnightly", "Approval time: Same Day, with funds available in 12-24 Business hours", "Options for secured and unsecured loans"]
  },
  {
    title: "What Are Low Doc Business Loans?",
    description: "Low Doc Business Loans are specially designed for those who need quick access to business capital but may lack the financial documentation required by traditional lenders. With Nexus Finance, you can apply for a loan without providing extensive tax returns or financial statements. This makes Low Doc loans perfect for businesses facing cash flow challenges or looking to seize growth opportunities quickly.",
  },
  {
    title: "Who Can Benefit?",
    description: "These loans are ideal for:",
    points: ["Startups and new businesses", "Self-employed individuals and sole traders", "Small businesses needing urgent funding for inventory, wages, or working capital", "Companies looking to expand or renovate business premises"]
  },
  {
    title: "Easy Application Process: Minimum Documentation Required",
    description: "Forget lengthy applications! To apply for a Low Doc loan, all you need is:",
    points: ["Last 6 months of bank statements", "Valid ID"],
    description2: "With these basic documents, you can enjoy fast approval and funding, helping your business thrive without the hassle.",
  }
];

const points1 = [
  "Purchasing stock or equipment",
  "Expanding your business or opening a new location",
  "Covering wages or rent during lean times",
  "Meeting tax or BAS payments",
  "Renovating your office or workspace",
];

const points2 = [
  "Fast Approval: Get approval within 59 minutes and access funds in 12-24 business hours.",
  "Minimal Paperwork: No need for complicated financials, just basic bank statements and ID.",
  "Flexible Repayments: Choose from daily, weekly, or fortnightly repayments to suit your cash flow.",
  "Secure or Unsecured Options: Choose a loan type that best fits your business needs.",
];

const faqs = [
  {
    question: '1. What is a Low Doc Business Loan?',
    answer: 'A Low Doc Business Loan offers quick access to capital without needing extensive financial documentation like tax returns or detailed financials. This is ideal for small businesses, startups, or self-employed individuals.',
  },
  {
    question: '2. How much can I borrow?',
    answer: 'You can borrow between $5,000 and $250,000.',
  },
  {
    question: '3. What documents are required?',
    answer: 'You only need the last 6 months of bank statements and a valid ID. In some cases, you may be required to provide 12 months of Bank Statements. (depending on Lender’s discretion)',
  },
  {
    question: '4. How long does approval take?',
    answer: 'Approval can be as fast as same-day, with funds available within 12-24 business hours.',
  },
  {
    question: '5. What are the repayment terms?',
    answer: 'Repayments can be daily, weekly, or fortnightly, depending on what suits your business.',
  },
  {
    question: '6. What can I use the loan for?',
    answer: 'You can use Low Doc loans for various purposes, including purchasing stock, paying wages, renovating business premises, or covering urgent working capital needs.',
  },
  {
    question: '7. What is the interest rate?',
    answer: 'Interest rates start at 7.75% p.a., varying based on loan amount and terms.',
  },
  {
    question: '8. Is the loan secured or unsecured?',
    answer: 'You can choose between secured and unsecured loan options, depending on your preference and business situation.',
  },
  {
    question: '9. Are there any restrictions on who can apply?',
    answer: 'Low Doc loans are available for startups, self-employed individuals, and small businesses that may not meet traditional lending criteria.',
  },
  {
    question: '10. How do I apply?',
    answer: 'You can apply by submitting the required documentation through our online portal or speaking with a Nexus Finance expert to start your application. Same-day approval is possible!',
  },
  {
    question: '11. Are there any upfront costs?',
    answer: 'Costs and fees will depend on the terms of your loan. It\'s best to speak with a loan advisor for personalized information.',
  },
  {
    question: '12. Can I pay off my loan early?',
    answer: 'Yes, many Low Doc loans allow for early repayment, though conditions may apply. Always review your loan agreement for specific terms.',
  },
  {
    question: '13. What happens if I miss a repayment?',
    answer: 'It\'s important to communicate with your loan provider immediately if you\'re at risk of missing a payment. They may offer options to adjust the repayment schedule, but missing payments could result in penalties or fees. For further assistance or questions, feel free to Contact Us.',
  },
];

const GradientBullet = ({ color1 = "black" }) => (
  <FiberManualRecordIcon
    sx={{
      fontSize: 10,
      background: `#727D73`,
      borderRadius: "50%",
    }}
  />
);

export default function HeroSection() {
  const { isDarkMode } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Dynamic colors based on theme
  const primaryTextColor = isDarkMode ? '#ffffff' : '#0d47a1';
  const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

  const secondaryTextColor = isDarkMode ? '#e0e0e0' : '#424242';
  const cardBackground = isDarkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.9)';
  const sectionBackground = isDarkMode ? '#121212' : '#f5f5f5';
  const paperBackground = isDarkMode ? '#1e1e1e' : '#ffffff';
  const borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const textColor = isDarkMode ? '#ffffff' : '#333333';
  const subtleBackground = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

  // Dynamic styles for the banner text based on theme
  const bannerTextStyle = {
    fontWeight: 800,
    fontSize: { xs: "2.5rem", md: "4rem" },
    lineHeight: 1.2,
    mb: 2,
    backgroundImage: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
    backgroundClip: "text",
    textFillColor: "transparent",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    WebkitTextStroke: isDarkMode ? '1px #000000' : '1px #ffffff',
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "110vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundImage: `url(${bgimage})`,
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
              Simple Low Doc Business Loan 
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
              Fast, Flexible Business Financing with Minimal Documentation
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

      {/* New UI for the hero section content with left info and right image */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          px: 2,
          background: 'transparent', // Removed background color
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center" justifyContent="center">

            {/* Main content grid item, now full width on desktop */}
            <Grid item xs={12} md={12}>
              
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
                                                       mb: 5,
                                                     }}
                                                   >
                                                                      Low Doc Business Loans: Flexible Financing for 

                                                   </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: isDarkMode ? '1px #000000' : '1px #ffffff',
                    fontSize: { xs: "1rem", md: "1.3rem" },
                    lineHeight: 1.8,
                    mb: 4,
                  }}
                >
                  Looking for business funding without extensive paperwork? Nexus Finance offers <strong>Low Doc Business Loans</strong> designed for self-employed individuals, startups, and small businesses in oans allow you to borrow up to <strong>$250,000</strong> with minimal documentation and flexible repayment options. Enjoy <strong>same-day approval</strong> and loan terms of up to <strong>36 months.</strong>. Whether it’s for <strong>working capital, buying stock</strong>, or <strong>expansion</strong>, our Low Doc loans provide fast and accessible solutions to meet your financial needs.
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    justifyContent: "center", // Centered buttons
                  }}
                >
                  <Button
                                        onClick={() => window.open('/?openInquiry=business', '_blank')}

                    variant="contained"
                    sx={{
                      background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
                      fontSize: "1rem",
                      px: 4,
                      py: 1.5,
                      borderRadius: "8px",
                      "&:hover": {
                        background: "linear-gradient(90deg, #059669 0%, #2563eb 50%, #059669 100%)",
                        transform: "scale(1.05)",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    Apply Now
                  </Button>
                 
                </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* New section with cards */}
      <Box
        sx={{
          width: "100%",
          py: 6,
        }}
      >
        <Container maxWidth={false} sx={{ py: 6 }}>
          <Grid
            container
            spacing={4}
            justifyContent="center"
            sx={{ flexWrap: "wrap" }}
          >
            {featuresData.map((card, index) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: 500,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: 3,
                    background: cardBackground,
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    border: `1px solid ${borderColor}`,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: 8,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                     <Typography
                                                                                   textAlign="center"
                                                                                   gutterBottom
                                                                                   sx={{
                                                                                     backgroundImage: cardGradient,
                                                                                     backgroundSize: "200%",
                                                                                     fontSize: { xs: "1.3rem", sm: "1.4rem", md: "1.55rem" },
                                                                                     fontWeight: 700,
                                                                                     backgroundClip: "text",
                                                                                     textFillColor: "transparent",
                                                                                                                                            fontWeight:800,

                                                                                     WebkitBackgroundClip: "text",
                                                                                     WebkitTextFillColor: "transparent",
                                                                                     mb: 3,
                                                                                   }}
                                                                                 >
                    {card.title}
                                                                                 </Typography>
                            

                    {card.description && (
                      <Typography variant="body2" color={secondaryTextColor} sx={{ mb: 2, fontSize: { xs: "16px", sm: "17px", md: "18px" } }}>
                        {card.description}
                      </Typography>
                      )}

                    {card.points && card.points.length > 0 && (
                      <List dense>
                        {card.points.map((item, i) => (
                          <ListItem key={i} disablePadding>
                            <ListItemIcon sx={{ minWidth: 20 }}>
                              <GradientBullet />
                            </ListItemIcon>
                            <ListItemText
                              primary={item}
                              primaryTypographyProps={{
                                sx: { color: secondaryTextColor, fontSize: { xs: "16px", sm: "17px", md: "18px" } }
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                      )}

                    {card.description2 && (
                      <Typography variant="body2" color={secondaryTextColor} sx={{ mt: 2, fontSize: { xs: "16px", sm: "17px", md: "18px" } }}>
                        {card.description2}
                      </Typography>
                      )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Forth section */}

      <Box sx={{ p: { xs: 3, md: 6 }, background: 'transparent' }}> {/* Removed background color */}
        {/* Section 1 */}
        <Box sx={{ mb: 8 }}>
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
                                                       mb: 5,
                                                     }}
                                                   >
                      Common Uses for Low Doc Business Loans

                                                   </Typography>


          <Grid container spacing={3} justifyContent="center">
            {points1.map((point, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    backgroundColor: cardBackground,
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 4px 12px 0 rgba(31, 38, 135, 0.2)",
                    position: "relative",
                    zIndex: 1,
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: -1,
                      borderRadius: "inherit",
                      padding: "2px",
                      background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    },
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 8px 24px 0 rgba(31, 38, 135, 0.3)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      backgroundColor: (theme) => theme.palette.primary.main,
                      borderRadius: "50%",
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="body1" color={secondaryTextColor}>{point}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Section 2 */}
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
        }}>
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
                                                                          Advantages of Low Doc Business Loans


                                                   </Typography>



          <Grid container spacing={4} justifyContent="center" sx={{ px: 2 }}>
            {points2.slice(0, 4).map((point, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    position: "relative",
                    width: "250px",
                    height: "280px",
                    margin: "0 auto",
                    perspective: "1000px",
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      borderRadius: "20px",
                      background: `linear-gradient(135deg,
                        ${index === 0 ? '#2563eb 0%, #667eea 100%' : ''}
                        ${index === 1 ? '#059669 0%, #43e97b 100%' : ''}
                        ${index === 2 ? '#2563eb 0%, #4facfe 100%' : ''}
                        ${index === 3 ? '#059669 0%, #38f9d7 100%' : ''})`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 3,
                      cursor: "pointer",
                      transition: "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      transformStyle: "preserve-3d",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      "&:hover": {
                        transform: "rotateY(15deg) rotateX(15deg) translateY(-20px)",
                        boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
                        background: `linear-gradient(135deg,
                          ${index === 0 ? '#667eea 0%, #2563eb 100%' : ''}
                          ${index === 1 ? '#43e97b 0%, #059669 100%' : ''}
                          ${index === 2 ? '#4facfe 0%, #2563eb 100%' : ''}
                          ${index === 3 ? '#38f9d7 0%, #059669 100%' : ''})`,
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: "20px",
                        background: "rgba(255,255,255,0.1)",
                        backdropFilter: "blur(20px)",
                        zIndex: 1,
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: "-2px",
                        left: "-2px",
                        right: "-2px",
                        bottom: "-2px",
                        borderRadius: "20px",
                        background: `linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)`,
                        zIndex: -2,
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                      },
                      "&:hover::after": {
                        opacity: 1,
                        animation: "shine 1.5s infinite",
                      },
                      "@keyframes shine": {
                        "0%": { transform: "translateX(-100%) translateY(-100%)" },
                        "100%": { transform: "translateX(100%) translateY(100%)" },
                      },
                    }}
                  >

                    <Box
                      sx={{
                        position: "relative",
                        zIndex: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.2) rotate(360deg)",
                            background: "rgba(255,255,255,0.3)",
                          },
                        }}
                      >
                        <CheckCircleIcon sx={{
                          color: "#fff",
                          fontSize: "35px",
                          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                        }} />
                      </Box>

                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "18px",
                          fontWeight: 600,
                          color: "#fff",
                          lineHeight: 1.4,
                          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                          maxWidth: "200px",
                        }}
                      >
                        {point}
                      </Typography>

                      <Box
                        sx={{
                          position: "absolute",
                          bottom: "20px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "40px",
                          height: "2px",
                          background: "rgba(255,255,255,0.5)",
                          borderRadius: "1px",
                          transition: "all 0.3s ease",
                        }}
                      />
                    </Box>
                  </Paper>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* New Responsive Cards Section */}
      {/* <Box sx={{ 
        py: { xs: 6, md: 10 }, 
        px: 2, 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        <Container maxWidth="lg">
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
              WebkitTextFillColor: "transparent",
              fontWeight: 800,
              mb: 6,
            }}
          >
            Why Choose Our Low Doc Loans
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast Approval",
                description: "Get approved within 59 minutes with our streamlined application process. Same-day funding available for urgent business needs.",
                color: "#FF6B6B"
              },
              {
                icon: "📄",
                title: "Minimal Documentation",
                description: "Only 6 months bank statements + ID required. No tax returns, no financial statements, no hassle.",
                color: "#4ECDC4"
              },
              {
                icon: "💰",
                title: "Flexible Amounts",
                description: "Borrow from $5,000 to $250,000 with customizable repayment terms that match your cash flow.",
                color: "#45B7D1"
              },
              {
                icon: "🎯",
                title: "Tailored Solutions",
                description: "Secured or unsecured options available. Daily, weekly, or fortnightly repayments to suit your business.",
                color: "#96CEB4"
              }
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                      background: 'rgba(255, 255, 255, 0.95)',
                    },
                  }}
                >
                  <CardContent sx={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    textAlign: 'center',
                    p: 4
                  }}>
                    <Box
                      sx={{
                        fontSize: '3rem',
                        mb: 2,
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{
                        fontWeight: 700,
                        color: item.color,
                        mb: 2,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6,
                        fontSize: '1rem',
                      }}
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                        color: 'white',
                        fontWeight: 600,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        '&:hover': {
                          background: `linear-gradient(135deg, ${item.color}dd, ${item.color})`,
                        },
                      }}
                    >
                      Learn More
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box> */}

      {/* Faq Page */}

      <FaqSection/>
      
    </>
  );
}
