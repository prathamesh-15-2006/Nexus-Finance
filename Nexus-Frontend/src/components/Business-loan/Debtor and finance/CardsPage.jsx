import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";

export default function CardsPage() {
  const sections = [
    {
      title: "Invoice Finance & Debtor Finance Solutions – Fast, Flexible Cash Flow for ses",
      description:
        "At Nexus Finance, based in  businesses unlock cash flow and stay competitive with smart, low-doc Invoice Finance and Debtor Finance solutions. Whether you're a small business owner or a large enterprise, our funding options from $5,000 to $150 million are designed to free up working capital — no property security required. Get pre-approved within 48 hours and access up to 95% of your unpaid invoices fast.",
      gradient: "linear-gradient(135deg, #2196f3, #21cbf3)", // Blue
    },
    {
      title: "What Is Invoice Finance?",
      description:
        "Also known as invoice discounting, Invoice Finance lets you access up to 95% of the value of unpaid invoices before customers pay. It’s ideal for covering payroll, paying suppliers, or managing tax obligations — especially when customers delay payment.",
      subTitle: "Key Features:",
      list:["Up to 95% of invoice value advanced","No real estate or additional collateral","Proof of delivery may be required","Repay once your customer pays"],
      gradient: "linear-gradient(135deg, #4caf50, #81c784)", // Green
    },
    
  ];

  return (
    
    <Box
    sx={{
      p: { xs: 2, md: 8 },
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff", // White background
    }}
  >
    <Grid container spacing={5} justifyContent="center" alignItems="stretch">
      {sections.map((sec, index) => (
        <Grid item xs={12} md={6} key={index} sx={{ display: "flex" }}>
          <Box
            sx={{
              flex: 1,
              p: "2px", // Border thickness
              borderRadius: "20px",
              background: "linear-gradient(270deg, #00aaff, #00ff88, #ff00ff)",
              backgroundSize: "600% 600%",
              animation: "borderMove 8s ease infinite",
              "@keyframes borderMove": {
                "0%": { backgroundPosition: "0% 50%" },
                "50%": { backgroundPosition: "100% 50%" },
                "100%": { backgroundPosition: "0% 50%" },
              },
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 5,
                borderRadius: "18px",
                background: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                color: "#333",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "left",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
                transition: "all 0.4s ease",
                animation: "floatCard 6s ease-in-out infinite",
                "@keyframes floatCard": {
                  "0%, 100%": { transform: "translateY(0px)" },
                  "50%": { transform: "translateY(-8px)" },
                },
                "&:hover": {
                  transform: "translateY(-10px) scale(1.03)",
                  boxShadow: "0 0 25px rgba(0, 255, 170, 0.6), 0 0 50px rgba(0, 200, 255, 0.4)",
                },
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{
                    mb: 2,
                    background: "linear-gradient(90deg, #00aaff, #00ff88)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {sec.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6, color: "#555" }}>
                  {sec.description}
                </Typography>
                {sec.subTitle && (
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ mb: 1, color: "#333" }}
                  >
                    {sec.subTitle}
                  </Typography>
                )}
                {sec.list && (
                  <List dense sx={{ pl: 2, color: "#555" }}>
                    {sec.list.map((item, i) => (
                      <ListItem key={i} disablePadding>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            </Paper>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Box>
  );
}
