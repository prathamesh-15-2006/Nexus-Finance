import React from 'react';
import { Box, Typography, Container, Card, CardContent } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SpeedIcon from '@mui/icons-material/Speed';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useTheme } from '../../../contexts/ThemeContext';

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";


const Aboutloan = () => {
  // Use ThemeContext instead of props
  const { isDarkMode } = useTheme();

  // Define colors and styles based on isDarkMode from context
  const textColor = isDarkMode ? 'white' : '#1f2937';
  const cardBg = isDarkMode ? 'rgba(40, 52, 69, 0.7)' : 'rgba(255, 255, 255, 0.9)';
  const iconBg = isDarkMode ? '#2c3e50' : '#dbeafe';
  const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

  const gradientText = {
    background: 'linear-gradient(to right, #2563eb, #10b981)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const whyChooseUs = [
    {
      icon: <HandshakeIcon sx={{ fontSize: 40, color: '#2563eb' }} />,
      title: 'Dedicated Brokers',
      description: 'Benefit from personalized advice and support from our experienced finance professionals.',
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: '#10b981' }} />,
      title: 'Fast Approvals',
      description: 'Get a quick response with our streamlined application and pre-approval process.',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: '#ef4444' }} />,
      title: 'Competitive Rates',
      description: 'Access a wide network of lenders to secure the best interest rates and terms for your business.',
    },
  ];

  return (
    <Box
      sx={{
        background: isDarkMode
          ? 'linear-gradient(to bottom, #1d2b3c, #1a2432)'
          : 'linear-gradient(to bottom, #f7f9fc, #eef3f8)',
        py: 16,
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <Container maxWidth="lg">
        {/* Section 1: Unsecured Business Loans */}
        <Box
          mb={16}
          display="flex"
          alignItems="center"
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent="center"
          sx={{
            gap: { xs: 8, md: 12 },
            px: 2,
          }}
        >
          {/* Icon Side */}
          <Box
            sx={{
              position: 'relative',
              width: { xs: '220px', md: '300px' },
              height: { xs: '220px', md: '300px' },
              borderRadius: '50%',
              background: iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              animation: 'pulsate 2s infinite ease-in-out',
              '@keyframes pulsate': {
                '0%': { transform: 'scale(1)', boxShadow: '0 0 10px rgba(0,0,0,0.1)' },
                '50%': { transform: 'scale(1.05)', boxShadow: '0 0 20px rgba(0,0,0,0.2)' },
                '100%': { transform: 'scale(1)', boxShadow: '0 0 10px rgba(0,0,0,0.1)' },
              },
            }}
          >
            <MonetizationOnIcon sx={{ fontSize: { xs: 120, md: 160 }, ...gradientText }} />
          </Box>

          {/* Text Side */}
          <Box textAlign={{ xs: 'center', md: 'left' }} maxWidth="700px">
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
                                Unsecured Business Loan
                               </Typography>

            <Typography variant="h5" fontWeight="medium" color={isDarkMode ? 'grey.300' : 'grey.800'} sx={{ mb: 3 }}>
              Fast, Flexible Funding with Nexus Finance – -Wide
            </Typography>

            <Typography variant="body1" sx={{ color: isDarkMode ? 'grey.400' : 'grey.600', mb: 2, fontSize: '1rem' }}>
              Looking for reliable unsecured business loans in ? Nexus Finance facilitates fast,
              flexible, and collateral-free business loans to help small and medium enterprises grow.
            </Typography>

            <Typography variant="body1" sx={{ color: isDarkMode ? 'grey.400' : 'grey.600', fontSize: '1rem' }}>
              Whether you're a startup, an expanding company, or an established enterprise, we offer hassle-free
              funding from $5,000 to $500,000 — often approved within 12 hours. Enjoy low-doc applications,
              competitive interest rates from 7.75%, and a personalised lending experience from a trusted finance broker.
            </Typography>
          </Box>
        </Box>

        {/* Section 2: What Is an Unsecured Business Loan? */}
        <Card
          sx={{
            borderRadius: 6,
            p: { xs: 4, md: 6 },
            background: cardBg,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            mb: 16
          }}
        >
          <CardContent sx={{ '&:last-child': { pb: 2 } }}>
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
                                What Is an Unsecured Business Loan?
                               </Typography>
            <Typography variant="body1" sx={{ color: isDarkMode ? 'grey.300' : 'grey.700', mb: 4, fontSize: '1.25rem', textAlign: 'center' }}>
              An unsecured loan for business doesn't require you to offer property or assets as collateral.
              It's a practical and fast business funding solution to:
            </Typography>

            <Box
              component="ul"
              sx={{
                listStyle: 'none',
                p: 0,
                m: 0,
                color: isDarkMode ? 'grey.300' : 'grey.700',
                fontSize: '1.125rem',
                display: 'grid',
                gap: 2,
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              }}
            >
              {[
                'Manage business cash flow',
                'Fund marketing or expansion projects',
                'Cover wages, bills, or rent',
                'Purchase inventory or new equipment',
                'Invest in growth without risking personal or business assets',
              ].map((text, index) => (
                <Box
                  key={index}
                  component="li"
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                  }}
                >
                  <CheckCircleOutlineIcon sx={{ color: '#10b981', mt: '2px', fontSize: 20 }} />
                  {text}
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Section 3: Why Choose Us */}
        <Box textAlign="center">
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
                               Why Choose Nexus Finance?
                               </Typography>

          <Box
            sx={{
              display: 'grid',
              gap: 4,
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            }}
          >
            {whyChooseUs.map((item, index) => (
              <Card
                key={index}
                sx={{
                  borderRadius: 4,
                  p: 4,
                  background: cardBg,
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <Box mb={2}>{item.icon}</Box>
                <Typography variant="h6" fontWeight="bold" sx={{ color: textColor, mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: isDarkMode ? 'grey.400' : 'grey.600' }}>
                  {item.description}
                </Typography>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Aboutloan;
