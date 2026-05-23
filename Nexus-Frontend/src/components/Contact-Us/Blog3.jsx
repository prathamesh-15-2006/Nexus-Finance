import React, { useState, useEffect } from "react";
import { Box, Typography,Container, Grid, IconButton, Paper, Divider,Button } from "@mui/material";
import { Facebook, Twitter, LinkedIn, WhatsApp, Email } from "@mui/icons-material";
import { Helmet } from "react-helmet-async";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";

// Hero images
import BlogBackground1 from "../../asset/ContactPage/blog3/blog3.webp";
import BlogBackground2 from "../../asset/ContactPage/blog3/blog1.webp";
import BlogBackground3 from "../../asset/ContactPage/blog3/blog2.webp";
import BlogBackground4 from "../../asset/ContactPage/blog3/blog2.webp";
import BlogBackground5 from "../../asset/ContactPage/blog3/blog4.webp";
import BlogBackground6 from "../../asset/ContactPage/blog3/blog5.webp";

const BLOG_URL =
  "https://www.Nexusfinance.com.au/ultimate-guide-asset-finance-sydney-nsw";

  const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

const blogSections = [
  {
    heading: "",
    description:
      "Are you searching for reliable asset finance in Sydney, NSW? Look no further! Asset finance is a crucial tool for businesses and individuals alike to acquire the assets they need without tying up significant capital. In this article, we will delve into the world of asset finance, particularly in the vibrant city of Sydney, NSW.",
    img: BlogBackground1,
  },
  {
    heading: "What is Asset Finance in Sydney NSW?",
    description:
      "Asset finance in Sydney, NSW, refers to a financial solution that allows individuals and businesses to acquire assets such as equipment, machinery, vehicles, and technology without having to pay the full amount upfront. This form of financing offers flexibility and enables you to spread the cost over time, making it an attractive option for those looking to invest in essential assets.",
    img: BlogBackground2,
  },
  {
    heading: "Benefits of Asset Finance",
    description:
      "Asset finance in Sydney, NSW, offers a range of benefits. Firstly, it allows you to preserve your working capital, freeing up funds for other business operations. Additionally, asset finance provides fixed monthly payments, making budgeting more manageable. Furthermore, asset finance can be tailored to suit your specific needs, whether you are a start-up or an established business.",
    img: BlogBackground3,
  },
  {
    heading: "How to Secure Asset Finance in Sydney NSW",
    description:
      "Securing asset finance in Sydney, NSW, is a straightforward process. By working with reputable finance providers like Nexus Finance, you can access a range of finance options tailored to your requirements. With competitive rates and flexible terms, Nexus Finance is dedicated to helping you achieve your asset acquisition goals in Sydney, NSW.",
    img: BlogBackground4,
  },
  {
    heading: "Commercial Finance in Sydney NSW: A Closer Look",
    description:
      "While asset finance focuses on acquiring tangible assets, commercial finance in Sydney, NSW, encompasses a broader spectrum of financial solutions for businesses. From working capital loans to commercial property finance, commercial finance is designed to support businesses in their growth and expansion. Nexus Finance offers a comprehensive suite of commercial finance solutions to meet your business needs.",
    img: BlogBackground5,
  },
  {
    heading: "Choosing the Right Finance Partner",
    description:
      "When it comes to asset finance or commercial finance in Sydney, NSW, choosing the right finance partner is crucial. Nexus Finance stands out as a trusted and experienced financial services provider, offering personalized solutions to help you achieve your financial goals. With a focus on transparency and customer satisfaction, Nexus Finance is your go-to partner for all your finance needs in Sydney, NSW.",
    img: BlogBackground6,
  },
  
 
];



