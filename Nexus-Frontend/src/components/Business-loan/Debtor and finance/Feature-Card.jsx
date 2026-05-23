import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  useTheme as useMuiTheme,
  useMediaQuery,
} from '@mui/material';
import { styled, keyframes } from '@mui/system';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import { useTheme } from "../../../contexts/ThemeContext";

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

// Fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

// Gentle floating animation
const floatAnim = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const StyledCard = styled(Card)(({ theme, isDarkMode }) => ({
    background: isDarkMode
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(15px) scale(0.95)',
    border: isDarkMode
      ? '1px solid rgba(255, 255, 255, 0.15)'
      : '1px solid rgba(0, 0, 0, 0.1)',
    color: isDarkMode ? 'white' : '#1a1a1a',
    borderRadius: '50%',
    width: '230px',
    height: '230px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxShadow: isDarkMode
      ? '0 0 20px rgba(255,255,255,0.05)'
      : '0 4px 20px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease-in-out',
    animation: `${fadeIn} 0.5s ease-out, ${floatAnim} 4s ease-in-out infinite`,
    '&:hover': {
      transform: 'scale(1.08)',
      boxShadow: isDarkMode
        ? '0 0 25px rgba(0, 200, 255, 0.8)'
        : '0 0 25px rgba(0, 100, 255, 0.4)',
      background: isDarkMode
        ? 'rgba(255, 255, 255, 0.15)'
        : 'rgba(255, 255, 255, 1)',
    },
    // Mobile styles
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 'auto',
      borderRadius: '15px',
      marginBottom: '20px',
      animation: 'none', // Disable animations on mobile for better performance
      transform: 'none', // Reset hover transform
      '&:hover': {
        transform: 'none', // Disable hover transform on mobile
      },
    }
  }));

  const features = [
    { icon: <LightbulbOutlinedIcon sx={{ fontSize: 40 }} />, title: 'Custom Finance Solutions – Structured to fit your receivables and goals' },
    { icon: <FlashOnOutlinedIcon sx={{ fontSize: 40 }} />, title: 'Fast Pre-Approval & Funding – Within 5–7 business days' },
    { icon: <GppGoodOutlinedIcon sx={{ fontSize: 40 }} />, title: 'No Property Needed – Protect your assets' },
    { icon: <MonetizationOnOutlinedIcon sx={{ fontSize: 40 }} />, title: 'Borrow $5K–$150M – Scale financing to your needs' },
    { icon: <AnalyticsOutlinedIcon sx={{ fontSize: 40 }} />, title: 'Expert Guidance – We help businesses navigate complex cash flow challenges with confidence.' },
  ];

export default function ModernFinancePage() {
  const { isDarkMode } = useTheme();
  const theme = useMuiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const radius = 240;
  const cardSize = 200;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        color: isDarkMode ? 'white' : '#1a1a1a',
        py: 8,
        fontFamily: 'Roboto, sans-serif',
        backgroundColor: isDarkMode ? 'transparent' : '#f8f9fa',
      }}
    >
      <Container maxWidth="xl">
        <Box textAlign="center" mb={6}>
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
              Why Choose Nexus Finance
            </Typography>
          <Typography
            variant="h5"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              color: isDarkMode ? 'rgba(255,255,255,0.8)' : '#666',
              mt: 2
            }}
          >
            We've helped hundreds of ain momentum, grow, and survive through seasonal slowdowns or payment delays. Here's what sets us apart.
          </Typography>
        </Box>

        {/* Conditional rendering for mobile vs desktop layout */}
        {isMobile ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {features.map((feature, index) => (
              <StyledCard key={index} isDarkMode={isDarkMode}>
                {feature.icon}
                <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                  {feature.title}
                </Typography>
              </StyledCard>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              position: 'relative',
              width: `${radius * 2 + cardSize}px`,
              height: `${radius * 2 + cardSize}px`,
              mx: 'auto',
            }}
          >
            {features.map((feature, index) => {
              const angle = (index / features.length) * (2 * Math.PI) - Math.PI / 2;
              const center = radius + cardSize / 2;
              const x = center + radius * Math.cos(angle) - cardSize / 2;
              const y = center + radius * Math.sin(angle) - cardSize / 2;

              return (
                <Box
                  key={index}
                  sx={{
                    position: 'absolute',
                    top: `${y}px`,
                    left: `${x}px`,
                  }}
                >
                  <StyledCard isDarkMode={isDarkMode}>
                    {feature.icon}
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                  </StyledCard>
                </Box>
              );
            })}
          </Box>
        )}
      </Container>
    </Box>
  );
};