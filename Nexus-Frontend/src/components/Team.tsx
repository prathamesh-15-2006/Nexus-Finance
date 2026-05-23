import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Stack,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import WorkIcon from "@mui/icons-material/Work";

import { gradients } from "../styles/gradients";
import { useTheme } from "../contexts/ThemeContext";

import businessMan from "../asset/experts/leader.png";

const features = [
  { label: "Quick Loan Process" },
  { label: "Small Business Loan" },
  { label: "Very Low Rates" },
  { label: "Easy Bridging Loans" },
];

interface TeamProps {
  isDarkMode?: boolean;
}

const Team: React.FC<TeamProps> = ({ isDarkMode: propIsDarkMode }) => {
  const { isDarkMode: contextIsDarkMode } = useTheme();
  const isDarkMode = propIsDarkMode !== undefined ? propIsDarkMode : contextIsDarkMode;
  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? "#090d16" : "#f0f2f5",
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 4, md: 8 },
        transition: "all 0.5s ease",
      }}
    >
      {/* PAGE HEADING (BLACK/WHITE) */}
      <Typography
        variant="h3"
        fontWeight={900}
        textAlign="center"
        mb={6}
        sx={{ color: isDarkMode ? "#ffffff" : "#000", transition: "color 0.5s ease" }}
      >
        Meet Our Experienced CEO
      </Typography>

      <Grid
        container
        spacing={6}
        alignItems="center"
        sx={{
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        {/* LEFT SIDE */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: 420, sm: 480, md: 550 },
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Main Image */}
            <Box
              component="img"
              src={businessMan}
              alt="CEO"
              sx={{
                width: { xs: 260, sm: 320, md: 380 },
                height: { xs: 320, sm: 380, md: 500 },
                objectFit: "cover",
                borderRadius: 3,
                boxShadow: isDarkMode 
                  ? "0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)" 
                  : "0 20px 50px rgba(0,0,0,0.15)",
                transition: "box-shadow 0.5s ease",
              }}
            />

            {/* 2+ Experience Badge */}
            <Box
              sx={{
                position: "absolute",
                top: 20,
                left: 20,
                width: 110,
                height: 110,
                backgroundColor: "#00bcd4",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              }}
            >
              <PlayArrowIcon />
              <Typography fontWeight={800} fontSize="1.6rem">
                2+
              </Typography>
              <Typography fontSize="0.7rem" textAlign="center">
                Years Experience
              </Typography>
            </Box>

            {/* 20+ Lenders Network */}
            <Box
              sx={{
                position: "absolute",
                bottom: { xs: 10, md: 20 },
                right: { xs: 10, md: 20 },
                background: gradients.primaryBackground,
                color: "#fff",
                px: 3,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 800,
                fontSize: { xs: "1rem", md: "1.2rem" },
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                zIndex: 2,
              }}
            >
              20+ Lenders Network
            </Box>
          </Box>
        </Grid>

        {/* RIGHT SIDE */}
        <Grid size={{ xs: 12, md: 6 }}>
          {/* CEO Name with Gradient Icon */}
          <Stack direction="row" alignItems="flex-start" spacing={2} mb={3}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: gradients.primaryBackground,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                transition: "all 0.5s",
                "&:hover": {
                  transform: "rotate(12deg)",
                },
              }}
            >
              <WorkIcon />
            </Box>

            {/* Name + Subtext */}
            <Box>
              <Typography
                fontWeight={800}
                fontSize={{ xs: "1.5rem", md: "1.9rem" }}
                sx={{ color: isDarkMode ? "#ffffff" : "#000000", transition: "color 0.5s ease" }}
              >
                Prathamesh
              </Typography>

              <Typography
                fontSize={{ xs: "0.9rem", md: "1.5rem" }}
                fontWeight={600}
                sx={{
                  color: isDarkMode ? "#38bdf8" : "#18191a",
                  letterSpacing: 1,
                  transition: "color 0.5s ease",
                }}
              >
                Chief Executive Officer
              </Typography>
            </Box>
          </Stack>

          <Typography sx={{ color: isDarkMode ? "#cbd5e1" : "#555", transition: "color 0.5s ease" }} mb={3}>
            With over 12 years of experience in the finance industry, Prathamesh leads
            our team with a vision for innovative financial solutions. His
            expertise in business lending and client relations has helped
            thousands achieve their financial goals.
          </Typography>

          <Grid container spacing={2} mb={4}>
            {features.map((f) => (
              <Grid size={{ xs: 12, sm: 6 }} key={f.label}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CheckCircleOutlineIcon sx={{ color: isDarkMode ? "#00D4E8" : "#3b82f6", transition: "color 0.5s ease" }} />
                  <Typography fontWeight={600} sx={{ color: isDarkMode ? "#f1f5f9" : "#1e293b", transition: "color 0.5s ease" }}>
                    {f.label}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>

          <Button
            variant="contained"
            endIcon={<DoubleArrowIcon />}
            onClick={() => {
              const element = document.getElementById("call-us-form");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            sx={{
              background: gradients.primaryBackground,
              px: 4,
              py: 1.5,
              fontWeight: 700,
              borderRadius: 3,
              textTransform: "none",
              boxShadow: "0 10px 30px rgba(59,130,246,0.4)",
              transition: "all 0.4s",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 15px 35px rgba(236,72,153,0.5)",
              },
            }}
          >
            Book Free Consultation
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Team;