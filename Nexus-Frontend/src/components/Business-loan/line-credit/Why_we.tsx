import React from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import BusinessIcon from '@mui/icons-material/Business';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useTheme } from '../../../contexts/ThemeContext';

// Gradient variable for consistent theme
const gradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";
const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";


interface SquareCardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
}

const SquareCard: React.FC<SquareCardProps> = ({ title, content, icon }) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      style={{ flex: 1 }}
    >
      <Paper
        elevation={6}
        sx={{
          borderRadius: 4,
          p: 4,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: isDarkMode ? '#0f172a' : '#ffffff',
          color: isDarkMode ? '#f1f5f9' : '#1e293b',
          border: '1px solid',
          borderColor: isDarkMode ? '#334155' : '#e2e8f0',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            borderColor: isDarkMode ? '#475569' : '#cbd5e1',
          },
        }}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <Box
            mr={2}
            sx={{
              background: gradient,
              color: '#fff',
              p: 1.2,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
            }}
          >
            {icon}
          </Box>
           <Typography
                                                               textAlign="center"
                                                               gutterBottom
                                                               sx={{
                                                                 backgroundImage: cardGradient,
                                                                 backgroundSize: "200%",
                                                                 fontSize: "1.55rem",
                                                                 fontWeight: 800,
                                                                 backgroundClip: "text",
                                                                 textFillColor: "transparent",
                                                                 WebkitBackgroundClip: "text",
                                                                 WebkitTextFillColor: "transparent",
                                                                 mb: 5,
                                                               }}
                                                             >
{title}
                                                             </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: isDarkMode ? '#cbd5e1' : '#475569',
          }}
        >
          {content}
        </Typography>
      </Paper>
    </motion.div>
  );
};

interface CircleCardProps {
  title: string;
}

const CircleCard: React.FC<CircleCardProps> = ({ title }) => {
  return (
  
    <motion.div
    whileHover={{ scale: 1.12, rotate: 1 }}
    initial={{ opacity: 0, scale: 0.85 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.45, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    <Box
      sx={{
        position: "relative",
        width: 180,
        height: 180,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #3b82f6, #22c55e)", // Fixed blue-green gradient
        padding: "8px", // outer ring
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `
          0 12px 25px rgba(0,0,0,0.25),
          0 0 25px rgba(59,130,246,0.5),
          0 0 35px rgba(34,197,94,0.4)
        `,
      }}
    >
      {/* Inner glass area */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          color: "#fff",
          fontWeight: "bold",
          fontSize: "1.1rem",
          textAlign: "center",
          letterSpacing: "0.5px",
          border: "2px solid rgba(255,255,255,0.15)",
          boxShadow: `
            inset 0 4px 12px rgba(255,255,255,0.1),
            inset 0 -4px 12px rgba(0,0,0,0.2)
          `,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            fontSize: "1.15rem",
            lineHeight: 1.4,
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Reflection arc */}
      <Box
        sx={{
          position: "absolute",
          top: "5%",
          left: "12%",
          width: "60%",
          height: "20%",
          background: "rgba(255,255,255,0.25)",
          borderRadius: "50%",
          filter: "blur(10px)",
          transform: "rotate(-15deg)",
        }}
      />

      {/* Bottom glow fade */}
      <Box
        sx={{
          position: "absolute",
          bottom: "-15%",
          width: "80%",
          height: "40%",
          background: "radial-gradient(circle, rgba(34,197,94,0.4), transparent)",
          filter: "blur(20px)",
        }}
      />
    </Box>
  </motion.div>
  );
};

const Why_we: React.FC = () => {
  const { isDarkMode } = useTheme();
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 3 },
        background: isDarkMode ? '#0f172a' : '#f1f5f9',
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
        {/* Heading */}
        <Box textAlign="center" mb={8}>
           <Typography
                                                               variant="h3"
                                                               textAlign="center"
                                                               gutterBottom
                                                               sx={{
                                                                 backgroundImage: cardGradient,
                                                                 backgroundSize: "200%",
                                                                 backgroundClip: "text",
                                                                 textFillColor: "transparent",
                                                                 WebkitBackgroundClip: "text",
                                                                                                    fontWeight:800,

                                                                 WebkitTextFillColor: "transparent",
                                                                 mb: 5,
                                                               }}
                                                             >
                                                                          Business Line of Credit – Flexible Funding With Nexus Finance

                                                             </Typography>
        </Box>

        {/* Side-by-side Cards */}
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          gap={4}
          mb={10}
        >
          <SquareCard
            title="Smart, Flexible Credit"
            content="Manage cash flow, cover costs, and grow with our tailored business line of credit. Low-doc options up to $250,000 and rates starting at 7.95%."
            icon={<BusinessIcon fontSize="large" />}
          />
          <SquareCard
            title="Fast Approvals, Smarter Borrowing"
            content="Quick processing to get you funded fast. Ideal for cash flow gaps, marketing, or emergency expenses — made simple and effective."
            icon={<FlashOnIcon fontSize="large" />}
          />
        </Box>

        {/* Circle Cards Section */}
        <Box textAlign="center">
           <Typography
                                                               variant="h3"
                                                               textAlign="center"
                                                               gutterBottom
                                                               sx={{
                                                                 backgroundImage: cardGradient,
                                                                 backgroundSize: "200%",
                                                                 backgroundClip: "text",
                                                                 textFillColor: "transparent",
                                                                 WebkitBackgroundClip: "text",
                                                                                                    fontWeight:800,

                                                                 WebkitTextFillColor: "transparent",
                                                                 mb: 5,
                                                               }}
                                                             >
Why Choose Nexus Finance?
                                                             </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: { xs: 2, md: 4 },
              my: 5,
            }}
          >
            <CircleCard title="50+ Lenders" />
            <CircleCard title="Startup Friendly" />
            <CircleCard title="Fast Decisions" />
            <CircleCard title="Extra Savings" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Why_we;
