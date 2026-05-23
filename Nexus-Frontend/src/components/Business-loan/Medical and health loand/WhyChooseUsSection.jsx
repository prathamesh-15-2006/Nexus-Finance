import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import { useTheme } from "../../../contexts/ThemeContext";
import {
  AttachMoney,
  FlashOn,
  Settings,
  SyncAlt,
  CheckCircle,
  LocalHospital,
} from "@mui/icons-material";

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

export default function WhyChooseUsSection() {
  const { isDarkMode } = useTheme();

  const reasons = [
    { 
      icon: <AttachMoney sx={{ fontSize: 60, color: isDarkMode ? "#90caf9" : "#1565c0" }} />, 
      text: "Competitive interest rates" 
    },
    { 
      icon: <FlashOn sx={{ fontSize: 60, color: isDarkMode ? "#90caf9" : "#1565c0" }} />, 
      text: "Fast approval process" 
    },
    { 
      icon: <Settings sx={{ fontSize: 60, color: isDarkMode ? "#90caf9" : "#1565c0" }} />, 
      text: "Tailored loan terms" 
    },
    { 
      icon: <SyncAlt sx={{ fontSize: 60, color: isDarkMode ? "#90caf9" : "#1565c0" }} />, 
      text: "Flexible repayment options" 
    },
    { 
      icon: <CheckCircle sx={{ fontSize: 60, color: isDarkMode ? "#90caf9" : "#1565c0" }} />, 
      text: "No early repayment penalties" 
    },
    { 
      icon: <LocalHospital sx={{ fontSize: 60, color: isDarkMode ? "#90caf9" : "#1565c0" }} />, 
      text: "Access to working capital for equipment, premises, and operations" 
    },
  ];

  return (
    <Box 
      sx={{ 
        py: 8, 
        backgroundColor: isDarkMode ? "#121212" : "#f4f6f8",
        transition: "background-color 0.3s ease",
      }}
    >
      <Container maxWidth="xl">
        {/* Heading */}
        <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{
                  mb: 2,
                  background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                                  fontWeight:800,

                  display: "inline-block",
                  fontSize: { xs: "1.8rem", sm: "2.2rem", md: "3rem" }, // responsive font sizes
                  textAlign: "center",
                  width: "100%", // ensures center alignment
                  lineHeight: 1.2,
                }}
              >
                Why choose Nexus Finance For your Health business
              </Typography>
        

        {/* Circle Grid - 3 per row */}
        <Grid container spacing={4} sx={{ mt: 4, justifyContent: 'center' }}>
          {reasons.map((reason, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{ 
                textAlign: "center",
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Paper
                elevation={4}
                sx={{
                  width: 200,
                  height: 200,
                  margin: "0 auto",
                  borderRadius: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isDarkMode ? "#1e1e1e" : "white",
                  padding: 3,
                  textAlign: "center",
                  border: isDarkMode ? "1px solid #333333" : "1px solid #e0e0e0",
                  boxShadow: isDarkMode 
                    ? "0 4px 12px rgba(0,0,0,0.3)" 
                    : "0 4px 12px rgba(0,0,0,0.08)",
                  "&:hover": {
                    backgroundColor: isDarkMode ? "#263238" : "#e3f2fd",
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Box sx={{ mb: 1 ,color: isDarkMode ? "#20d961ff" : "#15c068ff" }}>
                  {reason.icon}
                </Box>
                <Typography
                  variant="body2"
                  fontWeight={500}
                  sx={{ 
                    fontSize: "0.85rem",
                    lineHeight: 1.3,
                    maxWidth: "150px",
                    color: isDarkMode ? "white" : "black",
                    transition: "color 0.3s ease",
                  }}
                >
                  {reason.text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
