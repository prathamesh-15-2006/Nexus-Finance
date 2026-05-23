import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BusinessIcon from "@mui/icons-material/Business";
import { useTheme } from "../../contexts/ThemeContext";
import { gradients } from "../../styles/gradients";

const FinanceAccordionSection = () => {
  const { isDarkMode } = useTheme();
  const [expanded, setExpanded] = useState(true);

  return (
    <Box
      sx={{
        bgcolor: isDarkMode ? "#1a1a1a" : "#f8fafc",
        py: { xs: 6, sm: 8 },
        transition: "background-color 0.3s ease",
      }}
    >
      <Container maxWidth="md">
        {/* Section Header */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              ...gradients.primaryText,
              display: "inline-block",          
              mb: 2,
            }}
          >
            Fast & Flexible Business Finance
          </Typography>
          <Typography
            variant="body1"
            sx={{
              ...gradients.primaryText,
              display: "inline-block",                        maxWidth: "650px",
              mx: "auto",
            }}
          >
            We make commercial lending simple and effective. Explore our top
            financing solutions designed to help your business thrive.
          </Typography>
        </Box>

        {/* Accordion */}
        <Accordion
          expanded={expanded}
          onChange={() => setExpanded(!expanded)}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 4,
            bgcolor:     isDarkMode ? "#424242" : "#e0e0e0",

            border: `1px solid ${
              isDarkMode ? "#424242" : "#e0e0e0"
            }`,
            "&:before": { display: "none" }, // remove default divider line
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon color="primary" />}
            sx={{
              "&:hover": {
                bgcolor: isDarkMode
                  ? "#424242"
                  : "#f5f5f5",
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <BusinessIcon color="primary" />
              <Typography
                variant="h6"
                sx={{
                  ...gradients.primaryText,
                  display: "inline-block",                            fontWeight: 600,
                }}
              >
                Commercial Property Finance
              </Typography>
            </Box>
          </AccordionSummary>

          <AccordionDetails
            sx={{
              borderTop: `1px solid ${
                isDarkMode ? "#424242" : "#e0e0e0"
              }`,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: isDarkMode ? "#e9e6e6ff" : "#0f0404ff",
                mb: 3,
              }}
            >
              Unlock capital to purchase, refinance, or invest in
              income-producing real estate with our tailored commercial
              property loans.
            </Typography>

            {/* Key Features */}
            <Paper
              variant="outlined"
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: isDarkMode
                  ? "#020101ff"
                  : "#fbf8f8ff",
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{
                  color: isDarkMode ? "grey.100" : "grey.900",
                  mb: 2,
                }}
              >
                Key Features:
              </Typography>
              <List dense>
                <ListItem disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <strong>Loan amounts:</strong> from $100K
                      </>
                    }
                    sx={{ color: isDarkMode ? "#f4ebebff" : "grey.700" }}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <strong>Interest rates:</strong> from 7.99% p.a.*
                      </>
                    }
                    sx={{ color: isDarkMode ? "grey.300" : "grey.700" }}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <strong>Maximum LVR:</strong> up to 80%
                      </>
                    }
                    sx={{ color: isDarkMode ? "grey.300" : "grey.700" }}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <strong>Pre-approval:</strong> in 24–48 hours
                      </>
                    }
                    sx={{ color: isDarkMode ? "grey.300" : "grey.700" }}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <strong>Settlement:</strong> in 10–15 business days
                      </>
                    }
                    sx={{ color: isDarkMode ? "grey.300" : "grey.700" }}
                  />
                </ListItem>
              </List>
            </Paper>
          </AccordionDetails>
        </Accordion>
      </Container>
    </Box>
  );
};

export default FinanceAccordionSection;
