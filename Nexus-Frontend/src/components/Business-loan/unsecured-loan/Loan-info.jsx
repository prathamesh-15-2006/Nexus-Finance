import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";

const LoanInfoPage = () => {
  const cardData = [
    {
      title: "Home Loans",
      description:
        "Flexible home loans with competitive rates and personal guidance for your dream home.",
      icon: <HomeIcon sx={{ fontSize: 40, color: "#ffffff" }} />
    },
    {
      title: "Business Loans",
      description:
        "Boost your business with our fast, flexible loan options and expert support.",
      icon: <BusinessIcon sx={{ fontSize: 40, color: "#ffffff" }} />
    },
    {
      title: "Personal Loans",
      description:
        "Finance life events with stress-free personal loans and quick approvals.",
      icon: <PersonIcon sx={{ fontSize: 40, color: "#ffffff" }} />
    },
    {
      title: "Education Loans",
      description:
        "Empower your future with affordable education loans for top institutions.",
      icon: <SchoolIcon sx={{ fontSize: 40, color: "#ffffff" }} />
    }
  ];

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #4e54c8, #8f94fb)",
        py: 8
      }}
    >
      <Container>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mb: 6, color: "#ffffff", fontWeight: 700 }}
        >
          Explore Our Loan Services
        </Typography>
        <Grid container spacing={8} justifyContent="center">
          {cardData.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  borderRadius: 4,
                  height: "100%",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  color: "#ffffff",
                  textAlign: "center",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)"
                  },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 3
                }}
              >
                {card.icon}
                <Typography
                  variant="h6"
                  sx={{ mt: 2, fontWeight: 700 }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 1 }}
                >
                  {card.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LoanInfoPage;
