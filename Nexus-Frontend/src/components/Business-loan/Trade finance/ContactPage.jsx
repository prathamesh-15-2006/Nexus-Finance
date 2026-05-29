import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import { useTheme } from '../../../contexts/ThemeContext';

const ContactPage = () => {
  const { isDarkMode } = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? '#1e293b' : '#f1f5f9',
        color: isDarkMode ? '#ffffff' : '#0f172a',
        minHeight: '40vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 4,
        borderRadius: '24px',
        margin: '20px auto',
        border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
      }}
    >
      <Container maxWidth="md">
        <PhoneIcon
          sx={{
            fontSize: 60,
            color: isDarkMode ? '#60a5fa' : '#2563eb',
            marginBottom: 2,
          }}
        />
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Ready to Get Started?
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 4 }}>
        Contact us today or apply online for a tailored trade finance solution that meets your business needs. Unlock the potential of your business with Nexus Finance and benefit from flexible funding solutions that grow with you.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'center',
            marginBottom: 4,
          }}
        >
          <Button
            onClick={() => window.open('/?openInquiry=business', '_blank')}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
              fontSize: "1rem",
              px: 4,
              py: 1.5,
              borderRadius: "8px",
              "&:hover": {
                background: "linear-gradient(90deg, #059669 0%, #2563eb 50%, #059669 100%)",
                transform: "scale(1.05)",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Apply Now
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={{
              background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
              fontSize: "1rem",
              px: 4,
              py: 1.5,
              borderRadius: "8px",
              "&:hover": {
                background: "linear-gradient(90deg, #059669 0%, #2563eb 50%, #059669 100%)",
                transform: "scale(1.05)",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Talk to a Specialist
          </Button>
        </Box>
        <Typography variant="body1">
          Empower your business with the working capital you need.
        </Typography>
      </Container>
    </Box>
  );
};

export default ContactPage;