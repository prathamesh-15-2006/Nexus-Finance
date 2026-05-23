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
        question: "What is a business car loan and how does it work?",
        answer: "A business car loan, often structured as a chattel mortgage, allows your business to finance a vehicle without paying the full purchase price upfront. The vehicle itself serves as collateral, and you repay the loan over an agreed term, usually with fixed monthly payments. Flexible repayment options—including balloon payments—help tailor the loan to your cash flow needs."
      },
      {
        question: "2: What documents are required when applying for a business car loan?",
        answer: (
          <>
            <p>
            Generally, you’ll need to provide:
            </p>
            <ul>
              <li>A valid (ABN).</li>
              <li>Financial statements (profit & loss, balance sheets for the past 2 years).</li>
              <li>Recent tax returns.</li>
              <li>Evidence of a good credit history and repayment record.</li>
            </ul>
            <p>
            Having these documents prepared in advance can speed up the approval process.
            </p>
          </>
        ),
      },
      {
        question: "3: How can I fund vehicle, machinery, and equipment purchases for my business?",
        answer: (
          <>
            <p>
            You have several financing options:
            </p>
            <ul>
              <li>Equipment Finance: For acquiring essential business equipment such as machinery, medical devices, or IT hardware.</li>
              <li>Financial statements (profit & loss, balance sheets for the past 2 years).</li>
              <li>Traditional Loans vs. Leasing/Hire Purchase: Consider which method suits your business needs, factoring in ownership, tax benefits, and cash flow impacts. Using a loan calculator and consulting with financial experts can help you determine the best option.</li>
              
            </ul>
          </>
        ),
      },
      {
        question: "4: What are the benefits of low-doc business loans for equipment finance?",
        answer: "Low-doc loans require minimal documentation, making them ideal for self-employed individuals or SMEs with limited financial paperwork. They offer faster approvals, allowing you to access funds quickly and keep your business running smoothly without the hassle of extensive paperwork."
      },
      {
        question: "5: Are there any tax benefits associated with business vehicle finance?",
        answer: "Yes. When you finance a business vehicle, you may be eligible for tax benefits such as claiming GST credits, depreciation, and deductions for interest on the loan. Consult your accountant for personalized advice on how these benefits apply to your business."
      },
      {
        question: "6: What is a balloon payment and how does it affect my loan?",
        answer: "A balloon payment is a lump sum due at the end of your loan term. Opting for a balloon payment can lower your monthly repayments, but you must be prepared to pay the remaining balance when the term ends. This option is ideal if you anticipate improved cash flow in the future or plan to refinance the remaining balance."
      },
      {
        question: "7: How do I get started with applying for business vehicle and equipment finance?",
        answer: "Start by using our online loan calculator to get an instant quote, then complete our simple application form. If you need guidance, schedule a free consultation with our finance experts who will help tailor a financing solution that meets your needs. With access to over 50 private lenders, we ensure you get the best deal available."
      },
      
  ];

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography 
        variant="h2" 
        sx={{ 
          fontWeight: "bold", 
          mb: 4, 
          textAlign: 'center',
          background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: { xs: "2rem", md: "2.5rem" }
        }}
      >
        Frequently Asked Questions (FAQ)
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
