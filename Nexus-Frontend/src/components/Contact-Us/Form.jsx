import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowForward } from '@mui/icons-material';
import banner from '../../asset/bgimgs/banner.webp';



const ContactForm = () => {
  const gradientText = {
    background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
  };

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          overflow: 'hidden',
        }}
      >
        {/* Background Image */}
        <Box
          component="img"
          src={banner}
          alt="Business Credit"
          loading="eager"
          decoding="async"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: { xs: 'contain', md: 'cover' },
            objectPosition: 'center',
            zIndex: 1,
            backgroundColor: '#000',
            imageRendering: 'crisp-edges',
            WebkitImageRendering: 'optimize-contrast',
          }}
        />

        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 2,
          }}
        />

        {/* Text Content */}
        <Container
          maxWidth="lg"
          sx={{
            padding: { xs: 3, sm: 4 },
            zIndex: 3,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              ...gradientText,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              lineHeight: 1.2,
              mb: 3,
            }}
          >
            Reliable Business Line Of Credit 
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              fontWeight: 400,
              mb: 4,
              opacity: 0.9,
              color: 'white',
            }}
          >
            Fast, flexible financing solutions for businesses across 
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
            endIcon={<ArrowForward />}
            sx={{
              background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
              color: 'white',
              px: 4,
              py: 2,
              fontSize: '1.1rem',
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
        </Container>
      </Box>

      {/* Other Sections */}
     
    </>
  );
};

export default ContactForm;
