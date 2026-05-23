import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useTheme } from "../../contexts/ThemeContext";
import AboutImg from '../../asset/experts/leader.png';
import img1 from "../../asset/ContactPage/commericalFinance/CommercialFinance1.avif";
import img2 from "../../asset/ContactPage/blog3/blog2.webp";
import img3 from "../../asset/ContactPage/blog3/blog4.webp";
import img4 from "../../asset/ContactPage/Blog3.avif";
import img5 from "../../asset/ContactPage/blog3/blog3.webp";
import img6 from "../../asset/ContactPage/blogGraph2.webp";


import apr from "../../asset/ContactPage/blog/Apr.webp";

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

const blogPosts = [
   {
    id: 1,
    title: "ncies Remain Elevated – What It Means for SMEs",
    date: "May 16, 2025",
    description: "ses are navigating a complex economic landscape where insolvencies remain elevated despite some signs of stability. Understanding these trends is crucial for SMEs aiming to maintain financial health and resilience.",
    image: img4,
    page: "/Blog/ncies"
  },
   {
    id: 2,
    title: "Top 6 Perks of a Secure Business Loan in Sydney NSW",
    date: " May 30, 2025",
    description: "Explore 6 key benefits of a secure business loan in Sydney, NSW, AU, with Nexus Finance. Contact (13) 00054351 for tailored solutions today.",
    image: img2,
    page: "/Blog/Secure-Bussiness-Loan"
  },
 
 
  {
    id: 3,
    title: "The Ultimate Guide to Asset Finance in Sydney NSW",
    date: "June 27, 2025",
    description: "Looking for asset finance solutions in Sydney, NSW? Discover Nexus Finance's tailored options for your financial needs. Click here for more info.",
    image: img3,
    page: "/Blog/Asset-Finance"
  },
   {
    id: 4,
    title: "Commercial Finance in Sydney: A Guide for Business Owners",
    date: "July 25, 2025",
    description: "Explore commercial finance options in Sydney with Nexus Finance. Call 9370439566 or click here to learn more from expert finance brokers.",
    image: img1,
    page: "/Blog/Commercial-Finance"
  },
 
  {
    id: 5,
    title: "Why APR Matters More Than “Simple” Interest Rates – Comparison between APR & Simple Interest",
    date: "August 29, 2025",
    description: "When it comes to business loans, not all interest rates are created equal. Many lenders advertise their products using a simple annual rate, which can make loans look cheaper than they actually are. At Nexus Finance, we want our clients to understand the true cost of borrowing — that’s why we use the Annual Percentage Rate (APR) when quoting our loan pricing.",
    image: img5,
    page: "/Blog/APR-Matters"
  },
  {
    id: 6,
    title: "Understanding Business Credit Scores: A Key to Financial Success",
    date: "September 26, 2025",
    description: "A business credit score is a numerical representation of a company's creditworthiness, similar to personal credit scores. Lenders, suppliers, and other stakeholders use these scores to assess the risk of extending credit or doing business with a company. A strong business credit score can open doors to better financing options, favorable terms, and increased trust from partners.",
    image: img6,
    page: "/Blog/Understanding-Business-Credit-Scores"
  }


];

const HeroSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minHeight: '100vh',
  color: 'white',
  padding: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    textAlign: 'center',
    paddingTop: theme.spacing(8),
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(4),
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

const AIImage = styled('img')({
  maxWidth: '100%',
  height: 'auto',
  borderRadius: '16px',
});

