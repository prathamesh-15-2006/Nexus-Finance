import React, { useEffect } from "react";
import { Box, Typography, Container, Grid, IconButton, Paper, Divider,Button } from "@mui/material";
import { Facebook, Twitter, LinkedIn, WhatsApp, Email } from "@mui/icons-material";
import { Helmet } from "react-helmet-async";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Hero images
import CommercialFinance1 from "../../asset/ContactPage/commericalFinance/CommercialFinance1.avif";
import CommercialFinance2 from "../../asset/ContactPage/commericalFinance/CommercialFinance2.avif";
import CommercialFinance3 from "../../asset/ContactPage/commericalFinance/CommercialFinance3.avif";
import CommercialFinance4 from "../../asset/ContactPage/commericalFinance/CommercialFinance4.webp";
import CommercialFinance5 from "../../asset/ContactPage/commericalFinance/CommercialFinance5.webp";
import CommercialFinance6 from "../../asset/ContactPage/commericalFinance/CommercialFinance6.webp";
import CommercialFinance7 from "../../asset/ContactPage/commericalFinance/CommercialFinance7.webp";
import CommercialFinance8 from "../../asset/ContactPage/commericalFinance/CommercialFinance8.webp";

const BLOG_URL = "https://www.Nexuse.com.au/commercial-finance-guide-sydney-nsw";

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

const blogSections = [
  {
    heading: "",
    description:
      "When it comes to navigating commercial finance in Sydney, local expertise can make all the difference. At Nexusce, based right here in Sydney, NSW, we understand the fast-paced and ever-evolving needs of s owners. Whether you’re a property developer securing a new site or an entrepreneur expanding operations, the path to funding starts with the right financial partner. Commercial finance can be complex, but with the guidance of expert finance brokers, your business can access funding options that are not only faster but also more tailored to your goals.",
    img: CommercialFinance1,
  },
  {
    heading: "Understanding Commercial Finance and Its Importance",
    description:[
      "Commercial finance refers to lending solutions designed specifically for businesses rather than individuals. Unlike personal loans, which are typically used for everyday expenses or consumer goods, commercial finance encompasses a wide range of products, from equipment leasing and business lines of credit to commercial property loans.",
      "In Sydney’s competitive economic landscape, the ability to access the right kind of funding—at the right time—can significantly impact a company’s growth. With various lenders and loan structures available, understanding how to choose between them is vital. That’s where experienced finance brokers come in."
    ],
    img: CommercialFinance2,
  },
  {
    heading: "Why Business Owners Need Professional Finance Brokers",
    description:
      "Working with seasoned finance brokers gives you an advantage. Brokers act as intermediaries between you and lenders, translating your business goals into structured loan applications that meet financial institutions’ strict requirements. More importantly, they have access to a broader range of funding options than what you’d typically find approaching a lender directly. At Nexusce, our Sydney-based finance brokers offer deep market insight and lender relationships that help our clients find flexible, affordable commercial finance solutions. This includes everything from short-term working capital loans to large-scale property finance.",
    img: CommercialFinance3,
  },
  {
    heading: "Tailored Financial Solutions for Local Businesses",
    description:[
      "Not every business fits into a standard lending model. Many commercial borrowers—especially SMEs, medical professionals, or growing franchises—require custom structures that consider unique cash flows, asset types, and industry demands. Our experience has shown that prepackaged solutions often fall short, which is why we take the time to assess every client’s business holistically.",
      "Commercial finance is not a one-size-fits-all product. Whether you're applying for development finance, expanding your premises, or consolidating debt, working with a firm like Nexusce ensures your solution is built around your business."
    ],
    img: CommercialFinance5,
  },
  {
    heading: "Benefits of Working With Local Sydney Finance Brokers",
    description:[
      "Sydney’s property market and business ecosystem are distinctive. From zoning laws and planning permissions to local council requirements, navigating this terrain calls for brokers who understand it inside and out. Local finance brokers are better positioned to assess risk, suggest relevant products, and connect clients with lenders that operate effectively within the NSW regulatory framework.",
      "Choosing a local firm like Nexusce means gaining a partner who understands the nuances of Sydney-based commercial finance while also being available for face-to-face consultations and real-time updates throughout the process."
    ],
    img: CommercialFinance6,
  },
  {
    heading: "Commercial Property Finance: What to Know",
    description:[
      "One of the most common forms of commercial finance is funding for property acquisitions and developments. Whether you're purchasing an office building, renovating a warehouse, or developing residential units for resale, securing financing is often the first hurdle.",
      "At Nexusce, we help our clients understand loan-to-value ratios, interest rate trends, and how to build strong applications that appeal to lenders. We also help structure finance in ways that optimise cash flow and protect long-term asset value.",
      "To learn more about our specialised support, visit our page on commercial finance brokers in Sydney, NSW."
    ],
    img: CommercialFinance7,
  },
  {
    heading: "Navigating Loan Structures and Application Support",
    description:[
      "Commercial finance involves more than just borrowing money—it’s about structuring debt in a way that supports your long-term goals. From interest-only options and balloon payments to refinancing existing obligations, smart structuring can save thousands and boost cash flow.",
      "Our finance brokers assist with preparing comprehensive applications, including financial statements, feasibility studies, and risk assessments. By removing the guesswork and presenting strong business cases, we maximise approval rates and secure competitive terms for our clients.",
    ],
    img: CommercialFinance8,
  },
  {
    heading: "Access to a Diverse Network of Lenders",
    description:[
      "Another advantage of working with professional finance brokers is the access they offer to a broad spectrum of lenders—including non-bank, private, and alternative financiers. This diversity is particularly valuable for businesses that may not meet the rigid criteria of traditional banks.",
      "At Nexusce, we maintain active relationships with lenders across  you're looking for a fast approval process or flexible collateral requirements, we can introduce options that align with your business profile and funding timeline.",
    ],
    img: CommercialFinance1,
  },
  {
    heading: "Financial Advice That Supports Business Growth",
    description:[
      "Beyond lending, having access to trusted financial advice is critical. Our team doesn’t just facilitate commercial finance; we help clients evaluate funding within the bigger picture of their business strategy. That includes cash flow forecasting, scenario planning, and long-term financial goal setting.",
    ],
    img: CommercialFinance4,
  },
  {
    heading: "Partner With Experts Who Understand Commercial Finance",
    description:[
      "The financial landscape in Sydney is full of opportunities—but also complexity. Having a partner like Nexusce ensures your business can move confidently through every stage of funding. With our local expertise, deep lender network, and tailored service, we’re here to make finance simple and strategic.",
      "Ready to explore smart commercial finance solutions with experienced Sydney-based finance brokers? Contact Nexusce today on 9370439566 or visit our contact page to speak with a member of our team."
    ],
    img: CommercialFinance5,
  },
];

