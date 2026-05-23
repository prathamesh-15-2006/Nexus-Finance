import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { useTheme } from '../../contexts/ThemeContext';
import { gradients } from '../../styles/gradients';

const steps = [
  { title: 'Apply Online', description: 'Fill out our quick form and get an\n instant eligibility check.', icon: '📝' },
  { title: 'Free Consultation', description: 'Get personalized advice from our expert team.', icon: '📞' },
  { title: 'Use Our Loan Calculator', description: 'Estimate repayments and interest rates easily.', icon: '💰' },
  { title: 'Approval & Settlement', description: 'Fast funding, usually within 5–15 days.', icon: '✅' },
];

const gradientTextStyle = {
  ...gradients.primaryText,
  display: "inline-block",
};

export default function ProcessStepsSection() {
  const { isDarkMode } = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 } }}>
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          sx={{ mb: 2, ...gradientTextStyle, ml: { xs: 0, md: 65} }} // Responsive margin
        >
          Simple, Secure, Stress-Free
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{
            mb: { xs: 5, md: 8 },
            color: isDarkMode ? '#94a3b8' : '#475569',
            fontSize: { xs: '1.2rem', md: '1.5rem' }, // Responsive font size
          }}
        >
          Just follow these easy steps to get started.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {steps.map((step, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Paper
                sx={{
                  textAlign: 'center',
                  borderRadius: 3,
                  backgroundColor: isDarkMode ? '#1e293b' : '#fff',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 280,
                  width: '100%',
                  maxWidth: 280,
                  mx: 'auto',
                }}
              >
                <Box>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: gradients.primaryBackground,
                      color: '#fff',
                      fontSize: { xs: 24, md: 28 }, // Responsive icon size
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, ...gradientTextStyle }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: isDarkMode ? '#cbd5e1' : '#64748b' }}>
                    {step.description}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
