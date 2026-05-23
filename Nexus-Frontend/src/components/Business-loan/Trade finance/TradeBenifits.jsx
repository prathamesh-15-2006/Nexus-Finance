import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  styled,
  useTheme as useMuiTheme,
} from '@mui/material';
import { useTheme } from '../../../contexts/ThemeContext';

import LightbulbIcon from '@mui/icons-material/Lightbulb'; // Section 1
import SettingsIcon from '@mui/icons-material/Settings'; // Section 2
import TrackChangesIcon from '@mui/icons-material/TrackChanges'; // Section 3

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";


const GlassPaper = styled(Paper)(({ theme, isDarkMode }) => ({
  borderRadius: 16,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: isDarkMode 
    ? 'rgba(255, 255, 255, 0.08)' 
    : 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(15px) scale(0.95)',
  border: `1px solid ${isDarkMode 
    ? 'rgba(255, 255, 255, 0.15)' 
    : 'rgba(0, 0, 0, 0.1)'}`, 
  color: isDarkMode ? 'white' : '#1a1a1a',
  boxShadow: isDarkMode
    ? '0 0 20px rgba(255,255,255,0.05)' 
    : '0 8px 32px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: isDarkMode 
      ? '0 0 25px rgba(0, 200, 255, 0.8)' 
      : '0 0 25px rgba(0, 100, 255, 0.4)',
    backgroundColor: isDarkMode 
      ? 'rgba(255, 255, 255, 0.15)' 
      : 'rgba(255, 255, 255, 1)',
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
    borderRadius: 12,
  },
}));

const FeatureBox = styled(Box)(({ theme, bgcolor, isDarkMode }) => ({
  backgroundColor: isDarkMode ? '#008080' : bgcolor,
  borderRadius: '12px',
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 80,
  marginRight: theme.spacing(2),
  color: '#fff',
  fontSize: '2rem',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: isDarkMode 
      ? '0 0 15px rgba(0, 200, 255, 0.6)' 
      : '0 0 15px rgba(0, 100, 255, 0.3)',
  },
  [theme.breakpoints.down('md')]: {
    minWidth: 60,
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    fontSize: '1.5rem',
    padding: theme.spacing(1.5),
  },
}));

const TradeFinanceBenefits = () => {
  const { isDarkMode } = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <Box sx={{ 
      bgcolor: isDarkMode ? '#121212' : '#f8fafc', 
      minHeight: '100vh', 
      py: 8,
      transition: 'background-color 0.3s ease',
      [muiTheme.breakpoints.down('md')]: {
        py: 4,
      },
    }}>
      <Container maxWidth="lg">
        {/* Section 1 */}
        <GlassPaper isDarkMode={isDarkMode}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FeatureBox bgcolor="#4CAF50" isDarkMode={isDarkMode}>
              <LightbulbIcon sx={{ fontSize: '2.5rem' }} />
            </FeatureBox>
            <Box>
                <Typography
                                                             variant="h4"
                                                             textAlign="center"
                                                             gutterBottom
                                                             sx={{
                                                               backgroundImage: cardGradient,
                                                               backgroundSize: "200%",
                                                                                                  fontWeight:800,
              
                                                               backgroundClip: "text",
                                                               textFillColor: "transparent",
                                                               WebkitBackgroundClip: "text",
                                                               WebkitTextFillColor: "transparent",
                                                               mb: 5,
                                                             }}
                                                           >
                                                            Benefits Of Trade Finance
                                                           </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : muiTheme.palette.text.secondary,
                  fontSize: '1rem', 
                  lineHeight: 1.6 
                }}
              >
                <ul>
                  <li> 
                    <strong>No Real Estate Security Required:</strong> The facility is secured against your current business assets, freeing up real estate assets.
                  </li>
                  <li> 
                    <strong>Advance Payments:</strong> Make payments to suppliers in advance, giving you access to discounts and faster delivery times.
                  </li>
                  <li> 
                    <strong>Flexible Repayment Terms:</strong> Payback on terms that suit your business cycle, with interest-free periods available.
                  </li>
                  <li> 
                    <strong>Mitigate Risks:</strong> Reduce risks associated with payments, foreign exchange fluctuations, and international transactions.
                  </li>
                  <li> 
                    <strong>Unlock Market Potential:</strong> With trade finance, you can seize opportunities by procuring goods without straining your cash reserves.
                  </li>
                </ul>
              </Typography>
            </Box>
          </Box>
        </GlassPaper>

        {/* Section 2 */}
        <GlassPaper isDarkMode={isDarkMode}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box>
               <Typography
                                                             variant="h4"
                                                             textAlign="center"
                                                             gutterBottom
                                                             sx={{
                                                               backgroundImage: cardGradient,
                                                               backgroundSize: "200%",
                                                                                                  fontWeight:800,
              
                                                               backgroundClip: "text",
                                                               textFillColor: "transparent",
                                                               WebkitBackgroundClip: "text",
                                                               WebkitTextFillColor: "transparent",
                                                               mb: 5,
                                                             }}
                                                           >
                                                                                          Why Do Businesses Need Trade Finance?

                                                           </Typography>
             

              <Typography 
                variant="body2" 
                sx={{ 
                  color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : muiTheme.palette.text.secondary,
                  fontSize: '1rem', 
                  lineHeight: 1.6 
                }}
              >
                Trade finance is essential for businesses involved in the import/export market, where timely supplier payments are crucial. By securing this facility, companies can improve their purchasing power, negotiate better pricing, and maintain a steady flow of inventory without affecting cash reserves.
                <br/>
                This type of financing is also useful for sellers who need to mitigate risks associated with delivering goods before receiving full payment.
              </Typography>
            </Box>
            <FeatureBox bgcolor="#26A69A" isDarkMode={isDarkMode} sx={{ ml: 2, mr: 0 }}>
              <SettingsIcon sx={{ fontSize: '2.5rem' }} />
            </FeatureBox>
          </Box>
        </GlassPaper>

        {/* Section 3 */}
        <GlassPaper isDarkMode={isDarkMode}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FeatureBox bgcolor="#2196F3" isDarkMode={isDarkMode}>
              <TrackChangesIcon sx={{ fontSize: '2.5rem' }} />
            </FeatureBox>
            <Box>
               <Typography
                                                             variant="h4"
                                                             textAlign="center"
                                                             gutterBottom
                                                             sx={{
                                                               backgroundImage: cardGradient,
                                                               backgroundSize: "200%",
                                                                                                  fontWeight:800,
              
                                                               backgroundClip: "text",
                                                               textFillColor: "transparent",
                                                               WebkitBackgroundClip: "text",
                                                               WebkitTextFillColor: "transparent",
                                                               mb: 5,
                                                             }}
                                                           >
                              What Documents Are Needed for Trade Finance?

                                                           </Typography>

              <Typography 
                variant="body2" 
                sx={{ 
                  color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : muiTheme.palette.text.secondary,
                  fontSize: '1rem', 
                  lineHeight: 1.6 
                }}
              >
                To apply for trade finance, you'll need:
                <ul>
                  <li>6-12 months of bank statements</li>
                  <li>Financial statements, including receivables and payables ledgers</li>
                  <li>A sample invoice and proof of delivery</li>
                  <li>ATO statements and a valid ID</li>
                </ul>
                These documents help us assess your business's financial health and ensure that you're eligible for the facility.
              </Typography>
            </Box>
          </Box>
        </GlassPaper>
      </Container>
    </Box>
  );
};

export default TradeFinanceBenefits;
