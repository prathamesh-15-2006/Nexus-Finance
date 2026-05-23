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
      question: "1. What is a startup business loan?",
      answer: "A startup business loan is a tailored financing option designed to provide new and emerging businesses with the capital they need to launch and grow. Unlike traditional bank loans, these loans are structured to accommodate businesses with limited trading history, offering flexible funding solutions without the need for extensive documentation. At Nexus Finance, our startup business loans can be either unsecured or secured, depending on your business needs."
    },
    {
        question: "2. What is the difference between unsecured and secured startup business loans?",
        answer: (
          <ul>
            <li>
              <strong>Unsecured Startup Business Loans:</strong>
            </li>
            <li>
              <strong> No Collateral Required:</strong> Ideal for businesses with at least 6 months of trading history and a minimum monthly turnover.
            </li>
            <li>
              <strong> Quick Approval:</strong> A streamlined, low-doc approval process enables rapid access to funds.
            </li>
            <li>
              <strong> Secured Startup Business Loans:</strong>
            </li>
            <li>
              <strong> Collateral Based: </strong>Suitable for startups with limited revenue, where property or asset equity is used as security.
            </li>
            <li>
              <strong> Flexible for New Ventures:</strong> No minimum trading time or turnover requirements are necessary if you can provide sufficient collateral.
            </li>
          </ul>
        ),
      },
      {
        question: "3. What are the eligibility criteria for a startup business loan?",
        answer: (
            <>
            <p>To qualify for a startup business loan at Nexus Finance, you typically need:</p>
          <ul>
            <li>An active s Number (ABN)</li>
            <li>For unsecured loans: At least 6 months of trading history and a minimum monthly turnover (typically over $5,000)</li>
            <li>For secured loans: Sufficient equity in property or assets to back the loan</li>
            <li>Our process is designed to be accessible for startups, ensuring you can get the funding you need, even if your business is in its early stages.</li>
            
          </ul>
          </>
        ),
      },
      {
        question: "4. How does the low-doc approval process work?",
        answer: "Our low-doc approval process minimizes the paperwork required for your startup business loan application. By streamlining documentation, we make it easier for startups to get approved quickly. This means you can focus on growing your business rather than getting bogged down with excessive administrative tasks. Simply provide essential business information, and our lending specialists will guide you through the remainder of the process."
      },
      {
        question: "5. What are the typical loan terms for startup business loans?",
        answer: "Startup business loans at Nexus Finance come with flexible repayment terms ranging from 3 to 36 months. This range allows you to select a repayment schedule that aligns with your business’s cash flow cycle, ensuring manageable monthly repayments and minimal financial stress as your startup grows."
      },
      {
        question: "6. How can I estimate my loan amount and repayment schedule?",
        answer: "You can use our online loan calculator to quickly estimate the amount you can borrow, your expected repayment schedule, and interest rates. This tool is designed to help you plan your financial future by providing instant insights into your loan options, enabling you to make informed decisions based on your startup's needs and cash flow projections."
      },
      {
        question: "7. How do I apply for a startup business loan with Nexus Finance?",
        answer: (
          <>
            <p>
            Applying for a startup business loan is simple:
            </p>
            <ul>
              <li>Complete Our Online Application: Fill out our user-friendly form with your business details.</li>
              <li>Consult with Our Lending Specialists: Our team will review your application and help you choose the best loan option from our network of 50+ private lenders.</li>
              <li>Receive Quick Funding: Once approved, you can access funds rapidly to support your startup’s growth.</li>
              <li>Schedule a Free Consultation: If you have any questions or need personalized advice, book a free consultation with our experts today.</li>
            </ul>
            <p>
            For more details on startup business loans and to explore additional savings through cash-back offers and expert solutions, contact the Nexus Finance team. Let us help you secure the funding you need to turn your startup dream into a reality.
            </p>
          </>
        ),
      }
    
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
