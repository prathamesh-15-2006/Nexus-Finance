import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import Banner from '../../../asset/bgimgs/image.webp';
import Benefits from './Benefits';
import Faq from './Faq';
import BusinessSection from './BusinessSection';
import Card from './card';
import Why_we from './Why_we';

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

export default function Front() {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "110vh",
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
              maxWidth: "10000px",
              margin: "0 auto",
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
              Reliable Business Line Of Credit 
            </Typography>
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button
                                 onClick={() => window.open('/?openInquiry=business', '_blank')}

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
                Apply Now
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

      <BusinessSection />
      <Benefits />
      <Card />
      <Why_we />
      <Faq />
    </>
  );
}
