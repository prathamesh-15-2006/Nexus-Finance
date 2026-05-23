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

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BlogBackground1 from "../../asset/ContactPage/commericalFinance/CommercialFinance8.webp";
import BlogBackground2 from "../../asset/ContactPage/commericalFinance/CommercialFinance2.avif";
import BlogBackground3 from "../../asset/ContactPage/commericalFinance/CommercialFinance6.webp";
import { useTheme } from "../../contexts/ThemeContext";

const BLOG_URL =
  "https://www.Nexusnce.com.au/ain-elevated-smes";

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
      heading: "Steady Numbers, But Still Concerning",
      description:
        "Business failures may have stopped climbing, yet the level of insolvencies remains high by historical standards. This continues to place pressure on small and medium-sized enterprises (SMEs) to keep a close eye on their cash flow. According to CreditorWatch’s June Business Risk Index, recent stability stems from mid-2024 income-tax cuts, government cost-of-living relief, fewer new companies with tax defaults, and a slowdown in cost increases. Even so, 14,716 businesses entered insolvency during the 2025 financial year—a jump of 33% compared to the year before. More than half of these failures were in hospitality, construction, and other service industries.",
    },
    {
      heading: "Broader Economic Headwinds Persist",
      description:
        "Although interest rates are easing, CreditorWatch warns that global factors—including shifting demographics, climate risks, and lingering cost pressures—continue to weigh on bly, sectors usually shielded by government support, such as healthcare and education, are experiencing unusual stress. Retail, transport, warehousing, rental, and real estate services are also feeling the strain. On a positive note, registered B2B trade payment defaults dropped 6.5% in June, the lowest since mid-2024. If this trend holds, it may signal improving cash-flow conditions across many industries.",
    },
    {
      heading: "Navigating the Next Six Months",
      description:
        "CreditorWatch CEO Patrick Coghlan stresses that the upcoming half-year will be crucial to see if insolvency levels decline or remain stubbornly high. While inflation growth has slowed, the substantial cost increases of recent years haven’t reversed. At the same time, global uncertainties—such as US trade tariffs and shifting economic growth patterns—pose additional risks. Longer-term trends like artificial intelligence, ageing populations, and geopolitical tensions will continue to create both challenges and opportunities for business owners.",
    },
    {
      heading: "Why Cash Flow Management Is Critical",
      description:
        "Small Business t nearly 80% of n SMEs faus cash-fculties in the past year. SBA warns that even profitable businesses can collapse without strong cash-flow controls: if you can’t pay suppliers, staff, or creditors, operations can grind to a halt. Common issues include declining revenue, low cash reserves, and seasonal fluctuations. Many owners have resorted to dipping into personal savings or deferring their own pay—unsustainable tactics that endanger both business and personal finances.",
    },
    {
      heading: "Practical Steps to Strengthen Cash Flow",
      description:
        "Effective cash-flow management starts with detailed forecasting and constant monitoring of money in and out. Best practices include: • Invoice discipline: Issue invoices promptly and follow up on overdue payments. • Inventory control: Avoid tying up capital in slow-moving stock. • Supplier terms: Negotiate favourable payment cycles. • Revenue growth: Explore new income streams or adjust pricing, rather than relying solely on cost cutting. These steps are especially important in the lead-up to high-demand periods such as Black Friday, Cyber Monday, and the Christmas season.",
    },
    {
      heading: "Funding Options to Bridge the Gap",
      description: (
                <>
                  When internal cash reserves aren’t enough, strategic financing can help smooth working capital: 
                  • <Link to="/Nexusance/Business-loans/Debtor-&-invoice-finance" style={{ color: '#007bff' }}>Invoice Finance</Link>: Receive up to 95% of an invoice’s value upfront rather than waiting 30+ days for customer payment. 
                  • <Link to="/Nexusance/Business-loans/Business-line-of-credit" style={{ color: '#007bff' }}>Business Line of Credit</Link>: Flexible funds that you draw and repay as needed, ideal for seasonal swings. 
                  • <Link to="/Nexusance/Asset-Finance/Business-vehicle-loans" style={{ color: '#007bff' }}>Asset Finance</Link>: Finance essential equipment or vehicles to support growth without draining cash reserves. 
                  • <Link to="/Nexusance/Business-loans/Trade-finance" style={{ color: '#007bff' }}>Trade Finance</Link>: Cover the time gap between purchasing stock or materials and receiving customer payments.
                </>
              ),

        
    },
  ];

  const handleShare = (platform) => {
    const url = encodeURIComponent(BLOG_URL);
    const text = encodeURIComponent(
      "Check out this blog: ain Elevated – What It Means for SMEs"
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
        <title>ain Elevated – What It Means for SMEs</title>
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
      ain Elevated – What It Means for SMEs
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
            avigating a complex economic landscape where insolvencies remain elevated despite some signs of stability. Understanding these trends is crucial for SMEs aiming to maintain financial health and resilience.
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
            ain Elevated – What It Means for SMEs
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
            At Nexusance, we specialise in tailored cash-flow solutions to keep your operations steady—even in unpredictable markets. Whether you need invoice financing, a line of credit, or other funding support, our lending specialists can help design a plan that fits your business. Get in touch with NeNnNexus today to explore strategies that can safeguard your cash flow and position your business for long-term success.
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
