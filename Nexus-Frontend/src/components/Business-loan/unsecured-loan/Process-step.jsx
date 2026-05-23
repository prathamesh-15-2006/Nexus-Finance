import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme as useMuiTheme,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import LooksThreeIcon from '@mui/icons-material/Looks3';
import { useTheme } from '../../../../src/contexts/ThemeContext';

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";


const ProcessSteps = () => {
  const muiTheme = useMuiTheme();
  const { isDarkMode } = useTheme();

  const cardData = [
    {
      title: "Who We Help",
      listTop: [
        "Hospitality",
        "Construction & trades",
        "Retail & eCommerce",
      ],
    },
    {
      title: "How It Works",
      listTopIcons: [<LooksOneIcon />, <LooksTwoIcon />, <LooksThreeIcon />],
      listTopTexts: [
        "Apply Online in 60s",
        "Upload Statements",
        "Get Funded in 24 hrs",
      ],
    },
    {
      title: "Loan Features",
      listTop: [
        "Amounts: $5k - $500k",
        "Rates: From 7.75% p.a.*",
        "Terms: 3 to 36 months",
      ],
    },
    {
      title: "Eligibility",
      listTop: [
        "Active ABN",
        "Trading for 6+ months",
        "Earning $5k+ per month",
      ],
    },
  ];

  // Theme-based colors
  const primaryColor = isDarkMode ? muiTheme.palette.primary.main : muiTheme.palette.primary.main;
  const secondaryColor = isDarkMode ? muiTheme.palette.secondary.main : muiTheme.palette.secondary.main;
  const backgroundColor = isDarkMode 
    ? '#0f172a'  // slate-900 for dark mode
    : '#f8fafc';  // slate-50 for light mode
  const cardBackgroundColor = isDarkMode 
    ? 'rgba(30, 41, 59, 0.8)'  // slate-800 with opacity
    : 'rgba(255, 255, 255, 0.9)';
  const textColor = isDarkMode 
    ? '#ffffff'  // white for dark mode
    : muiTheme.palette.text.primary;
  const glowColor = isDarkMode 
    ? 'rgba(59, 130, 246, 0.4)'  // blue-500 with opacity
    : 'rgba(16, 185, 129, 0.4)';  // emerald-500 with opacity

  return (
    <Box
      sx={{
        width: "100%",
        py: { xs: 6, md: 10 },
        backgroundColor: backgroundColor,
        transition: "background-color 0.3s ease",
      }}
    >
      <Box sx={{ width: "100%", mx: "auto", px: 0 }}>
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
                                            Our Simple 4-Step Process
                                           </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
          {cardData.map((card, i) => (
            <Grid item xs={12} sm={12} md={12} lg={3} key={i}>
              <Card
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 4,
                  textAlign: 'center',
                  background: cardBackgroundColor,
                  backdropFilter: 'blur(10px)',
                  color: textColor,
                  border: `1px solid ${isDarkMode 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.1)'}`,
                  boxShadow: isDarkMode 
                    ? '0 8px 16px rgba(0, 0, 0, 0.5)' 
                    : '0 8px 16px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: isDarkMode 
                      ? `0 15px 30px rgba(0, 0, 0, 0.6), 0 0 20px ${glowColor}`
                      : `0 15px 30px rgba(0, 0, 0, 0.2), 0 0 20px ${glowColor}`,
                  },
                }}
              >
                <CardContent sx={{ height: '100%', paddingBottom: "3rem" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      mb: 2,
                      color: textColor
                    }}
                  >
                    {card.title}
                  </Typography>

                  {card.contentTop && (
                    <Typography variant="body2" sx={{ mb: 1.5, lineHeight: 1.6 }}>
                      {card.contentTop}
                    </Typography>
                  )}

                  {card.listTopIcons && (
                    <List dense>
                      {card.listTopIcons.map((icon, idx) => (
                        <ListItem key={idx} sx={{ alignItems: 'flex-start' }}>
                          <ListItemIcon sx={{ minWidth: 36, color: primaryColor }}>
                            {icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={card.listTopTexts[idx]}
                            primaryTypographyProps={{ sx: { fontWeight: 500, fontSize: "1rem" } }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}

                  {card.listTop && (
                    <List dense>
                      {card.listTop.map((text, idx) => (
                        <ListItem key={idx} sx={{ alignItems: 'flex-start' }}>
                          <ListItemIcon sx={{ minWidth: 36, color: primaryColor }}>
                            <CheckCircleIcon />
                          </ListItemIcon>
                          <ListItemText primary={text} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProcessSteps;
