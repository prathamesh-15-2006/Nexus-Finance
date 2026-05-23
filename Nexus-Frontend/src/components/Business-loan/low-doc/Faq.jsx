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
      question: '1. What is a Low Doc Business Loan?',
      answer: 'A Low Doc Business Loan offers quick access to capital without needing extensive financial documentation like tax returns or detailed financials. This is ideal for small businesses, startups, or self-employed individuals.'
    },
    {
      question: '2. How much can I borrow?',
      answer: 'You can borrow between $5,000 and $250,000.'
    },
    {
      question: '3. What documents are required?',
      answer: "You only need the last 6 months of bank statements and a valid ID. In some cases, you may be required to provide 12 months of Bank Statements. (depending on Lender’s discretion)"
    },
    {
      question: '4. How long does approval take?',
      answer: 'Approval can be as fast as same-day, with funds available within 12-24 business hours.'
    },
    {
      question: '5. What are the repayment terms?',
      answer: 'Repayments can be daily, weekly, or fortnightly, depending on what suits your business.'
    },
    {
      question: '6. What can I use the loan for?',
      answer: 'You can use Low Doc loans for various purposes, including purchasing stock, paying wages, renovating business premises, or covering urgent working capital needs.'
    },
    {
      question: '7. What is the interest rate?',
      answer: 'Interest rates start at 7.75% p.a., varying based on loan amount and terms.'
    },
    {
      question: '8. Is the loan secured or unsecured?',
      answer: 'You can choose between secured and unsecured loan options, depending on your preference and business situation.'
    },
    {
      question: '9. Are there any restrictions on who can apply?',
      answer: 'Low Doc loans are available for startups, self-employed individuals, and small businesses that may not meet traditional lending criteria.'
    },
    {
      question: '10. How do I apply?',
      answer: 'You can apply by submitting the required documentation through our online portal or speaking with a Nexus Finance expert to start your application. Same-day approval is possible!'
    },
    {
      question: '11. Are there any upfront costs?',
      answer: "Costs and fees will depend on the terms of your loan. It's best to speak with a loan advisor for personalized information."
    },
    {
        question: '12. Can I pay off my loan early?',
        answer: "Yes, many Low Doc loans allow for early repayment, though conditions may apply. Always review your loan agreement for specific terms."
      },
      {
        question: '13. What happens if I miss a repayment?',
        answer: "It's important to communicate with your loan provider immediately if you're at risk of missing a payment. They may offer options to adjust the repayment schedule, but missing payments could result in penalties or fees. For further assistance or questions, feel free to Contact Us."
      },
    
  ];

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
     <Typography
                                                         variant="h3"
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
              FAQ: Low Doc Business Loans
    
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