const BlogPage = () => {
  const [showBlogs, setShowBlogs] = useState(false); 
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // ✅ theme mode

  const themeColors = {
    heroBg: isDarkMode
      ? "linear-gradient(135deg, #16213e, #0f1423)"
      : "linear-gradient(135deg, #f0f4f8, #e6e9f0)",
    heading: isDarkMode ? "#2ECC71" : "#2196F3",
    text: isDarkMode ? "#ffffff" : "#000000",
    description: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
    cardBg: isDarkMode ? "#1e1e2f" : "#ffffff",
    cardText: isDarkMode ? "#eaeaea" : "#333333"
  };

  // Create a reversed copy of the blog posts to show the latest ones first
  const reversedBlogPosts = [...blogPosts].reverse();
  const latestPost = reversedBlogPosts[0];
  const otherPosts = reversedBlogPosts.slice(1);

  return (
    <>
      {/* Hero Section */}
      <HeroSection sx={{ background: themeColors.heroBg, transition: "all 0.3s ease" }}>
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            mt:{xs:15,md:10},
          }}
        >
          <ContentBox>
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
            Your Guide to Smarter Business Finance
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 2,
                mb: 4,
                opacity: 0.9,
                maxWidth: '600px',
                color: themeColors.description,
              }}
            >
              Stay ahead with expert tips, industry news, and financial strategies from Nexus Finance.
              Whether you're a small business owner or a growing enterprise,
              our blogs are designed to help you make informed decisions.
            </Typography>
            
          </ContentBox>
          <ImageContainer>
            <AIImage src={AboutImg} alt="AI Icon" />
          </ImageContainer>
        </Container>
      </HeroSection>

      {/* Latest Blog Post */}
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: themeColors.text, textAlign: 'center', mb: 4 }}>
          Our Latest Blog
        </Typography>
        <Paper
          elevation={4}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            borderRadius: '16px',
            overflow: 'hidden',
            background: themeColors.cardBg,
            color: themeColors.cardText,
            cursor: 'pointer',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
            }
          }}
          onClick={() => navigate(latestPost.page)}
        >
          <Box
            component="img"
            src={latestPost.image}
            alt={latestPost.title}
            sx={{
              width: { xs: '100%', md: '50%' },
              height: { xs: 250, md: 'auto' },
              objectFit: 'cover',
            }}
          />
          <Box sx={{ p: {xs: 2, md: 4}, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography sx={{ color: 'gray', mb: 1 }}>{latestPost.date}</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: themeColors.heading, fontSize: { xs: '1.5rem', md: '2rem'} }}>
              {latestPost.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: themeColors.description }}>
              {latestPost.description}
            </Typography>
            <Button variant="contained" sx={{ alignSelf: 'flex-start', background: "linear-gradient(45deg, #00c853, #0091ea)" }}>
              Read More
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* Blog Cards */}
      
        <Container maxWidth="lg" sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: themeColors.text, textAlign: 'center', mb: 4 }}>
            More Blogs
          </Typography>
          <Grid container spacing={3} justifyContent="center" alignItems="stretch"mb={6}>
            {otherPosts.slice(0, showBlogs ? otherPosts.length : 3).map((post) => (
              <Grid item xs={12} sm={6} md={3} key={post.id}>
                <Paper
                  elevation={3}
                  sx={{
                    maxWidth: 320,
                    margin: "auto",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "12px",
                    overflow: "hidden",
                    background: themeColors.cardBg,
                    color: themeColors.cardText,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease, background 0.3s ease, color 0.3s ease",
                    "&:hover": { transform: "translateY(-5px)" }
                    
                  }}
                  onClick={() => navigate(post.page)}
                >
                  {/* Image */}
                  <Box sx={{ position: "relative", overflow: "hidden" }}>
                    <Box
                      component="img"
                      src={post.image}
                      alt={post.title}
                      sx={{
                        width: "100%",
                        height: 160,
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                        "&:hover": { transform: "scale(1.05)" }
                      }}

                    />
                    {/* Date Ribbon */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        zIndex: 1,
                      }}
                    >
                      {post.date}
                    </Box>
                  </Box>
              
                {/* Text */}
                <Box sx={{ p: 2, flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      color: themeColors.heading,
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      color: themeColors.description,
                    }}
                  >
                    {post.description}
                  </Typography>
                </Box>
                <Box sx={{ p: 2, pt: 0, textAlign: "center" }}>
                  <Button
                    variant="contained"
                    sx={{
                      background: "linear-gradient(45deg, #00c853, #0091ea)",
                      textTransform: "none",
                      borderRadius: "8px",
                      px: 3
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // ✅ prevent card click firing too
                      navigate(post.page);
                    }}
                  >
                    Read More..
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      

      {/* See More Button */}
      {otherPosts.length > 4 && !showBlogs && (
        <Box textAlign="center" mt={4} mb={6} >
          <Button
            variant="contained"
            onClick={() => setShowBlogs(true)}
            sx={{
              background: 'linear-gradient(45deg, #00b894, #0984e3)',
              color: 'white',
              px: 4,
              py: 1.5,
              fontWeight: 'bold',
              borderRadius: '8px',
              '&:hover': {
                background: 'linear-gradient(45deg, #0984e3, #00b894)',
              },
            }}
          >
            See More Blogs..
          </Button>
        </Box>
      )}
    </>
  );
};

export default BlogPage;