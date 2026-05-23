import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTheme } from '../../../contexts/ThemeContext';

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

const TradeFinanceDetails = () => {
  const { isDarkMode } = useTheme();

  const glassCardStyle = {
    p: { xs: 3, md: 4 },
    borderRadius: 4,
    bgcolor: isDarkMode ? 'rgba(30, 30, 30, 0.7)' : 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(18px)',
    border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'}`,
    transition: 'all 0.3s ease',
    width: '100%',
    maxWidth: 340,
    margin: 'auto',
    boxShadow: isDarkMode 
      ? '0 8px 25px rgba(0, 0, 0, 0.3)' 
      : '0 8px 25px rgba(0, 0, 0, 0.08)',
    backgroundImage: isDarkMode
      ? 'linear-gradient(145deg, rgba(45, 45, 45, 0.6), rgba(30, 30, 30, 0.4))'
      : 'linear-gradient(145deg, rgba(255, 255, 255, 0.4), rgba(240, 255, 250, 0.3))',
    '&:hover': {
      transform: 'translateY(-6px) scale(1.01)',
      boxShadow: isDarkMode 
        ? '0 14px 35px rgba(0, 0, 0, 0.4)' 
        : '0 14px 35px rgba(0, 0, 0, 0.15)',
      border: `1px solid ${isDarkMode ? 'rgba(0, 191, 166, 0.2)' : 'rgba(0, 191, 166, 0.3)'}`,
    },
  };

  const titleStyle = {
    fontWeight: 700,
    fontSize: '1.15rem',
    lineHeight: 1.4,
    backgroundImage: isDarkMode
      ? "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)"
      : "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const textStyle = {
    fontSize: '0.9rem',
    lineHeight: 1.5,
    color: isDarkMode ? '#e5e5e5' : '#333',
  };

  const listTextStyle = {
    fontSize: '0.88rem',
    color: isDarkMode ? '#d1d5db' : '#444',
  };

  const listItemTextStyle = {
    fontSize: '0.80rem',
    color: isDarkMode ? '#9ca3af' : '#555',
  };

  return (
    <Box
      sx={{
        bgcolor: isDarkMode ? '#111827' : '#e9f5f3',
        minHeight: '100vh',
        py: 8,
        transition: 'background-color 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center" sx={{ width: '100%' }}>

          {/* Card 1 */}
          <Grid item xs={12} sm={6} md="auto">
            <Paper elevation={0} sx={glassCardStyle}>
            <Typography
        variant="h5"
        
        gutterBottom
        sx={{
          backgroundImage: cardGradient,
          backgroundSize: "200%",
          backgroundClip: "text",
          textFillColor: "transparent",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 5,
        }}
      >
                What is Trade Finance?
              </Typography>
              <Typography variant="body1" paragraph sx={{ ...textStyle, fontSize: '1.1rem' }}>
                Trade finance provides businesses with the funding needed to pay suppliers upfront or in advance before receiving goods. It's different from invoice finance, as it allows companies to pay for their stock or supplies upfront, helping them unlock the potential to negotiate discounts for early payments. You can get up to 100% of your supplier invoice financed, and repayments are flexible, up to 150 days, making it a versatile tool for managing working capital.
              </Typography>
            </Paper>
          </Grid>

          {/* Card 2 */}
          <Grid item xs={12} sm={6} md="auto">
            <Paper elevation={0} sx={glassCardStyle}>
            <Typography
        variant="h5"
        
        gutterBottom
        sx={{
          backgroundImage: cardGradient,
          backgroundSize: "200%",
          backgroundClip: "text",
          textFillColor: "transparent",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 5,
        }}
      >
                Key Features of Our Trade Finance Facility:
              </Typography>
              <List dense>
                {[
                  { label: "Loan Amount:", value: "$100k - $150M" },
                  { label: "Interest Rates:", value: "Starting from 9.90% p.a." },
                  { label: "Approval Time:", value: "Pre-approval within 24-48 hours." },
                  { label: "Loan Term:", value: "Ongoing" },
                  { label: "Repayment Terms:", value: "Flexible, up to 150 days" },
                  { label: "Security:", value: " No real estate required, secured against business assets" },
                  { label: "Supplier Payment Options:", value: "Pay in multiple currencies with competitive foreign exchange (FX) rates" }
                ].map((item, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32, color: isDarkMode ? '#5eead4' : '#0f766e' }}>
                      <CheckCircleOutlineIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={listTextStyle}>
                          <strong>{item.label} </strong>{item.value}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Card 3 */}
          <Grid item xs={12} sm={6} md="auto">
            <Paper elevation={0} sx={glassCardStyle}>
            <Typography
        variant="h5"
        
        gutterBottom
        sx={{
          backgroundImage: cardGradient,
          backgroundSize: "200%",
          backgroundClip: "text",
          textFillColor: "transparent",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 5,
        }}
      >
                How Trade Finance Works:
              </Typography>
              <List dense>
                {[
                  { primary: "1. Order Goods:", secondary: "Place an order with your supplier, either domestic or overseas." },
                  { primary: "2. Submit Invoice:", secondary: "Present your supplier's invoice to us." },
                  { primary: "3. Payment to Supplier:", secondary: " We facilitate financing the full invoice amount, paying your supplier directly." },
                  { primary: "4. Repayment:", secondary: "You repay the lender within the agreed term (up to 150 days)." },
                ].map((item, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemText
                      primary={item.primary}
                      secondary={item.secondary}
                      primaryTypographyProps={{ 
                        fontWeight: 'bold', 
                        fontSize: '0.90rem',
                        color: isDarkMode ? '#f3f4f6' : '#111827'
                      }}
                      secondaryTypographyProps={{ 
                        fontSize: '0.80rem', 
                        color: isDarkMode ? '#9ca3af' : '#6b7280'
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              <Typography variant="body1" sx={{ mt: 2, ...textStyle }}>
                This facility is a perfect fit for businesses that need to maintain cash flow while ensuring timely delivery of goods, allowing you to focus on growing your business without financial strain.
              </Typography>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default TradeFinanceDetails;
