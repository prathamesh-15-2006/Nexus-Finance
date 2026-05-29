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
      question: "What is Debtor Finance?",
      answer: "Debtor Finance is a funding option that allows businesses to receive an advance on their outstanding receivables, up to 90% of the receivables ledger, to improve cash flow."
    },
    { question: "How does Invoice Finance work?",
    answer: "Invoice Finance provides up to 95% of the value of unpaid invoices. Businesses receive funds upfront, and repayment is made once the customer settles the invoice." },
    { question: "What is the difference between Invoice Finance and Debtor Finance?",  
    answer: "Debtor Finance is based on the overall receivables ledger, whereas Invoice Finance is based on individual invoices. Both provide immediate funding but have different criteria and processes." },
    { question: "What are the eligibility requirements for Debtor or Invoice Finance?", answer: "To qualify, businesses need an active ABN/ACN, outstanding invoices or receivables from ses, and proof of delivery (for Invoice Finance)." },
    { question: "What are the typical loan amounts available?", answer: "Loan amounts range from $5K to $150M for both Invoice and Debtor Finance facilities." },
    { question: "How fast can I get approved?", answer: "Pre-approvals typically take 24-48 hours, with settlement within 5-7 business days." },
    { question: "Is any collateral required?", answer: "No real estate security is required. Both facilities are secured against receivables or invoices." },
    { question: "What are the key benefits of these financing options?", answer: "You can unlock cash flow without real estate security, ensuring that you meet operational costs, buy inventory, pay suppliers, or address other working capital needs." },
    { question: "Are there any restrictions on the types of invoices that can be financed?", answer: "For Invoice Finance, invoices must be unpaid, typically from other ses, with proof of delivery required." },
    { question: "How are repayments handled?", answer: "Repayments are automatically made when customers pay the invoices. Interest is only charged on the amount advanced." }
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
        Frequently Asked Questions– Invoice Finance & Debtor Finance
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
