import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import Banner from '../../../asset/Trade/image.webp';
import TradeFinancePage from './Comperensive';
import TradeFinanceDetails from './TradeFinanceDetail';
import TradeFinanceBenefits from './TradeBenifits';
import FaqSection from './TradeFaqQuestion';

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

export default function Trade() {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
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
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Box
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(8px)",
              borderRadius: "20px",
              padding: { xs: "20px", md: "40px" },
              display: "inline-block",
              maxWidth: "100%",
              margin: "0 auto",
              width: "100%",
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: "2.25rem", sm: "3rem" },
                fontWeight: 700,
                mb: 5,
                textAlign: "center",
                background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Professional Trade Finance Services 
            </Typography>
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button
                                               onClick={() => window.open('https://Nexusfinance.afos.io/business-loans/quick-quote', '_blank')}

                
                variant="contained"
                size="large"
                sx={{
                  background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
                  color: 'white',
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  borderRadius: '50px',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Get Started Today
              </Button>
            </Box>
          </Box>
        </Container>

        <style>
          {`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeInDown {
              from { opacity: 0; transform: translateY(-20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
      </Box>

      <TradeFinancePage />
      <TradeFinanceDetails />
      <TradeFinanceBenefits />
      <FaqSection />
    </>
  );
}
