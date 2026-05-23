import React from "react";
import {
  Container,
  Typography,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Section = ({ title, children }) => (
  <Accordion defaultExpanded>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="h6" fontWeight={600} sx={{ color: 'secondary.main' }}>
        {title}
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Box>{children}</Box>
    </AccordionDetails>
  </Accordion>
);

const CreditGuide = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mt: 10, color: 'primary.main' }}>
        Credit Guide & Privacy Disclosure
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Nexusancial Services Pty Ltd T/As NeNeNexus
      </Typography>

      <Divider sx={{ mb: 4 }} />

      {/* Licensee Details */}
      <Section title="Licensee Details – Contact Information">
        <Typography>
          <strong>Nexusancial Services Pty Ltd</strong>
        </Typography>
        <Typography>ABN: 73 685 074 631</Typography>
        <Typography>ACN: 685 074 631</Typography>
        <Typography>133 Mileham St, South Windsor NSW 2756</Typography>
        <Typography>Phone: 0481 823 600</Typography>

        <Box mt={2}>
          <Typography>
            Authorised Credit Representative <strong>#567862</strong> of
            Licence <strong>#414426</strong>
          </Typography>
          <Typography>
            AFAS Group Pty Ltd (ABN 12 134 138 686)
          </Typography>
        </Box>
      </Section>

      {/* Credit Guide Overview */}
      <Section title="Credit Guide Overview">
        <Typography paragraph>
          Under the National Consumer Credit Protection Act 2009, we must provide
          a Credit Guide and Quote as soon as practical after it becomes clear we
          are likely to provide credit assistance.
        </Typography>

        <Typography paragraph>
          This document outlines our services, obligations, fees, commissions,
          and dispute resolution processes.
        </Typography>
      </Section>

      {/* Services */}
      <Section title="Services We Provide">
        <ul>
          <li>Obtaining information from employers, accountants & credit agencies</li>
          <li>Investigating suitable loan options</li>
          <li>Assessing and verifying your financial position</li>
          <li>Assisting with loan applications and documentation</li>
          <li>Liaising with lenders during approval</li>
          <li>Assisting with loan settlement</li>
        </ul>
      </Section>

      {/* Unsuitability Obligations */}
      <Section title="Our Obligations – Unsuitable Credit">
        <Typography paragraph>
          By law, we must ensure the credit provided is not unsuitable for your
          circumstances.
        </Typography>

        <ul>
          <li>Assess your requirements and objectives</li>
          <li>Assess your financial situation</li>
          <li>Verify the information provided</li>
        </ul>

        <Typography paragraph>
          Preliminary assessments are retained for 7 years. You may request a
          copy during this period.
        </Typography>
      </Section>

      {/* Fees */}
      <Section title="Our Quote – Fees & Charges">
        <Typography paragraph>
          We may charge up to <strong>$2,500 (incl. GST)</strong> or up to{" "}
          <strong>10% of Net Amount Financed</strong> as an Origination Fee.
        </Typography>

        <Typography>
          This fee is payable only if the loan proceeds and is charged at
          settlement.
        </Typography>
      </Section>

      {/* Lenders Table */}
      <Section title="Our Most Used Credit Providers">
        <Paper variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Lender</TableCell>
                <TableCell>Application Fee</TableCell>
                <TableCell>Monthly Fee</TableCell>
                <TableCell>PPSR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                ["Plenti", "$499", "$9.90", "$6.80"],
                ["Pepper", "$449", "$8.90", "$8.00"],
                ["RACV", "$550", "$0.00", "$0.00"],
                ["Firstmac", "$400", "$8.00", "$0.00"],
                ["AFS", "$495", "$15.00", "$17.60"],
                ["Liberty", "$495", "$7.70", "$8.00"],
              ].map((row, i) => (
                <TableRow key={i}>
                  {row.map((cell, j) => (
                    <TableCell key={j}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Section>

      {/* Complaints */}
      <Section title="Complaints & Dispute Resolution">
        <Typography paragraph>
          If you have a complaint, contact us at:
        </Typography>

        <Typography>Email: Prathamesh@Nexusnce.com.au</Typography>

        <Box mt={2}>
          <Typography fontWeight={600}>
            al Complaints Authority (AFCA)
          </Typography>
          <Typography>Free Call: 1800 931 678</Typography>
          <Typography>Membership No: 114068</Typography>
        </Box>
      </Section>

      {/* Privacy */}
      <Section title="Privacy Disclosure & Consent">
        <Typography paragraph>
          We collect and use personal and credit information in accordance with
           and credit reporting laws.
        </Typography>

        <Typography paragraph>
          Information is used to assess applications, source credit providers,
          manage applications, and meet legal obligations.
        </Typography>
      </Section>

      {/* Authorisation */}
      <Section title="Authorisation & Consent">
        <Typography paragraph>
          By proceeding, you authorise Nexusance to obtain credit reports,
          disclose information to credit providers, insurers, and related
          service providers as required.
        </Typography>
      </Section>

      <Box mt={5} textAlign="center">
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} Nexusance. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default CreditGuide;
