import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar, useTheme as useMuiTheme } from '@mui/material';
import { useTheme } from '../../../contexts/ThemeContext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { motion } from 'framer-motion';

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";


const benefitsData = [
  {
    icon: <CheckCircleIcon />,
    title: 'No Collateral Required',
    description: 'Keep personal and business assets secure.',
    color: '#008080',
    lightColor: '#00CED1',
    darkColor: '#20B2AA',
  },
  {
    icon: <FlashOnIcon />,
    title: 'Fast Business Loans',
    description: 'Pre-approval in 59 minutes, funding in 12–24 hours.',
    color: '#E91E63',
    lightColor: '#FF1493',
    darkColor: '#C71585',
  },
  {
    icon: <MonetizationOnIcon />,
    title: 'Flexible Repayments',
    description: 'Terms tailored to your cash flow needs.',
    color: '#673AB7',
    lightColor: '#9370DB',
    darkColor: '#663399',
  },
  {
    icon: <RocketLaunchIcon />,
    title: 'Great for Startups & SMEs',
    description: 'Perfect for businesses with limited history.',
    color: '#FF7F50',
    lightColor: '#FF6347',
    darkColor: '#FF4500',
  },
  {
    icon: <LightbulbIcon />,
    title: 'Low Documentation Loans',
    description: 'Minimal paperwork for quicker outcomes.',
    color: '#00BFFF',
    lightColor: '#1E90FF',
    darkColor: '#4169E1',
  },
];

const BenefitsSection = () => {
  const { isDarkMode } = useTheme();
  const muiTheme = useMuiTheme();

  const getThemeColor = (benefit) => {
    return isDarkMode ? benefit.darkColor : benefit.lightColor;
  };

  const gradientText = {
    background: isDarkMode 
      ? 'linear-gradient(90deg, #60a5fa, #34d399, #10b981)'
      : 'linear-gradient(90deg, #2563eb, #10b981)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
  };

  const backgroundColor = isDarkMode ? '#000000' : '#f5f5f5';
  const cardBackground = isDarkMode 
    ? 'rgba(18, 18, 18, 0.95)'
    : '#ffffff';
  const cardBorder = isDarkMode
    ? '1px solid rgba(255, 255, 255, 0.1)'
    : '1px solid rgba(0, 0, 0, 0.1)';
  const boxShadowColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.15)';

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 4 },
        backgroundColor: backgroundColor,
        color: isDarkMode ? '#ffffff' : '#000000',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
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
                                      Benefits of Unsecured Loan
                                    </Typography>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* First Row - 3 Cards */}
        <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
          {benefitsData.slice(0, 3).map((benefit, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ 
              display: 'flex',
              justifyContent: 'center'
            }}>
              <Card
                sx={{
                  p: 3,
                  height: '100%',
                  width: '100%',
                  maxWidth: 350,
                  borderRadius: 4,
                  textAlign: 'center',
                  background: cardBackground,
                  color: isDarkMode ? '#ffffff' : '#000000',
                  border: cardBorder,
                  boxShadow: `0 8px 16px ${boxShadowColor}`,
                  backdropFilter: isDarkMode ? 'blur(10px)' : 'none',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  '&:hover': {
                    transform: 'translateY(-10px) scale(1.03)',
                    boxShadow: `0 15px 30px ${boxShadowColor}, 0 0 20px ${getThemeColor(benefit)}30`,
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: isDarkMode 
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(0, 0, 0, 0.05)',
                    color: getThemeColor(benefit),
                    width: 64,
                    height: 64,
                    mx: 'auto',
                    mb: 2,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: `0 0 15px ${getThemeColor(benefit)}40`,
                    },
                  }}
                >
                  {benefit.icon}
                </Avatar>
                <CardContent sx={{ p: 0 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold', 
                      mb: 1, 
                      color: isDarkMode ? '#ffffff' : '#000000' 
                    }}
                  >
                    {benefit.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
                      lineHeight: 1.6,
                    }}
                  >
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Second Row - 2 Cards */}
        <Grid container spacing={4} justifyContent="center">
          {benefitsData.slice(3, 5).map((benefit, index) => (
            <Grid item xs={12} sm={6} md={4} key={index + 3} sx={{ 
              display: 'flex',
              justifyContent: 'center'
            }}>
              <Card
                sx={{
                  p: 3,
                  height: '100%',
                  width: '100%',
                  maxWidth: 350,
                  borderRadius: 4,
                  textAlign: 'center',
                  background: cardBackground,
                  color: isDarkMode ? '#ffffff' : '#000000',
                  border: cardBorder,
                  boxShadow: `0 8px 16px ${boxShadowColor}`,
                  backdropFilter: isDarkMode ? 'blur(10px)' : 'none',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  '&:hover': {
                    transform: 'translateY(-10px) scale(1.03)',
                    boxShadow: `0 15px 30px ${boxShadowColor}, 0 0 20px ${getThemeColor(benefit)}30`,
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: isDarkMode 
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(0, 0, 0, 0.05)',
                    color: getThemeColor(benefit),
                    width: 64,
                    height: 64,
                    mx: 'auto',
                    mb: 2,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: `0 0 15px ${getThemeColor(benefit)}40`,
                    },
                  }}
                >
                  {benefit.icon}
                </Avatar>
                <CardContent sx={{ p: 0 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold', 
                      mb: 1, 
                      color: isDarkMode ? '#ffffff' : '#000000' 
                    }}
                  >
                    {benefit.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
                      lineHeight: 1.6,
                    }}
                  >
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default BenefitsSection;
