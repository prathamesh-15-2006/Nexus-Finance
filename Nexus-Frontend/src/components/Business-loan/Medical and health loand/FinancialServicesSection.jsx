import { Box, Typography, Container, useTheme } from "@mui/material";
import { useTheme as useCustomTheme } from "../../../contexts/ThemeContext";
import financeImg from "../../../asset/medical/support.webp"; // replace with your image path

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

export default function FinancialServicesSection() {
  const { isDarkMode } = useCustomTheme();
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        py: 8, 
        backgroundColor: isDarkMode ? "#121212" : "#f8f9fa",
        transition: "background-color 0.3s ease"
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            position: "relative",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: isDarkMode 
              ? "0px 4px 20px rgba(0,0,0,0.5)" 
              : "0px 4px 20px rgba(0,0,0,0.15)",
            transition: "box-shadow 0.3s ease"
          }}
        >
          {/* Background Image */}
          <Box
            component="img"
            src={financeImg}
            alt="Financial Services"
            sx={{
              width: "100%",
              height: { xs: 300, md: 400 },
              objectFit: "cover",
              display: "block",
              filter: isDarkMode ? "brightness(0.8)" : "none",
              transition: "filter 0.3s ease"
            }}
          />
          
          {/* Overlay Content */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: isDarkMode 
                ? "linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)"
                : "linear-gradient(90deg, rgba(13,71,161,0.8) 0%, rgba(13,71,161,0.4) 50%, rgba(13,71,161,0.1) 100%)",
              display: "flex",
              alignItems: "center",
              padding: { xs: 3, md: 6 },
              transition: "background 0.3s ease"
            }}
          >
            <Box sx={{ maxWidth: { xs: "100%", md: "50%" } }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                 sx={{ mb: 2, 
                     background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                                        fontWeight:800,

                        color: "transparent",
                        WebkitTextFillColor: "transparent",
                        display: "inline-block",  
                                  
                  
                  transition: 'color 0.3s ease',}}
              >
                Financial Services for Healthcare Professionals
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.15rem",
                  lineHeight: 1.8,
                  color: "white",
                  textAlign: { xs: "center", md: "left" },
                  textShadow: isDarkMode ? "0 1px 2px rgba(0,0,0,0.8)" : "0 1px 2px rgba(0,0,0,0.3)"
                }}
              >
                We provide tailored financial solutions designed to meet the
                unique needs of healthcare professionals. Whether you're running
                a private practice, managing a medical facility, or offering
                specialized care, our services help you achieve financial
                stability and growth with confidence.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
