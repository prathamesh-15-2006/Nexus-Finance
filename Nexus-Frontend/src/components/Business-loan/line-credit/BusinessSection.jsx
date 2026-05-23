import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  useMediaQuery,
  useTheme as useMuiTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

// Define the existing SVG icons
const IconFlexibility = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="url(#grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> 
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
    </defs>
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const IconCapital = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="url(#grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> 
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
    </defs>
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.76l1.54-9.14a2 2 0 0 0-2-2.2H14z"/>
  </svg>
);

const IconCashFlow = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="url(#grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> 
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
    </defs>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L2 22l1.5-4.5A8.38 8.38 0 0 1 2 11.5 8.5 8.5 0 0 1 10.5 3a8.38 8.38 0 0 1 3.8.9L22 2z"/>
  </svg>
);

const IconHigherLimit = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="url(#grad)"strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> 
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
    </defs>
    <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 12h16M14 2L22 10M14 22l8-8"/>
  </svg>
);

const IconEasyProcess = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="url(#grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> 
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" y2="100%">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
    </defs>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-8.63M22 4L12 14.01l-3-3"/>
  </svg>
);

const IconMultipleUsage = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="url(#grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> 
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
    </defs>
    <path d="M4 14.5V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5.5M16 16v-2h-3v2h-2v-2H8v2H6v-2.5l2-2.5h8l2 2.5V16zM12 2L9 6h6z"/>
  </svg>
);

const IconDigitalAccess = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="url(#grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> 
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
    </defs>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const IconTransparentCharges = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="url(#grad)"strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> 
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <path d="M12 17h.01"/>
  </svg>
);

// Mock data remains the same
const cardData = [
  { title: 'Flexible Repayment', icon: IconFlexibility },
  { title: 'Working Capital', icon: IconCapital },
  { title: 'Cash Flow', icon: IconCashFlow },
  { title: 'Higher Limit', icon: IconHigherLimit },
  { title: 'Easy Process', icon: IconEasyProcess },
  { title: 'Multiple Usage', icon: IconMultipleUsage },
  { title: 'Digital Access', icon: IconDigitalAccess },
  { title: 'Transparent Charges', icon: IconTransparentCharges },
];

// Framer Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.8,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const BusinessLineOfCreditBenefits = () => {
  const muiTheme = useMuiTheme();
  const { isDarkMode } = useTheme();

  const cardBorderGradient = 'linear-gradient(45deg, #10b981, #2563eb, #8b5cf6)';
  const mainTitleGradient = 'linear-gradient(90deg, #10b981, #2563eb)';

  const mainBackground = isDarkMode ? '#0a0a0a' : '#f0f4f8';
  const cardBackgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)';
  const cardBackdropFilter = 'blur(10px) saturate(180%)';

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        background: mainBackground,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
        transition: 'background 0.5s ease',
        overflowX: 'hidden' // Prevents horizontal scrolling
      }}
    >
      <Typography
        variant="h3"
        component={motion.h2}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        textAlign="center"
        sx={{
          fontWeight: 700,
          mb: { xs: 6, md: 8 },
          fontSize: { xs: '2.5rem', md: '3.5rem' },
          backgroundImage: mainTitleGradient,
          backgroundSize: '200%',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Benefits of a Business Line of Credit
      </Typography>
      
      <Grid
        container
        justifyContent="center"
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        maxWidth="lg"
      >
        {cardData.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Grid 
              item 
              xs={12} // Forces full width on mobile
              sm={6} 
              md={4} 
              lg={3} 
              key={index}
              sx={{ 
                display: 'flex',
                justifyContent: 'center',
                p: 2,
              }}
            >
              <Box
                component={motion.div}
                variants={cardVariants}
                sx={{
                  position: 'relative',
                  p: '1px',
                  borderRadius: '50%',
                  background: 'transparent',
                  height: { xs: 200, sm: 250, md: 250 },
                  width: { xs: 200, sm: 250, md: 250 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: isDarkMode 
                      ? '0 10px 30px rgba(0, 0, 0, 0.4)' 
                      : '0 10px 30px rgba(0, 0, 0, 0.1)',
                    '&::before': {
                      opacity: 1,
                    },
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '50%',
                    background: cardBorderGradient,
                    opacity: 0,
                    transition: 'opacity 0.3s ease-in-out',
                    zIndex: 0,
                  },
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: { xs: 3, md: 4 },
                    borderRadius: '50%',
                    background: cardBackgroundColor,
                    backdropFilter: cardBackdropFilter,
                    border: '1px solid',
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    height: '100%',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      background: cardBorderGradient,
                      p: '2px',
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isDarkMode ? '#1a1a1a' : '#f0f4f8',
                        transition: 'background-color 0.5s ease',
                      }}
                    >
                      <IconComponent width={36} height={36} />
                    </Box>
                  </Box>
                  <Typography
                    variant="h6"
                    textAlign="center"
                    fontWeight={600}
                    sx={{
                      color: isDarkMode ? '#e0e0e0' : '#333',
                      mt: 1,
                      mb: 0,
                    }}
                  >
                    {item.title}
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default BusinessLineOfCreditBenefits;