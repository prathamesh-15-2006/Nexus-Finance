import React from 'react';
import { Box, Typography, Container, Button, Grid, Card, CardContent, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import Banner from '../../asset/assetfinance.webp';

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

const assetTypes = [
  {
    title: 'Business Vehicle Loans',
    description: 'Finance your business vehicles with flexible terms. Get the equipment you need to keep your operations running smoothly.',
    link: '/Nexus-Finance/Asset-Finance/Business-vehicle-loans'
  },
  {
    title: 'Solar Equipment Finance',
    description: 'Invest in solar energy solutions for your business. Reduce costs and go green with our specialized financing options.',
    link: '/Nexus-Finance/Asset-Finance/Solar-equipment-finance'
  }
];

export default function AssetFinance() {
  const { isDarkMode } = useTheme();

  const themeColors = {
    background: isDarkMode ? "#0f1423" : "#ffffff",
    text: isDarkMode ? "#ffffff" : "#222",
    description: isDarkMode ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.75)",
    sectionBg: isDarkMode ? "#16213e" : "#f9f9f9",
    accent: "#3264c1",
    secondaryAccent: "#24dd93",
    shadow: isDarkMode ? '0 6px 20px rgba(0, 0, 0, 0.4)' : '0 6px 20px rgba(0, 0, 0, 0.1)',
  };

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundImage: `url(${Banner})`,
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
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: "2.25rem", sm: "3rem" },
                fontWeight: 700,
                mb: 3,
                textAlign: "center",
                background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Asset Finance
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                mb: 4,
                textAlign: "center",
                maxWidth: "600px",
                mx: "auto"
              }}
            >
              Discover tailored financing solutions for your business assets. From vehicles to solar equipment, we provide the capital to power your growth.
            </Typography>
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button
                component={Link}
                to="/contact"
                variant="contained"
                size="large"
                sx={{
                  background: cardGradient,
                  color: 'white',
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  borderRadius: '50px',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: cardGradient,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Get Started
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Asset Types Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            mb: 6,
            fontWeight: 700,
            color: themeColors.text
          }}
        >
          Explore Our Asset Finance Options
        </Typography>

        <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
          {assetTypes.map((asset, index) => (
            <Card
              key={index}
              sx={{
                width: '320px',
                height: '320px',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: themeColors.sectionBg,
                borderRadius: 3,
                boxShadow: themeColors.shadow,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 12px 40px ${themeColors.accent}30`,
                },
                border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: themeColors.text,
                    textAlign: 'center'
                  }}
                >
                  {asset.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: themeColors.description,
                    lineHeight: 1.6,
                    textAlign: 'center'
                  }}
                >
                  {asset.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 3, pt: 0 }}>
                <Button
                  component={Link}
                  to={asset.link}
                  variant="contained"
                  fullWidth
                  sx={{
                    background: cardGradient,
                    color: 'white',
                    fontWeight: 600,
                    borderRadius: '25px',
                    textTransform: 'none',
                    '&:hover': {
                      background: cardGradient,
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </>
  );
}
