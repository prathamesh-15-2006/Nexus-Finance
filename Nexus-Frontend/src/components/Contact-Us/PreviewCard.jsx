import React from "react";
import { Box, Typography, Button, Chip, Stack, Paper, Container } from "@mui/material";
import BakingBanner from "../../asset/ContactPage/commericalFinance/CommercialFinance1.avif";
import { BakeryDining } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function BakingBlogHeader() {
    const navigate = useNavigate();
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box
         sx={{
          position: "relative",
          height: { xs: 400, md: 450 },
          borderRadius: 4,
          overflow: "hidden",
          backgroundImage: `url(${BakingBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: 4,
          cursor: "pointer",
          transition: "transform 0.5s ease, filter 0.5s ease",
          "&:hover": {
            transform: "scale(1.05)", // zoom effect
            filter: "brightness(1.15)", // brighten
            boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
          },
        }}
        onClick={() => navigate("/Blog/Commercial-Finance")}
      >
        {/* Curved Overlay */}
        <Paper
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            p: { xs: 2, md: 4 },
            maxWidth: { xs: "100%", md: "55%" },
            background: "rgba(255, 248, 240, 0.9)",
            borderTopLeftRadius: "80px",
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            backdropFilter: "blur(6px)",
            boxShadow: "0px -4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <Chip
              label="Latest Blog"
              sx={{
                backgroundColor: "#ffb74d",
                fontWeight: "bold",
                color: "#fff",
              }}
            />
            {/* <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            July 23, 2025
            </Typography> */}
          </Stack>

          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1, color: "#5d4037" }}>
          Commercial Finance in Sydney: A Guide for Business Owners
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={2}>
          Explore commercial finance options in Sydney with Nexusinance. Call 9370439566r click here to learn more from expert finance brokers.
          </Typography>

          <Button
            variant="contained"
            startIcon={<BakeryDining />}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: "bold",
              background: "linear-gradient(45deg, #00bfa5, #1976d2)", // blue-green mix
    "&:hover": {
      background: "linear-gradient(45deg, #1976d2, #00bfa5)", // reverse on hover
    },
            }}
          >
            See More..
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}