export default function BlogPage() {
  const { isDarkMode } = useTheme();

  const themeColors = {
    background: isDarkMode ? "#0f1423" : "#ffffff",
    heading: isDarkMode
      ? "linear-gradient(90deg, #2ECC71, #1ABC9C)"
      : "linear-gradient(90deg, #1976d2, #42a5f5)",
    text: isDarkMode ? "#ffffff" : "#222",
    description: isDarkMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.75)",
    sectionBg: isDarkMode ? "#16213e" : "#f9f9f9",
  };

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
    <title>The Ultimate Guide to Asset Finance in Sydney NSW</title>
  </Helmet>
  <Box sx={{ fontFamily: "'Poppins', sans-serif", background: themeColors.background, overflow: "hidden" }}>
        {/* Hero Section */}
        <Box
          sx={{
            height: { xs: "50vh", md: "70vh" },
            backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${BlogBackground1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            px: 2,
            position: "relative", 
            mt: { xs: 10, md: 10 },
          }}
        >

          {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => window.history.back()}
        sx={{
          position: "absolute",
          top: { xs: 16, md: 32 },
          left: { xs: 16, md: 32 },
          color: "#fff",
          backgroundColor: "rgba(0,0,0,0.5)",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
        }}
        
      >
        Back
      </Button>
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
              fontSize: {
                xs: "1.8rem",  
                sm: "2.2rem",  
                md: "2.8rem", 
                lg: "3.5rem", 
                xl: "4rem",   
              },
              lineHeight: 1.2,
            }}
            
          >
            The Ultimate Guide to Asset Finance in Sydney NSW 
          </Typography>
          {/* <Typography variant="subtitle1" sx={{ maxWidth: 700, mx: "auto" }}>
            May 30, 2025
          </Typography> */}
        </Box>

        {/* Blog Sections */}
        <Box sx={{ maxWidth: "1150px", mx: "auto", py: 10, px: 2 }}>
          {blogSections.map((section, index) => (
            <Grid key={index} container spacing={2} sx={{ mb: 10 }}>
              <Paper
                elevation={4}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: index % 2 === 0 ? "row" : "row-reverse" },
                  borderRadius: 3,
                  overflow: "hidden",
                  height: { xs: "auto", md: "auto" },
                }}
              >
                {/* Image */}
                <Box
                  component="img"
                  src={section.img}
                  alt={section.heading}
                  sx={{
                    width: { xs: "100%", md: "50%" },
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Text */}
                <Box
                  sx={{
                    width: { xs: "100%", md: "50%" },
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: themeColors.sectionBg,
                  }}
                >
            <Typography
            variant="h5"
           
            gutterBottom
            sx={{
               backgroundImage: cardGradient,
              backgroundSize: "200%",
              backgroundClip: "text",
              fontWeight:600,

              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
             
            }}
          >
                    {section.heading}
                  </Typography>
                  <Typography variant="body1" sx={{ color: themeColors.description, lineHeight: 1.9 }}>
                    {Array.isArray(section.description)
                      ? section.description.map((desc, i) => (
                          <span key={i}>
                            {desc}
                            <br />
                            <br />
                          </span>
                        ))
                      : section.description}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Box>
      <Box
        sx={{
          maxWidth: "950px",
          mx: "auto",
          py: 8,
          px: 3,
          textAlign: "center",
        }}
      >
      
        <Typography
          variant="body1"
          sx={{
            color: themeColors.description,
            fontSize: "1.15rem",
            lineHeight: 1.9,
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          Asset finance in Sydney, NSW, is a valuable tool for businesses and individuals looking to acquire assets without significant upfront costs. By partnering with Nexus Finance,
           you can access tailored asset finance solutions that align with 
           your financial objectives. Take the first step towards securing your assets in Sydney,
            NSW, by contacting Nexus Finance today!
          
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: themeColors.description,
            fontSize: "1.15rem",
            lineHeight: 1.9,
            maxWidth: "800px",
            mx: "auto",
            mt:5
          }}
        >
          Ready to explore asset finance options in Sydney, NSW? Visit Nexus Finance to discover how
          our expert team can help you secure the financing you need for your assets.
          Trust Nexus Finance for all your asset finance and commercial finance needs in Sydney, NSW.
        </Typography>
      </Box>

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
