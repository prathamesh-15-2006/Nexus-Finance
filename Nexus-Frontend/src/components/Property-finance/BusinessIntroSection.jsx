import React from 'react';
import { Box, Typography, Container, Grid, Button } from '@mui/material';
import { useTheme } from '../../contexts/ThemeContext';
import { gradients } from '../../styles/gradients';

const BusinessIntroSection = () => {
  const { isDarkMode } = useTheme();

  const themeStyles = {
    backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f7fa',
    textColor: {
      primary: isDarkMode ? '#ffffff' : '#0d47a1',
      secondary: isDarkMode ? '#b0bec5' : '#546e7a',
    },
    button: {
      backgroundColor: isDarkMode ? '#00c853' : '#4caf50',
      hoverColor: isDarkMode ? '#00a844' : '#388e3c',
      textColor: '#ffffff',
    },
    boxShadow: isDarkMode 
      ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
      : '0 4px 20px rgba(0, 0, 0, 0.1)',
  };

  return (
    <Box sx={{ 
      py: { xs: 8, md: 12 }, 
      backgroundColor: themeStyles.backgroundColor,
      transition: 'background-color 0.3s ease',
    }}>
      <Container maxWidth="lg">
        <Grid container justifyContent="center">
          
          {/* Left: Text Section (now takes full width and is centered) */}
          <Grid item xs={12} md={8}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ 
                  mb: 2, 
                  ...gradients.primaryText,
                  display: "inline-block",                  fontSize: { xs: '2rem', md: '3rem' },
                  
                  transition: 'color 0.3s ease',
                }}
              >
                Commercial Finance Solutions for <br /> Growing Businesses
              </Typography>
              <Typography
                variant="body1"
                sx={{ 
                  fontSize: '1.2rem', 
                  color: themeStyles.textColor.secondary, 
                  lineHeight: 1.8,
                  transition: 'color 0.3s ease',
                }}
              >
                Looking for fast, flexible commercial finance in ? Nexusance is your trusted partner, helping clients secure funding through our network of 50+ private lenders. Whether you need capital for a property purchase, development project, or bridging finance, we offer tailored loan solutions with competitive rates, fast approvals, and cashback opportunities to fuel your business growth.
              </Typography>
              <Button 
               onClick={() => {
                  const contactForm = document.getElementById('call-us-form');
                  if (contactForm) {
                    contactForm.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                variant="contained" 
                size="large" 
                sx={{ 
                  mt: 4, 
                  px: 5, 
                  py: 1.8, 
                  borderRadius: 2, 
                  textTransform: 'none',
                  backgroundColor: themeStyles.button.backgroundColor,
                  color: themeStyles.button.textColor,
                  boxShadow: themeStyles.boxShadow,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: themeStyles.button.hoverColor,
                    transform: 'translateY(-2px)',
                    boxShadow: isDarkMode 
                      ? '0 6px 25px rgba(0, 200, 83, 0.4)' 
                      : '0 6px 25px rgba(76, 175, 80, 0.4)',
                  }
                }}
              >
                Get Started
              </Button>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default BusinessIntroSection;
