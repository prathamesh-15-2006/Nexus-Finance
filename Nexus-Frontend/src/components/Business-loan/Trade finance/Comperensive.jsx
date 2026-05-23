import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Stack,
} from '@mui/material';

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

const TradeFinancePage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 2, sm: 3, md: 4 }, // Adjusted padding for responsiveness
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 3 } }}> {/* Adjusted maxWidth and padding for better mobile experience */}
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 4, md: 6 }, // Responsive padding
            borderRadius: 3,
            textAlign: 'center',
            backdropFilter: 'blur(15px)', // Glass effect
            background: 'linear-gradient(90deg, rgba(37, 99, 235, 0.25) 0%, rgba(5, 150, 105, 0.25) 100%)', // Half blue / half green glass
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <Stack spacing={4}>
            {/* Main Title */}
            <Typography
              variant="h3" // Changed to h3 for better mobile responsiveness
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }, // Responsive font size
                background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)", // Blue to green gradient
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Comprehensive Trade Finance Solutions for Your Business
            </Typography>

            {/* Subtitle / Company Name */}
            <Typography
              variant="h5"
              component="p"
              sx={{ fontStyle: 'italic', color: 'white' }}
            >
              Welcome to Nexus Finance
            </Typography>

            {/* Main Paragraph */}
            <Typography
              variant="body1"
              sx={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'white' }}
            >
              At Nexus Finance, where we offer tailored trade finance solutions that help businesses manage cash flow and supplier payments effectively. Whether you're importing or exporting goods, our flexible trade finance facility ensures you can make timely payments to suppliers, secure better deals, and minimise financial risks in domestic and international trades.
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default TradeFinancePage;
