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
      question: '1. What is a business line of credit?',
      answer: 'A business line of credit provides a flexible, revolving loan that allows you to borrow funds up to a pre-approved limit. You only pay interest on the amount borrowed, making it an efficient way to manage cash flow.'
    },
    {
      question: '2. Who can apply for a business line of credit?',
      answer: 'Businesses with an active ABN, operational for over 12 months, and a monthly turnover greater than $10,000 are eligible for a business line of credit.'
    },
    {
      question: '3. How much can I borrow with a business line of credit?',
      answer: "You can borrow between $10,000 and $750,000, depending on your business's financial strength, industry, and credit history."
    },
    {
      question: '4. How quickly can I access the funds?',
      answer: 'You can expect pre-approval within 24 to 48 hours, with final approval and settlement in 1 to 3 days.'
    },
    {
      question: '5. What documents do I need to apply for a business line of credit?',
      answer: 'For loans up to $250,000, you typically need bank statements and identification proof. For loans over $250,000, additional documents like financial statements and ATO statements may be required.'
    },
    {
      question: '6. What can I use a business line of credit for?',
      answer: 'A business line of credit can be used for inventory, wages, rent, marketing, paying bills, and managing cash flow.'
    },
    {
      question: '7. Are there any fees associated with a business line of credit?',
      answer: 'Fees may include a line fee for keeping the overdraft available and interest charges on the amount you draw. Specific rates and fees will be confirmed in your offer letter.'
    },
    {
      question: '8. What is the difference between a business line of credit and a business term loan?',
      answer: 'A business line of credit provides flexible access to funds that you can borrow and repay repeatedly, while a business term loan offers a lump sum with fixed repayment terms.'
    },
    {
      question: '9. Is collateral required for a business line of credit?',
      answer: 'A business line of credit may be unsecured for smaller loan amounts, but larger loans may require collateral.'
    },
    {
      question: '10. How does repayment work?',
      answer: 'Repayments can be made weekly or monthly, depending on the loan agreement. Some lenders also offer amortization options for easier budgeting.'
    },
    {
      question: '11. How do I apply for a business line of credit with Nexus Finance?',
      answer: 'You can apply online, or schedule a free consultation with one of our experts to find the best solution for your business needs.'
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
                                                             backgroundClip: "text",
                                                             textFillColor: "transparent",
                                                             WebkitBackgroundClip: "text",
                                                                                                fontWeight:800,

                                                             WebkitTextFillColor: "transparent",
                                                             mb: 5,
                                                           }}
                                                         >
                                                                        Frequently Asked Questions - Business Line of Credit

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
