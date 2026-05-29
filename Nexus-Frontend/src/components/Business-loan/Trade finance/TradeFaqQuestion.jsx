import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from '../../../contexts/ThemeContext';

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

export default function FaqSection() {
  const { isDarkMode } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      question: "How Does Trade Finance Help My Business?",
      answer: "Trade finance enables businesses to pay their suppliers upfront, improving cash flow and allowing for better pricing negotiations."
    },
    { question: "Can I Pay My Suppliers in Foreign Currency?",
      answer: "Yes, the trade finance facility allows you to pay suppliers in various currencies at competitive FX rates." },
    { question: "What Risks Are Involved in Trade Finance?",  
      answer: "While trade finance mitigates several risks, businesses should ensure they manage repayment terms and understand potential currency exchange fluctuations." },
    { question: "Why Choose Nexus Finance for Trade Finance?", answer: "Nexus Finance offers expert advice and tailored trade finance solutions that meet your unique business needs. With fast approvals, flexible repayment terms, and competitive rates, we help you maintain healthy cash flow while supporting your growth ambitions. Whether you’re a local supplier or engaged in international trade, we provide reliable financial support with minimal risks." },
    
  ];

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography 
        variant="h2" 
        sx={{ 
          fontWeight: "bold", 
          textAlign: 'center',
          background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 5,
        }}
      >
        Frequently Asked Questions:
      </Typography>

      <Box sx={{ mb: 4 }}>
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            sx={{
              mb: 2,
              borderRadius: '12px',
              background: isDarkMode 
                ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              boxShadow: isDarkMode 
                ? '0 4px 20px rgba(0,0,0,0.3)' 
                : '0 4px 20px rgba(0,0,0,0.1)',
              border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: isDarkMode 
                  ? '0 8px 30px rgba(0,0,0,0.4)' 
                  : '0 8px 30px rgba(0,0,0,0.15)',
              },
              '&:before': {
                display: 'none',
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon 
                  sx={{ 
                    color: isDarkMode ? '#fff' : '#333',
                    fontSize: '2rem',
                    transition: 'transform 0.3s ease',
                    transform: expanded === `panel${index}` ? 'rotate(180deg)' : 'rotate(0deg)'
                  }} 
                />
              }
              sx={{
                background: cardGradient,
                color: '#fff',
                fontWeight: 'bold',
                py: 3,
                px: 4,
                borderRadius: '12px 12px 0 0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: cardGradient,
                  opacity: 0.9,
                },
              }}
            >
              <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                background: isDarkMode ? '#1e1e1e' : '#ffffff',
                color: isDarkMode ? '#e0e0e0' : '#333333',
                p: 4,
                borderRadius: '0 0 12px 12px',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-line',
                }}
              >
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}
