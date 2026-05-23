import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from "framer-motion";
import { useTheme } from "../../../contexts/ThemeContext";

const cardData = [
  {
    title: "What Is Debtor Finance?",
    description: (
      <>
        <p>
          <strong>Debtor Finance</strong> provides a flexible line of credit using your entire <strong>accounts receivable ledger</strong>. It's perfect for businesses with ongoing invoice flow and offers up to <strong>90% of the ledger value</strong>, helping you maintain smooth operations.
        </p>
        <div style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            <li style={{ display: "flex", alignItems: "center", marginBottom: '0.5rem' }}>
              <CheckCircleIcon sx={{ color: "#24dd93", fontSize: 20, mr: 1, minWidth: 20 }} />
              Advance against total receivables
            </li>
            <li style={{ display: "flex", alignItems: "center", marginBottom: '0.5rem' }}>
              <CheckCircleIcon sx={{ color: "#24dd93", fontSize: 20, mr: 1, minWidth: 20 }} />
              Ideal for consistent cash flow management
            </li>
            <li style={{ display: "flex", alignItems: "center", marginBottom: '0.5rem' }}>
              <CheckCircleIcon sx={{ color: "#24dd93", fontSize: 20, mr: 1, minWidth: 20 }} />
              No property security needed
            </li>
            <li style={{ display: "flex", alignItems: "center" }}>
              <CheckCircleIcon sx={{ color: "#24dd93", fontSize: 20, mr: 1, minWidth: 20 }} />
              Interest only on used funds
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    title: "When to Use Invoice or Debtor Finance?",
    description: (
      <>
        <div style={{ marginBottom: '1rem' }}>
       <p style={{ marginBottom: '1rem' }}> Use <strong>Invoice Finance</strong> if:</p>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            <li style={{ display: "flex", alignItems: "center", marginBottom: '0.5rem' }}>
              <CheckCircleIcon sx={{ color: "#24dd93", fontSize: 20, mr: 1, minWidth: 20 }} />
              You issue large, irregular invoices
            </li>
            <li style={{ display: "flex", alignItems: "center" }}>
              <CheckCircleIcon sx={{ color: "#24dd93", fontSize: 20, mr: 1, minWidth: 20 }} />
              You need fast access to funds from specific customers
            </li>
          </ul>
        </div>
        <div>
        <p style={{ marginBottom: '1rem' }}>Use <strong>Debtor Finance :</strong> if:</p>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            <li style={{ display: "flex", alignItems: "center", marginBottom: '0.5rem' }}>
              <CheckCircleIcon sx={{ color: "#24dd93", fontSize: 20, mr: 1, minWidth: 20 }} />
              You manage regular invoicing
            </li>
            <li style={{ display: "flex", alignItems: "center" }}>
              <CheckCircleIcon sx={{ color: "#24dd93", fontSize: 20, mr: 1, minWidth: 20 }} />
              You need ongoing capital for operations and growth
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
      title: "Recent Clients We've Helped ",
      description: (
        <ul style={{ margin: "0", padding: "0", listStyle: "none" }}>
          <li style={{ display: "flex", alignItems: "flex-start", marginBottom: '1rem' }}>
            <CheckCircleIcon sx={{ color: "#24dd93", fontSize: 20, mr: 1, mt: '3px', minWidth: 20 }} />
            A Sydney logistics firm used invoice finance to cover fuel and wages while awaiting customer payments.
          </li>
          <li style={{ display: "flex", alignItems: "flex-start", marginBottom: '1rem' }}>
            <CheckCircleIcon sx={{ color: "#24dd93", fontSize: 20, mr: 1, mt: '3px', minWidth: 20 }} />
            A Melbourne manufacturing business accessed $250K through debtor finance to purchase bulk materials during peak season.
          </li>
          <li style={{ display: "flex", alignItems: "flex-start" }}>
            <CheckCircleIcon sx={{ color: "#24dd93", fontSize: 20, mr: 1, mt: '3px', minWidth: 20 }} />
            A Gold Coast digital agency bridged a 60-day payment gap between contracts using invoice discounting.
          </li>
        </ul>
      ),
    },
];

export default function Info() {
  const { isDarkMode } = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: isDarkMode ? '#1a1a1a' : '#f0f4f8',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: isDarkMode 
            ? 'radial-gradient(circle at 10% 20%, #2a2a4a, transparent 50%), radial-gradient(circle at 90% 80%, #1a3a3a, transparent 50%)' 
            : 'radial-gradient(circle at 10% 20%, #e0e6ec, transparent 50%), radial-gradient(circle at 90% 80%, #d8e6f0, transparent 50%)',
          opacity: 0.8,
          zIndex: 0,
        },
      }}
    >
      <Grid
        container
        spacing={{ xs: 4, md: 6 }}
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          px: { xs: 2, md: 4 },
          justifyContent: "center",
          alignItems: "stretch",
          position: 'relative',
          zIndex: 1,
        }}
      >
        {cardData.map((card, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            sx={{
              display: "flex",
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <motion.div
              whileHover={{
                y: -12,
                boxShadow: isDarkMode 
                  ? "0 25px 50px rgba(0,0,0,0.6)" 
                  : "0 25px 50px rgba(0,0,0,0.2)",
              }}
              transition={{ duration: 0.3 }}
              style={{ flex: 1, display: "flex", maxWidth: '400px', transformStyle: "preserve-3d" }}
            >
              <Paper
                elevation={0}
                sx={{
                  position: "relative",
                  background: isDarkMode ? "#212121" : "#ffffff",
                  borderRadius: "20px",
                  border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  padding: "2.5rem 2rem",
                  textAlign: "left",
                  color: isDarkMode ? "white" : "#333",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  height: "100%",
                  overflow: 'hidden',
                  transition: "all 0.3s ease",
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-5px',
                    left: '-5px',
                    right: '-5px',
                    bottom: '-5px',
                    borderRadius: '24px',
                    background: 'linear-gradient(45deg, #3264c1, #24dd93, #076a49)',
                    filter: 'blur(10px)',
                    opacity: 0.6,
                    zIndex: -1,
                    transition: 'opacity 0.3s ease, filter 0.3s ease',
                    transform: 'translateZ(-1px) scale(0.95)',
                    pointerEvents: 'none',
                  },
                  '&:hover::before': {
                    opacity: 0.8,
                    filter: 'blur(15px)',
                    transform: 'translateZ(-1px) scale(1.0)',
                  },
                }}
              >
                <Box sx={{
                  position: 'absolute',
                  top: '-15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 'calc(100% + 10px)',
                  height: '60px',
                  background: 'linear-gradient(45deg, #3264c1, #24dd93)',
                  clipPath: 'polygon(5% 0, 95% 0, 100% 100%, 0% 100%)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: `0 8px 15px ${isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`,
                }} />

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    mt: 3,
                    mb: 2,
                    textAlign: 'center',
                    background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                    textShadow: isDarkMode ? "0 0 8px rgba(36, 221, 147, 0.2)" : "none",
                  }}
                >
                  {card.title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    opacity: 0.9,
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    color: isDarkMode ? "rgba(255,255,255,0.9)" : "#555",
                    flexGrow: 1,
                  }}
                >
                  {card.description}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}