export default function CommericalFinance() {
  const { isDarkMode } = useTheme();

  const themeColors = {
    background: isDarkMode ? "#0f1423" : "#ffffff",
    heading: isDarkMode ? "linear-gradient(90deg, #2ECC71, #1ABC9C)" : "linear-gradient(90deg, #1976d2, #42a5f5)",
    text: isDarkMode ? "#ffffff" : "#222",
    description: isDarkMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.75)",
    sectionBg: isDarkMode ? "#16213e" : "#f9f9f9",
  };

  // Facebook SDK
  useEffect(() => {
    if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0";
      document.body.appendChild(script);
      script.onload = () => window.FB && window.FB.XFBML.parse();
    } else {
      window.FB && window.FB.XFBML.parse();
    }
  }, [isDarkMode]);

  return (
    <>
      <Helmet>
        <title>Commercial Finance in Sydney: A Guide for Business Owners</title>
      </Helmet>

      <Box sx={{ fontFamily: "'Poppins', sans-serif", background: themeColors.background, overflow: "hidden" }}>
        {/* Hero Section */}
        <Box
          sx={{
            height: { xs: "50vh", md: "70vh" },
            backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${CommercialFinance1})`,
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
            Commercial Finance in Sydney: A Guide for Business Owners
          </Typography>
        
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

        {/* Share Section */}
        <Divider sx={{ my: 6 }} />
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom fontFamily="serif">
            Share this blog:
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4, gap: 2 }}>
            <IconButton
              aria-label="share on Twitter"
              onClick={() => window.open(`https://twitter.com/intent/tweet?url=${BLOG_URL}`)}
              sx={{ color: "lightblue", "&:hover": { color: "#1DA1F2" } }}
            >
              <Twitter sx={{ fontSize: 40 }} />
            </IconButton>
            <IconButton
              aria-label="share on LinkedIn"
              onClick={() => window.open(`https://www.linkedin.com/shareArticle?url=${BLOG_URL}`)}
              sx={{ color: "lightblue", "&:hover": { color: "#0077b5" } }}
            >
              <LinkedIn sx={{ fontSize: 40 }} />
            </IconButton>
            <IconButton
              aria-label="share on Facebook"
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${BLOG_URL}`)}
              sx={{ color: "lightblue", "&:hover": { color: "#1877F2" } }}
            >
              <Facebook sx={{ fontSize: 40 }} />
            </IconButton>
            <IconButton
              aria-label="share on WhatsApp"
              onClick={() => window.open(`https://api.whatsapp.com/send?text=${BLOG_URL}`)}
              sx={{ color: "lightblue", "&:hover": { color: "#25D366" } }}
            >
              <WhatsApp sx={{ fontSize: 40 }} />
            </IconButton>
            <IconButton
              aria-label="share via Email"
              onClick={() => window.open(`mailto:?subject=Check this blog&body=${BLOG_URL}`)}
              sx={{ color: "lightblue", "&:hover": { color: "#0a66c2" } }}
            >
              <Email sx={{ fontSize: 40 }} />
            </IconButton>
          </Box>
        </Container>

        {/* Comments */}
        <Divider sx={{ my: 6 }} />
        <Container maxWidth="md">
          <Typography variant="h6" gutterBottom sx={{ color: themeColors.text, fontFamily: "serif" }}>
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
