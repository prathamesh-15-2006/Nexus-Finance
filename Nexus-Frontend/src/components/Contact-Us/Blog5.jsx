import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  IconButton,
  Divider,
  Button
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
import BlogBackground1 from "../../asset/ContactPage/blog3/blog1.webp";
import BlogBackground2 from "../../asset/ContactPage/blog3/blog2.webp";
import BlogBackground3 from "../../asset/ContactPage/blog3/blog3.webp";
import { useTheme } from "../../contexts/ThemeContext";

const BLOG_URL =
  "https://www.Nexusfinance.com.au/perks-of-secure-business-loan-sydney-nsw";

  const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

export default function BlogPage() {
  const { isDarkMode } = useTheme();

  const themeColors = {
    background: isDarkMode
      ? "#0f172a"
      : "#f9fafb",
    paperBg: isDarkMode ? "#1e293b" : "#ffffff",
    heading: isDarkMode ? "#38bdf8" : "#1e3c72",
    description: isDarkMode ? "rgba(255,255,255,0.75)" : "#555",
    textPrimary: isDarkMode ? "#fff" : "#111827",
    accent: isDarkMode ? "#fbbf24" : "#1e3c72", // gold / blue
  };

  const [currentImage, setCurrentImage] = useState(0);
  const heroImages = [BlogBackground1, BlogBackground2, BlogBackground3];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const sections = [
    {
      heading: " Higher Loan Amounts",
      description:
        "One of the most attractive benefits of a secure business loan in Sydney, NSW, AU, is access to higher loan amounts. Since the loan is backed by collateral such as property, vehicles, or business equipment, lenders are more confident and typically offer significantly more capital than with unsecured loans.",
    },
    {
      heading: "Lower Interest Rates",
      description:
        "Compared to an unsecured business loan in Sydney, NSW, AU, secure loans often come with more favorable interest rates. Because there's less risk to the lender, they’re able to offer better terms that reduce your repayment stress and long-term financial burden.",
    },
    {
      heading: "Flexible Repayment Terms",
      description:
        "Secure business loans often include more flexible repayment plans that align with your business’s cash flow. This flexibility can include longer loan terms or seasonal repayment schedules, giving your company more room to grow without immediate financial pressure.",
    },
    {
      heading: " Easier Approval Process",
      description:
        "Many lenders, including Nexus Finance, offer quicker and simpler approval processes for secure loans. If you provide acceptable collateral and meet general lending criteria, your application is more likely to be approved, perfect for businesses needing timely funds.",
    },
    {
      heading: "Builds Business Credit",
      description:
        "Successfully repaying a secure business loan in Sydney, NSW, AU, is a smart strategy for building your business credit profile. A strong credit history increases your borrowing power in the future and opens doors to better loan options and financing terms down the road.",
    },
    {
      heading: " Support for Diverse Business Needs",
      description:
        "Whether you’re looking for capital to invest in inventory, upgrade technology, or cover daily expenses, secure loans can be adapted to suit a variety of business needs. For businesses requiring more agile solutions, reliable overdrafts from Nexus Finance offer another layer of financial support.",
    },
  ];

  const handleShare = (platform) => {
    const url = encodeURIComponent(BLOG_URL);
    const text = encodeURIComponent(
      "Check out this blog: Top 6 Perks of a Secure Business Loan in Sydney NSW"
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

  return (
    <>
      <Helmet>
        <title>Top 6 Perks of a Secure Business Loan in Sydney NSW</title>
      </Helmet>

      <Box sx={{ background: themeColors.background, pb: 10 ,overflow: "hidden",}}>
        {/* Hero */}
        <Box
  sx={{
    height: { xs: 250, sm: 300, md: 400, lg: 500 }, // scale hero height
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    textAlign: "center",
    mt: { xs: 10, sm: 15, md: 10 }, // adjust top spacing
    px: { xs: 2, sm: 3, md: 4 }, // responsive padding
  }}
>
  {heroImages.map((img, idx) => (
    <Box
      key={idx}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "opacity 1s ease-in-out",
        opacity: currentImage === idx ? 1 : 0,
      }}
    />
  ))}

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
        fontSize: { xs: "1.2rem", sm: "1.6rem", md: "2.2rem", lg: "2.8rem" }, // responsive text size
        backgroundImage: cardGradient,
        backgroundSize: "200%",
        backgroundClip: "text",
        fontWeight: 800,
        textFillColor: "transparent",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        mb: { xs: 2, sm: 3, md: 5 },
        lineHeight: { xs: 1.3, sm: 1.4, md: 1.5 }, // better readability
      }}
    >
      Top 6 Perks of a Secure Business Loan in Sydney NSW
    </Typography>

    {/* <Typography
      sx={{
        opacity: 0.9,
        fontSize: { xs: "0.7rem", sm: "0.85rem", md: "1rem" }, // responsive meta text
      }}
    >
      admin • May 30, 2025
    </Typography> */}
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
            If you're a business owner looking to grow, expand, or stabilise your operations, a secure business loan in Sydney,
            NSW, AU, can be the perfect financial tool. Unlike standard lending options, secured loans offer substantial benefits that give businesses more freedom and flexibility.
            Whether you're a startup needing equipment or an established company seeking expansion capital, securing your loan with assets may provide a better borrowing experience overall.
          </Typography>
          <Typography
            variant="h4"
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
            Top 6 Perks of a Secure Business Loan in Sydney, NSW
          </Typography>
        </Container>

        {/* Sections */}
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {sections.map((sec, index) => (
              <Grid item xs={12} md={6} key={index}>
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
                    {index + 1}. {sec.heading}
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{ color: themeColors.description, lineHeight: 1.7 }}
                  >
                    {sec.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Outro */}
        <Container maxWidth="md" sx={{ mt: 8 }}>
          <Paper
            sx={{
              p: 4,
              textAlign: "center",
              borderTop: `4px solid ${themeColors.accent}`,
              borderRadius: 2,
              backgroundColor: themeColors.paperBg,
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, fontFamily: "serif", color: themeColors.description, }}>
            When it comes to business funding, don’t settle for less. A secure business loan in Sydney, NSW, AU, from Nexus Finance can be the game-changer your company needs.
            Contact and explore our secure loan and overdraft solutions tailored to meet your business goals. Empower your future; choose smart, secure financing with Nexus Finance!
            </Typography>
          </Paper>
        </Container>

        {/* Share */}
        <Divider sx={{ my: 6 }} />
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom fontFamily="serif">
            Share this blog:
          </Typography>
          {/* Social Share Icons */}
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
