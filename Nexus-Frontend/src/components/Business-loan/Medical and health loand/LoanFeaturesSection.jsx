import { Box, Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { AttachMoney, FlashOn, Settings, CheckCircle } from "@mui/icons-material";
import { useTheme } from "../../../contexts/ThemeContext";

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

export default function LoanFeaturesSection() {
  const { isDarkMode } = useTheme();

  const features = [
    {
      icon: <AttachMoney sx={{ fontSize: 40, color: isDarkMode ? "#90caf9" : "#0d47a1" }} />,
      title: "Competitive Interest Rates",
      description:
        "Specially designed rates for healthcare businesses to help you save more.",
    },
    {
      icon: <FlashOn sx={{ fontSize: 40, color: isDarkMode ? "#90caf9" : "#0d47a1" }} />,
      title: "Fast Approval & Disbursement",
      description:
        "Quick processing so you can access funds when you need them most.",
    },
    {
      icon: <Settings sx={{ fontSize: 40, color: isDarkMode ? "#90caf9" : "#0d47a1" }} />,
      title: "Tailored Loan Terms",
      description:
        "Flexible terms aligned with your business cash flow and requirements.",
    },
    {
      icon: <CheckCircle sx={{ fontSize: 40, color: isDarkMode ? "#90caf9" : "#0d47a1" }} />,
      title: "No Early Repayment Fees",
      description:
        "Enjoy full control of your loan without penalty for early settlement.",
    },
  ];

  return (
    <Box 
      sx={{ 
        py: 8, 
        backgroundColor: isDarkMode ? "#121212" : "#f8f9fa",
        transition: "background-color 0.3s ease"
      }}
    >
      <Container maxWidth="lg">
        {/* Heading */}
        <Typography 
               variant="h4" 
               align="center" 
               fontWeight="bold" 
               gutterBottom
               sx={{ mb: 2, 
                            background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
                               backgroundClip: "text",
                               WebkitBackgroundClip: "text",
                               color: "transparent",
                                               fontWeight:800,

                               WebkitTextFillColor: "transparent",
                               display: "inline-block",  
                                              fontSize: { xs: '2rem', md: '3rem' },
                         
                         transition: 'color 0.3s ease',}}
             >
              Nexus-Finance Health Care Professionals Finacial Solutions
             </Typography>

        {/* Subheading */}
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            maxWidth: 800,
            mx: "auto",
            mb: 6,
            fontSize: "1.15rem",
            color: isDarkMode ? "#b0b0b0" : "#555",
            transition: "color 0.3s ease"
          }}
        >
          We provide tailored loan products to empower healthcare professionals
          with financial freedom and growth opportunities.
        </Typography>

        {/* Features Grid */}
        <Grid 
          container 
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: 280,
                  width: 250,
                  borderRadius: 3,
                  textAlign: "center",
                  p: 2,
                  backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
                  border: isDarkMode ? "1px solid #333333" : "1px solid #e0e0e0",
                  boxShadow: isDarkMode 
                    ? "0px 4px 20px rgba(0,0,0,0.3)"
                    : "0px 4px 20px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, border-color 0.3s ease",
                  "&:hover": { 
                    transform: "translateY(-5px)",
                    boxShadow: isDarkMode
                      ? "0px 8px 30px rgba(0,0,0,0.4)"
                      : "0px 8px 30px rgba(0,0,0,0.15)"
                  },
                  display: "flex",
                  flexDirection: "column",
                  mx: "auto",
                }}
              >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    {feature.icon}
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ mb: 2, 
                            background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
                               backgroundClip: "text",
                               WebkitBackgroundClip: "text",
                               color: "transparent",
                               WebkitTextFillColor: "transparent",
                               display: "inline-block",  
                                              
                         
                         transition: 'color 0.3s ease',}}
             >
                    
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ 
                      color: isDarkMode ? "#b0b0b0" : "#555",
                      lineHeight: 1.6, 
                      minHeight: 80,
                      transition: "color 0.3s ease"
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
