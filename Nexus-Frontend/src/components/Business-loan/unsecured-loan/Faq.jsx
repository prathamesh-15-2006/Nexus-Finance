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
      question: 'How Can I Qualify for an Unsecured Business Loan?',
      answer: 'To qualify for an unsecured business loan, you need to meet the following criteria:\n\n• Have an active ABN (n Business Number)\n• Be in operation for at least 6 months\n• Have a minimum monthly turnover of $5,000 over the past 6 months'
    },
    {
      question: 'How Do I Apply for an Unsecured Business Loan?',
      answer: 'Applying for an unsecured business loan is fast and hassle-free. Simply complete our online application form and upload your last 6 months of business bank statements using the secure link we provide. No need to print or sign any documents.'
    },
    {
      question: 'What Documents Are Required for an Unsecured Business Loan?',
      answer: 'For loans up to $250,000, you generally only need to submit 6 months of bank statements and valid identification. For larger loans over $250,000, you may also need to provide financial statements, BAS, and ATO transaction statements.'
    },
    {
      question: 'How Quickly Can I Get an Unsecured Business Loan?',
      answer: 'Approval times for unsecured business loans are swift. You could receive funds within as little as 3-4 hours, with most approvals happening within 24-48 hours after submitting all necessary documentation.'
    },
    {
      question: 'What Are the Interest Rates for Unsecured Business Loans?',
      answer: 'Interest rates on unsecured business loans vary depending on factors like your industry, cash flow, credit history, and loan terms. Rates generally range from 10-20% per annum, with higher rates for businesses with poorer credit scores.'
    },
    {
      question: 'What Is the Typical Loan Term for an Unsecured Business Loan?',
      answer: 'Unsecured business loans usually have shorter terms ranging from 3 to 36 months, with the majority of loans being offered for 12 months.'
    },
    {
      question: 'What Is a Personal Guarantee, and Is It Required?',
      answer: 'A personal guarantee (PG) is a legal commitment from the business owner or key individual agreeing to personally repay the loan if the business defaults. While no collateral is required for unsecured loans, most lenders require a personal guarantee to reduce risk.'
    },
    {
      question: 'When Will a Lender Conduct a Credit Check?',
      answer: 'Lenders will only perform a credit check with your consent after you submit your application. This ensures your credit score is protected during the initial loan inquiry.'
    },
    {
      question: 'Are There Any Application Costs for Unsecured Business Loans?',
      answer: 'There are no application fees for unsecured business loans. Once approved, an origination fee between 2-4% of the loan amount may apply. This is a one-time fee charged on top of the loan interest charged by the lenders.'
    },
    {
      question: 'Do Lenders Provide Loans to All Industries?',
      answer: 'Yes, lenders generally offer loans across various industries, with few restrictions. If you\'re unsure about your industry\'s eligibility, contact us for a free consultation, and we\'ll guide you through the process.'
    },
    {
      question: 'How Can I Submit My Bank Statements Securely?',
      answer: 'We provide a secure online link for you to upload your bank statements directly to us. This process is fast, and secure, and helps speed up your loan approval. Please note, PDF bank statements are no longer accepted due to potential fraud risks.'
    },
    {
      question: 'How Do Lenders Evaluate My Unsecured Loan Application?',
      answer: 'Lenders typically assess your cash flow, credit score, business history, industry, and other factors like past bank dishonours and director age. This comprehensive review helps them determine your borrowing capacity.'
    },
    {
      question: 'Can I Get a Business Loan with a Poor Credit History?',
      answer: 'While securing a loan with a poor credit history can be challenging, it\'s not impossible. We work with lenders who consider businesses with past credit issues but strong current cash flow. Contact us for a free consultation to discuss your options.'
    }
  ];

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography 
        variant="h3" 
        sx={{ 
          fontWeight: "bold", 
          mb: 4, 
          
                                             fontWeight:800,

          textAlign: 'center',
          
          
          background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: { xs: "2rem", md: "2.5rem" }
        }}
      >
        Frequently Asked Questions
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
