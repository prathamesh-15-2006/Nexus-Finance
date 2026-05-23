import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Twitter,
  LinkedIn,
  Facebook,
  WhatsApp,
  Email,
} from "@mui/icons-material";
import { Helmet } from "react-helmet-async";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BlogBackground5 from "../../asset/ContactPage/commericalFinance/CommercialFinance5.webp";
import GraphImage from "../../asset/logo/Nexus-logo.png";
import { useTheme } from "../../contexts/ThemeContext";

const BLOG_URL =
  "https://www.Nexusnance.com.au/why-apr-matters-more-than-simple-interest-rates";

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

export default function Blogs5() {
  const { isDarkMode } = useTheme();

  const themeColors = {
    background: isDarkMode ? "#0f172a" : "#f9fafb",
    paperBg: isDarkMode ? "#1e293b" : "#ffffff",
    heading: isDarkMode ? "#38bdf8" : "#1e3c72",
    description: isDarkMode ? "rgba(255,255,255,0.75)" : "#555",
    textPrimary: isDarkMode ? "#fff" : "#111827",
    accent: isDarkMode ? "#fbbf24" : "#1e3c72", // gold / blue
  };

  // Facebook SDK
  useEffect(() => {
    if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src =
        "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0";
      document.body.appendChild(script);
      script.onload = () => window.FB && window.FB.XFBML.parse();
    } else {
      window.FB && window.FB.XFBML.parse();
    }
  }, [isDarkMode]);

  const handleShare = (platform) => {
    const url = encodeURIComponent(BLOG_URL);
    const text = encodeURIComponent(
      "Check out this blog: Why APR Matters More Than “Simple” Interest Rates"
    );
    let shareUrl = "";
    switch (platform) {
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${text}&body=${url}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Helmet>
        <title>Why APR Matters More Than “Simple” Interest Rates</title>
      </Helmet>

      <Box sx={{ background: themeColors.background, pb: 10, overflow: "hidden" }}>
        {/* Hero */}
        <Box
          sx={{
            height: { xs: 250, sm: 300, md: 400, lg: 500 },
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            textAlign: "center",
            mt: { xs: 10, sm: 15, md: 10 },
            px: { xs: 2, sm: 3, md: 4 },
            backgroundImage: `url(${BlogBackground5})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(0,0,0,0.55)",
            }}
          />
          {/* Back Button */}
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => window.history.back()}
            sx={{
              position: "absolute",
              top: { xs: 12, sm: 16, md: 32 },
              left: { xs: 12, sm: 16, md: 32 },
              fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
              px: { xs: 1.5, sm: 2 },
              py: { xs: 0.5, sm: 1 },
              color: "#fff",
              backgroundColor: "rgba(0,0,0,0.5)",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
            }}
          >
            Back
          </Button>

          <Box sx={{ position: "relative", zIndex: 2, px: { xs: 1, sm: 2, md: 3 } }}>
            <Typography
              variant="h3"
              textAlign="center"
              gutterBottom
              sx={{
                fontSize: { xs: "1.2rem", sm: "1.6rem", md: "2.2rem", lg: "2.8rem" },
                backgroundImage: cardGradient,
                backgroundSize: "200%",
                backgroundClip: "text",
                fontWeight: 800,
                textFillColor: "transparent",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: { xs: 2, sm: 3, md: 5 },
                lineHeight: { xs: 1.3, sm: 1.4, md: 1.5 },
              }}
            >
              Why APR Matters More Than “Simple” Interest Rates – Comparison between APR & Simple Interest
            </Typography>

          
          </Box>
        </Box>

        {/* Article intro */}
        <Container maxWidth="md" sx={{ mt: 6 }}>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              fontStyle: "italic",
              mb: 2,
              color: themeColors.description,
            }}
          >
            When it comes to business loans, not all interest rates are created equal. Many lenders advertise their products using a simple annual rate, which can make loans look cheaper than they actually are. At Nexusinance, we want our clients to understand the true cost of borrowing — that’s why we use the Annual Percentage Rate (APR) when quoting our loan pricing.
          </Typography>
          <Typography
            variant="h4"
            textAlign="center"
            gutterBottom
            sx={{
              backgroundImage: cardGradient,
              backgroundSize: "200%",
              backgroundClip: "text",
              fontWeight: 800,
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 5,
            }}
          >
            Why APR Matters More Than “Simple” Interest Rates – Comparison between APR & Simple Interest
          </Typography>
        </Container>

        {/* Sections */}
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  height: "100%",
                  borderLeft: `5px solid ${themeColors.accent}`,
                  borderRadius: 2,
                  backgroundColor: themeColors.paperBg,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    color: themeColors.heading,
                    fontFamily: "serif",
                  }}
                >
                  What’s the Difference Between APR and Simple Interest?
                </Box>
                <Typography
                  variant="body1"
                  sx={{ color: themeColors.description, lineHeight: 1.7 }}
                >
                  • APR (Annual Percentage Rate): APR is the interest rate expressed annually. It’s calculated by multiplying the rate charged at each repayment by the number of repayments in that year. This method gives you a realistic picture of what you’ll actually pay over the life of the loan.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: themeColors.description, lineHeight: 1.7, mt: 2 }}
                >
                  • Annual Simple Rate: The simple rate is typically shown as the total interest cost paid as a percentage of the loan amount, divided by the loan term in years. While it sounds straightforward, it often understates the true cost of credit because it doesn’t account for repayment frequency.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  height: "100%",
                  borderLeft: `5px solid ${themeColors.accent}`,
                  borderRadius: 2,
                  backgroundColor: themeColors.paperBg,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    color: themeColors.heading,
                    fontFamily: "serif",
                  }}
                >
                  Real Example: APR vs. Simple Rate
                </Box>
                <Typography
                  variant="body1"
                  sx={{ color: themeColors.description, lineHeight: 1.7 }}
                >
                  The below report highlights just how misleading “simple” rates can be: Loan Amount Term Quoted Rate Actual APR Fortnightly Repayment Total Cost of Credit Business loan with APR (As quoted by Nexusinance) $50,000 2 years 18.95% APR 18.95% APR $1,158 $10,252 Business loan with simple rate (Other lenders) $50,000 2 years 18.95% simple rate 33.55% APR $1,325 $18,891 📊 As shown in the chart below, the cost of the “simple rate” loan is almost double compared to the APR-based loan.
                </Typography>
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <img src={GraphImage} alt="APR vs Simple Rate Chart" style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  height: "100%",
                  borderLeft: `5px solid ${themeColors.accent}`,
                  borderRadius: 2,
                  backgroundColor: themeColors.paperBg,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    color: themeColors.heading,
                    fontFamily: "serif",
                  }}
                >
                  Why Nexusinance Uses APR
                </Box>
                <Typography
                  variant="body1"
                  sx={{ color: themeColors.description, lineHeight: 1.7 }}
                >
                  At Nexusinance, we quote using APR, not simple interest. This means: ✅ You get full transparency on the true cost of borrowing. ✅ You can compare loans on a like-for-like basis. ✅ You avoid the hidden traps of “low advertised rates” that balloon into higher repayments. We also provide amortisation schedules so you can clearly see how your repayments are structured over time.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  height: "100%",
                  borderLeft: `5px solid ${themeColors.accent}`,
                  borderRadius: 2,
                  backgroundColor: themeColors.paperBg,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    color: themeColors.heading,
                    fontFamily: "serif",
                  }}
                >
                  Final Thoughts
                </Box>
                <Typography
                  variant="body1"
                  sx={{ color: themeColors.description, lineHeight: 1.7 }}
                >
                  Knowing the true cost of your loan can save your business thousands of dollars. Don’t be misled by lenders advertising “simple” rates that don’t tell the full story. Always compare: • Loan amount • Term • Repayment structure • Fees At Nexusinance, our goal is to give you clarity and confidence when choosing finance — because better knowledge means better decisions. 📞 Have questions? Call us on 9370439566 or email info@NeNexusnce.com.au and we’ll walk you through your options.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        {/* Share */}
        <Divider sx={{ my: 6 }} />
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom fontFamily="serif">
            Share this blog:
          </Typography>
          {/* Social Share Icons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
              gap: 2,
            }}
          >
            <IconButton
              aria-label="share on Twitter"
              onClick={() =>
                window.open(`https://twitter.com/intent/tweet?url=${BLOG_URL}`)
              }
              sx={{
                color: "lightblue",
                "&:hover": { color: "#1DA1F2" }, // Twitter blue
              }}
            >
              <Twitter sx={{ fontSize: 40 }} />
            </IconButton>

            <IconButton
              aria-label="share on LinkedIn"
              onClick={() =>
                window.open(`https://www.linkedin.com/shareArticle?url=${BLOG_URL}`)
              }
              sx={{
                color: "lightblue",
                "&:hover": { color: "#0077b5" }, // LinkedIn blue
              }}
            >
              <LinkedIn sx={{ fontSize: 40 }} />
            </IconButton>

            <IconButton
              aria-label="share on Facebook"
              onClick={() =>
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${BLOG_URL}`)
              }
              sx={{
                color: "lightblue",
                "&:hover": { color: "#1877F2" }, // Facebook blue
              }}
            >
              <Facebook sx={{ fontSize: 40 }} />
            </IconButton>

            <IconButton
              aria-label="share on WhatsApp"
              onClick={() =>
                window.open(`https://api.whatsapp.com/send?text=${BLOG_URL}`)
              }
              sx={{
                color: "lightblue",
                "&:hover": { color: "#25D366" }, // WhatsApp green
              }}
            >
              <WhatsApp sx={{ fontSize: 40 }} />
            </IconButton>

            <IconButton
              aria-label="share via Email"
              onClick={() =>
                window.open(`mailto:?subject=Check this blog&body=${BLOG_URL}`)
              }
              sx={{
                color: "lightblue",
                "&:hover": { color: "#0a66c2" }, // Darker email blue
              }}
            >
              <Email sx={{ fontSize: 40 }} />
            </IconButton>
          </Box>
        </Container>
        <Divider sx={{ my: 6 }} />

        {/* Comments */}
        <Container maxWidth="md">
          <Typography variant="h6" gutterBottom sx={{ color: themeColors.textPrimary, fontFamily: "serif" }}>
            Leave a Comment
          </Typography>
          <div
            className="fb-comments"
            data-href={BLOG_URL}
            data-width="100%"
            data-numposts="5"
            data-colorscheme={isDarkMode ? "dark" : "light"}
          ></div>
        </Container>
      </Box>
    </>
  );
}
