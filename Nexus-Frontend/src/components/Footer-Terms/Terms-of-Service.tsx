import React from "react";
import {
  Container,
  Typography,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TermsSection = ({ title, children }) => (
  <Accordion defaultExpanded sx={{ mb: 2 }}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="h6" fontWeight={600} sx={{ color: 'secondary.main' }}>
        {title}
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography component="div" sx={{ color: "text.secondary", lineHeight: 1.8 }}>
        {children}
      </Typography>
    </AccordionDetails>
  </Accordion>
);

const TermsOfServices = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Header */}
      <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mt: 10, color: 'primary.main' }}>
        Website Terms of Use
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Effective for users of Nexusnance.com.au
      </Typography>

      <Divider sx={{ mb: 4 }} />

      {/* About Website */}
      <TermsSection title="About the Website">
        <p>
          Welcome to <strong>Nexusnance.com.au</strong> (the “Website”). The
          Website provides finance broking and related financial services
          (“Services”).
        </p>
        <p>
          The Website is operated by <strong>Nexusinancial Services Pty Ltd</strong>{" "}
          (ACN 685 074 631). By accessing or using this Website, you agree to be
          bound by these Terms.
        </p>
        <p>
          We may amend these Terms at any time by updating this page. Continued
          use of the Website constitutes acceptance of the updated Terms.
        </p>
      </TermsSection>

      {/* Acceptance */}
      <TermsSection title="Acceptance of the Terms">
        <p>
          By accessing or remaining on the Website, you acknowledge that you
          have read, understood, and agree to be bound by these Terms.
        </p>
        <p>
          You may also accept these Terms by clicking “accept” or “agree” where
          such functionality is provided.
        </p>
      </TermsSection>

      {/* IP */}
      <TermsSection title="Copyright & Intellectual Property">
        <p>
          All content on this Website, including text, graphics, logos, icons,
          videos, software, and design elements, is owned or licensed by
          Nexusinancial Services Pty Ltd and is protected under n
          and international intellectual property laws.
        </p>

        <p>
          You are granted a limited, non-exclusive, revocable license to:
        </p>

        <ul>
          <li>Access and use the Website in accordance with these Terms</li>
          <li>Store content for personal use</li>
          <li>Print pages for non-commercial use</li>
        </ul>

        <p>
          Any commercial use, reproduction, or redistribution without written
          permission is strictly prohibited.
        </p>
      </TermsSection>

      {/* Privacy */}
      <TermsSection title="Privacy">
        <p>
          Your use of the Website is subject to our Privacy Policy, which
          explains how we collect, use, and protect your personal information.
        </p>
      </TermsSection>

      {/* Disclaimer */}
      <TermsSection title="General Disclaimer">
        <p>
          Nothing in these Terms excludes consumer guarantees provided under
          n Consumer Law.
        </p>

        <p>
          To the maximum extent permitted by law, we exclude all warranties not
          expressly stated and disclaim liability for indirect or consequential
          losses arising from your use of the Website.
        </p>

        <p>
          The Website is provided on an “as-is” and “as-available” basis. We do
          not guarantee uninterrupted access or error-free operation.
        </p>
      </TermsSection>

      {/* Liability */}
      <TermsSection title="Limitation of Liability">
        <p>
          To the extent permitted by law, our liability is limited to the
          resupply of the Services.
        </p>

        <p>
          We are not liable for loss of profits, goodwill, business reputation,
          or any indirect or consequential damages.
        </p>
      </TermsSection>

      {/* Termination */}
      <TermsSection title="Termination">
        <p>
          These Terms terminate automatically if we cease operating the
          Website.
        </p>
        <p>
          We may terminate or restrict your access at any time if you breach
          these Terms or engage in harmful conduct.
        </p>
      </TermsSection>

      {/* Indemnity */}
      <TermsSection title="Indemnity">
        <p>
          You agree to indemnify and hold harmless Nexusinancial Services Pty
          Ltd and its affiliates from any claims, losses, or expenses arising
          from your use of the Website or breach of these Terms.
        </p>
      </TermsSection>

      {/* Governing Law */}
      <TermsSection title="Governing Law">
        <p>
          These Terms are governed by the laws of New South Wales, .
          Any disputes will be subject to the exclusive jurisdiction of NSW
          courts.
        </p>
      </TermsSection>

      {/* Severance */}
      <TermsSection title="Severance">
        <p>
          If any provision of these Terms is found invalid or unenforceable, the
          remaining provisions will continue in full force and effect.
        </p>
      </TermsSection>

      {/* Footer */}
      <Box mt={6} textAlign="center">
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} Nexusinancial Services Pty Ltd. All
          rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsOfServices;
