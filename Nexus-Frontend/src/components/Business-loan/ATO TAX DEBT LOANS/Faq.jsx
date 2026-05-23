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

export default function FaqSection() {
  const { isDarkMode } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";


  const faqs = [
    {
      question: '1. What is ATO Debt Finance?',
      answer: 'ATO Debt Finance is a loan designed to help businesses manage their ATO tax debt by consolidating it into a manageable repayment plan.'
    },
    {
      question: '2. Who is eligible for ATO Debt Finance?',
      answer: 'outstanding tax debt to the ATO, who are struggling to make direct payment arrangements, can apply. Eligibility is based on the business’s financial situation.'
    },
    {
      question: '3. How does ATO Debt Finance work?',
      answer: "Once approved, we provide funds to settle your ATO tax debt. You then repay the loan with flexible, tailored repayment terms."
    },
    {
      question: '4. Are there tax advantages with ATO Debt Finance?',
      answer: 'Yes, the interest on ATO Debt Finance may be tax-deductible, reducing your overall taxable income.'
    },
    {
      question: '5. How can ATO Debt Finance improve my business’s cash flow?',
      answer: 'By consolidating your tax debt into manageable repayments, you can free up working capital to focus on business growth.'
    },
    {
      question: "6. What happens if I can't pay my ATO tax debt directly?",
      answer: 'If your business is unable to pay the ATO directly, ATO Debt Finance can help by providing a loan to cover the debt and creating a structured repayment plan.'
    },
    {
      question: '7. Can ATO Debt Finance affect my credit score?',
      answer: 'Yes, if your tax debt goes unpaid, it can negatively impact your credit score. ATO Debt Finance helps prevent this by paying off the debt and protecting your credit rating.'
    },
    {
      question: '8. What documents are required to apply?',
      answer: "You'll need your tax debt details, financial statements, and business-related documents to assess your eligibility."
    },
    {
      question: '9. What are the repayment terms for ATO Debt Finance?',
      answer: 'Repayment terms are flexible and customized to fit your business’s financial needs. We work with you to create a manageable schedule.'
    },
    {
      question: '10. How do I apply for ATO Debt Finance?',
      answer: 'You can apply by contacting our financial experts at Nexus Finance. They will guide you through the process and help you choose the best plan.'
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
                                                                                          fontWeight:800,

                                                       textFillColor: "transparent",
                                                       WebkitBackgroundClip: "text",
                                                       WebkitTextFillColor: "transparent",
                                                       mb: 5,
                                                     }}
                                                   >
FAQ For ATO Debt Finance                                                   </Typography>

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
