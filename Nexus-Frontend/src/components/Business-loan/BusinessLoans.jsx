import React from 'react';
import { Box, Typography, Container, Button, Grid, Card, CardContent, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import Banner from '../../asset/bgimgs/banner.webp';

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

const loanTypes = [
  {
    title: 'Unsecured Business Loans',
    description: 'Flexible financing without collateral requirements. Perfect for businesses needing quick access to working capital.',
    link: '/Nexus-Finance/Business-loans/Unsecured-business-loans'
  },
  {
    title: 'Business Line of Credit',
    description: 'Revolving credit facility for ongoing business expenses. Draw funds as needed and pay interest only on what you use.',
    link: '/Nexus-Finance/Business-loans/Business-line-of-credit'
  },
  {
    title: 'Business Overdraft',
    description: 'Short-term borrowing solution for temporary cash flow gaps. Access funds beyond your account balance when needed.',
    link: '/Nexus-Finance/Business-loans/Business-overdraft'
  },
  {
    title: 'Low Doc Business Loans',
    description: 'Streamlined lending with minimal documentation. Ideal for businesses with strong cash flow but limited paperwork.',
    link: '/Nexus-Finance/Business-loans/Low-doc-business-loans'
  },
  {
    title: 'Medical & Health Loans',
    description: 'Specialized financing for healthcare practices and medical equipment. Support your practice growth and patient care.',
    link: '/Nexus-Finance/Business-loans/Medical-&-health-loans'
  },
  {
    title: 'ATO Tax Debt Loans',
    description: 'Consolidate and manage tax obligations with flexible repayment terms. Get back on track with professional guidance.',
    link: '/Nexus-Finance/Business-loans/Ato-tax-debt-loans'
  },
  {
    title: 'Debtor & Invoice Finance',
    description: 'Turn outstanding invoices into immediate cash flow. Finance your receivables and accelerate business growth.',
    link: '/Nexus-Finance/Business-loans/Debtor-&-invoice-finance'
  },
  {
    title: 'Trade Finance',
    description: 'Support international trade and supply chain operations. Secure financing for imports, exports, and trade activities.',
    link: '/Nexus-Finance/Business-loans/Trade-finance'
  },
  {
    title: 'Start-Up Business Loans',
    description: 'Launch your entrepreneurial dreams with specialized funding. Get the capital you need to start and grow your business.',
    link: '/Nexus-Finance/Business-loans/Start-up-business-loans'
  }
];

export default function BusinessLoans() {
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
              Business Loans
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
              Discover the perfect financing solution for your business needs. From unsecured loans to specialized trade finance, we have options to fuel your growth.
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

      {/* Loan Types Grid */}
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
          Explore Our Business Loan Options
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Row 1 */}
          <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
            {loanTypes.slice(0, 3).map((loan, index) => (
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
                    {loan.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: themeColors.description,
                      lineHeight: 1.6,
                      textAlign: 'center'
                    }}
                  >
                    {loan.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    component={Link}
                    to={loan.link}
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

          {/* Row 2 */}
          <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
            {loanTypes.slice(3, 6).map((loan, index) => (
              <Card
                key={index + 3}
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
                    {loan.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: themeColors.description,
                      lineHeight: 1.6,
                      textAlign: 'center'
                    }}
                  >
                    {loan.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    component={Link}
                    to={loan.link}
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

          {/* Row 3 */}
          <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
            {loanTypes.slice(6, 9).map((loan, index) => (
              <Card
                key={index + 6}
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
                    {loan.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: themeColors.description,
                      lineHeight: 1.6,
                      textAlign: 'center'
                    }}
                  >
                    {loan.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    component={Link}
                    to={loan.link}
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
        </Box>
      </Container>
    </>
  );
}
