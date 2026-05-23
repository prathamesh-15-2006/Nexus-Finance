import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  IconButton,
  Paper,
  Divider,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  LinkedIn,
  WhatsApp,
  Email,
  CheckCircle,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "../../contexts/ThemeContext";

// Reusing images from other blog posts as placeholders
import BlogBackground1 from "../../asset/ContactPage/blog3/blog3.webp";
import BlogBackground2 from "../../asset/ContactPage/blog3/blog1.webp";
import BlogBackground3 from "../../asset/ContactPage/blog/credit.webp";
import BlogBackground4 from "../../asset/ContactPage/blog3/blog2.webp";
import BlogBackground5 from "../../asset/ContactPage/blog3/blog4.webp";
import BlogBackground6 from "../../asset/ContactPage/blog3/blog5.webp";

const BLOG_URL =
  "https://www.Nexusfinance.com.au/Blog/Invoice-Finance-Misconceptions";

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

const blogSections = [
  {
    heading: "Myth 1: “Invoice Finance Is Just Another Form of Debt”",
    description: [
      "This is the number-one misconception among small business owners. Many assume invoice finance adds to their debt burden—but that’s not true.",
      "Fact: Invoice finance is not a loan. It’s an advance against money your customers already owe you. You’re effectively unlocking your own earned revenue earlier.",
      "Here’s how it works in simple terms:",
      "1. You issue an invoice to your customer for delivered goods or services.",
      "2. Instead of waiting weeks to get paid, you sell that invoice to a financier like Nexus Finance.",
      "3. You receive up to 85–95 % of the invoice value upfront—usually within 24–48 hours.",
      "4. Once your customer pays the invoice, you receive the remaining balance (minus a small service fee).",
      "So rather than increasing your liabilities, invoice finance actually improves your balance sheet liquidity. It’s your cash—just made available faster.",
    ],
    img: BlogBackground1,
  },
  {
    heading: "Myth 2: “Only Struggling Businesses Use Invoice Finance”",
    description: [
      "This couldn’t be further from the truth. In reality, many high-growth, profitable companies use invoice finance as a strategic cash-flow tool.",
      "Invoice finance isn’t a rescue plan—it’s a working-capital accelerator. Businesses use it to:",
      "• Fund rapid growth: bridge cash gaps during expansion or seasonal spikes.",
      "• Cover supplier payments: pay suppliers early to secure better discounts.",
      "• Smooth cash flow: eliminate stress between outgoing payroll and incoming client payments.",
      "At Nexus Finance, a large share of clients are thriving SMEs, not distressed ones. These are companies that prefer flexibility over fixed-term loans and want financial agility without diluting ownership or taking on new debt.",
      "In today’s business landscape, smart cash-flow management isn’t a sign of struggle—it’s a sign of strategy.",
    ],
    img: BlogBackground2,
  },
  {
    heading: "Myth 3: “Invoice Finance Is Complicated and Time-Consuming”",
    description: [
      <>
        Maybe once—but not anymore.{" "}
        <Link to="/Nexus-Finance/Business-loans/Debtor-&-invoice-finance" style={{ color: '#2ECC71', textDecoration: 'underline' }}>
          Traditional debtor finance
        </Link>{" "}
        used to involve mountains of paperwork and lengthy approvals. But modern fintech-driven lenders like Nexus Finance have made the process simple, fast, and transparent.
      </>,
      "Here’s what the process typically looks like:",
      "1. Apply online: share basic business and customer details.",
      "2. Get approved quickly: Nexus assesses your invoices and customer creditworthiness.",
      "3. Access funds within 24–48 hours: no long meetings, no hidden clauses.",
      "4. Ongoing support: track invoices and repayments through a simple dashboard.",
      "Digital innovation and streamlined credit assessment now make invoice finance accessible to SMEs that don’t have the time or paperwork capacity for traditional lending.",
      "So if you can send an invoice, you can access invoice finance.",
    ],
    img: BlogBackground3,
  },
  {
    heading: "Myth 4: “You Lose Control of Customer Relationships”",
    description: [
      "One of the biggest fears around invoice finance is that it might interfere with client relationships—that a financier will start chasing your customers for payment.",
      "This was sometimes true in the past with older factoring models. But modern invoice finance through Nexus Finance is completely different.",
      "Nexus’s service is built on confidentiality and professionalism:",
      "• Your customers continue to pay as usual.",
      "• Communication remains under your brand’s control.",
      "• Collection processes (if any) are handled discreetly and respectfully.",
      "• You maintain full transparency over which invoices are financed and how payments flow.",
      "In most cases, your customers will not even be aware that invoice finance is in place—it simply functions as a behind-the-scenes liquidity tool.",
      "The result: you retain client trust while improving your cash position.",
    ],
    img: BlogBackground4,
  },
  {
    heading: "Myth 5: “It’s Too Expensive to Be Worth It”",
    description: [
      "This myth lingers because people often confuse cost with value.",
      "Yes, there are small fees associated with invoice finance, but when you look at the opportunity cost of waiting 60–90 days for payment—or missing growth opportunities due to cash shortage—the value becomes obvious.",
      "Think about it:",
      "• How much revenue could you generate if you reinvested that freed-up cash immediately?",
      "• What discounts could you earn by paying suppliers early?",
      "• How much stress would you remove from managing unpredictable cash flow?",
      "Invoice finance fees are typically straightforward: a service margin based on invoice volume and term length. Nexus Finance is transparent about all pricing upfront—no surprise fees, no lock-ins, and no long-term contracts.",
      "The bottom line: invoice finance is an investment in stability and growth, not an unnecessary expense.",
    ],
    img: BlogBackground5,
  },
];



const faqs = [
    { q: "1. Is invoice finance suitable for startups?", a: "Yes, as long as your business issues invoices to reputable customers. It can help startups manage early cash-flow gaps." },
    { q: "2. Will my customers know I’m using invoice finance?", a: "Not necessarily. Nexus’s solutions are confidential and structured to protect your client relationships." },
    { q: "3. How quickly can I get funds?", a: "Most clients receive funds within one or two business days after approval." },
    { q: "4. Is there a minimum invoice amount?", a: "Requirements vary, but Nexus Finance offers flexible options based on business size and cash-flow needs." },
    { q: "5. Can invoice finance grow with my business?", a: "Absolutely. The more invoices you issue, the more working capital you can unlock—making it scalable as your business expands." },
];

export default function BlogPage6() {
  const { isDarkMode } = useTheme();

  const themeColors = {
    background: isDarkMode ? "#0f1423" : "#ffffff",
    heading: isDarkMode
      ? "linear-gradient(90deg, #2ECC71, #1ABC9C)"
      : "linear-gradient(90deg, #1976d2, #42a5f5)",
    text: isDarkMode ? "#ffffff" : "#222",
    description: isDarkMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.75)",
    sectionBg: isDarkMode ? "#16213e" : "#f9f9f9",
    tableHeader: isDarkMode ? "#1e1e2f" : "#f0f4f8",
    accent: "#3264c1",
  };

  const blogSections = [
    {
      heading: (
        <>
          Myth 1: “
          <Link
            to="/Nexus-Finance/Business-loans/Debtor-&-invoice-finance"
            style={{
              color: themeColors.accent,
              textDecoration: "underline",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            Invoice Finance
          </Link>{" "}
          Is Just Another Form of Debt”
        </>
      ),
      description: [
        "This is the number-one misconception among small business owners. Many assume invoice finance adds to their debt burden—but that’s not true.",
        "Fact: Invoice finance is not a loan. It’s an advance against money your customers already owe you. You’re effectively unlocking your own earned revenue earlier.",
        "Here’s how it works in simple terms:",
        "1. You issue an invoice to your customer for delivered goods or services.",
        "2. Instead of waiting weeks to get paid, you sell that invoice to a financier like Nexus Finance.",
        "3. You receive up to 85–95 % of the invoice value upfront—usually within 24–48 hours.",
        "4. Once your customer pays the invoice, you receive the remaining balance (minus a small service fee).",
        "So rather than increasing your liabilities, invoice finance actually improves your balance sheet liquidity. It’s your cash—just made available faster.",
      ],
      img: BlogBackground1,
    },
    {
      heading: (
        <>
          Myth 2: “Only Struggling Businesses Use{" "}
          <Link
            to="/Nexus-Finance/Business-loans/Debtor-&-invoice-finance"
            style={{
              color: themeColors.accent,
              textDecoration: "underline",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            Invoice Finance
          </Link>
          ”
        </>
      ),
      description: [
        "This couldn’t be further from the truth. In reality, many high-growth, profitable companies use invoice finance as a strategic cash-flow tool.",
        "Invoice finance isn’t a rescue plan—it’s a working-capital accelerator. Businesses use it to:",
        "• Fund rapid growth: bridge cash gaps during expansion or seasonal spikes.",
        "• Cover supplier payments: pay suppliers early to secure better discounts.",
        "• Smooth cash flow: eliminate stress between outgoing payroll and incoming client payments.",
        "At Nexus Finance, a large share of clients are thriving SMEs, not distressed ones. These are companies that prefer flexibility over fixed-term loans and want financial agility without diluting ownership or taking on new debt.",
        "In today’s business landscape, smart cash-flow management isn’t a sign of struggle—it’s a sign of strategy.",
      ],
      img: BlogBackground2,
    },
    {
      heading: (
        <>
          Myth 3: “
          <Link
            to="/Nexus-Finance/Business-loans/Debtor-&-invoice-finance"
            style={{
              color: themeColors.accent,
              textDecoration: "underline",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            Invoice Finance
          </Link>{" "}
          Is Complicated and Time-Consuming”
        </>
      ),
      description: [
        <>
          Maybe once—but not anymore.{" "}
          <Link
            to="/Nexus-Finance/Business-loans/Debtor-&-invoice-finance"
            style={{
              color: themeColors.accent,
              textDecoration: "underline",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            Traditional debtor finance
          </Link>{" "}
          used to involve mountains of paperwork and lengthy approvals. But
          modern fintech-driven lenders like Nexus Finance have made the
          process simple, fast, and transparent.
        </>,
        "Here’s what the process typically looks like:",
        "1. Apply online: share basic business and customer details.",
        "2. Get approved quickly: Nexus assesses your invoices and customer creditworthiness.",
        "3. Access funds within 24–48 hours: no long meetings, no hidden clauses.",
        "4. Ongoing support: track invoices and repayments through a simple dashboard.",
        "Digital innovation and streamlined credit assessment now make invoice finance accessible to SMEs that don’t have the time or paperwork capacity for traditional lending.",
        "So if you can send an invoice, you can access invoice finance.",
      ],
      img: BlogBackground3,
    },
    {
      heading: "Myth 4: “You Lose Control of Customer Relationships”",
      description: [
        "One of the biggest fears around invoice finance is that it might interfere with client relationships—that a financier will start chasing your customers for payment.",
        "This was sometimes true in the past with older factoring models. But modern invoice finance through Nexus Finance is completely different.",
        "Nexus’s service is built on confidentiality and professionalism:",
        "• Your customers continue to pay as usual.",
        "• Communication remains under your brand’s control.",
        "• Collection processes (if any) are handled discreetly and respectfully.",
        "• You maintain full transparency over which invoices are financed and how payments flow.",
        "In most cases, your customers will not even be aware that invoice finance is in place—it simply functions as a behind-the-scenes liquidity tool.",
        "The result: you retain client trust while improving your cash position.",
      ],
      img: BlogBackground4,
    },
    {
      heading: "Myth 5: “It’s Too Expensive to Be Worth It”",
      description: [
        "This myth lingers because people often confuse cost with value.",
        "Yes, there are small fees associated with invoice finance, but when you look at the opportunity cost of waiting 60–90 days for payment—or missing growth opportunities due to cash shortage—the value becomes obvious.",
        "Think about it:",
        "• How much revenue could you generate if you reinvested that freed-up cash immediately?",
        "• What discounts could you earn by paying suppliers early?",
        "• How much stress would you remove from managing unpredictable cash flow?",
        "Invoice finance fees are typically straightforward: a service margin based on invoice volume and term length. Nexus Finance is transparent about all pricing upfront—no surprise fees, no lock-ins, and no long-term contracts.",
        "The bottom line: invoice finance is an investment in stability and growth, not an unnecessary expense.",
      ],
      img: BlogBackground5,
    },
  ];

  const faqs = [
    {
      q: (
        <>
          1. Is{" "}
          <Link
            to="/Nexus-Finance/Business-loans/Debtor-&-invoice-finance"
            style={{
              color: themeColors.accent,
              textDecoration: "underline",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            invoice finance
          </Link>{" "}
          suitable for startups?
        </>
      ),
      a: "Yes, as long as your business issues invoices to reputable customers. It can help startups manage early cash-flow gaps.",
    },
    {
      q: (
        <>
          2. Will my customers know I’m using{" "}
          <Link
            to="/Nexus-Finance/Business-loans/Debtor-&-invoice-finance"
            style={{
              color: themeColors.accent,
              textDecoration: "underline",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            invoice finance
          </Link>
          ?
        </>
      ),
      a: "Not necessarily. Nexus’s solutions are confidential and structured to protect your client relationships.",
    },
    {
      q: "3. How quickly can I get funds?",
      a: "Most clients receive funds within one or two business days after approval.",
    },
    {
      q: "4. Is there a minimum invoice amount?",
      a: "Requirements vary, but Nexus Finance offers flexible options based on business size and cash-flow needs.",
    },
    {
      q: (
        <>
          5. Can{" "}
          <Link
            to="/Nexus-Finance/Business-loans/Debtor-&-invoice-finance"
            style={{
              color: themeColors.accent,
              textDecoration: "underline",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            invoice finance
          </Link>{" "}
          grow with my business?
        </>
      ),
      a: "Absolutely. The more invoices you issue, the more working capital you can unlock—making it scalable as your business expands.",
    },
  ];

  // Facebook SDK
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    } else {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src =
        "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0";
      document.body.appendChild(script);
      script.onload = () => window.FB.XFBML.parse();
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>
          5 Common Misconceptions About Invoice Finance in 
        </title>
        <meta
          name="description"
          content="Debunking the myths that hold ck from better cash flow with invoice finance. Learn the truth about this strategic financial tool."
        />
      </Helmet>
      <Box
        sx={{
          fontFamily: "'Poppins', sans-serif",
          background: themeColors.background,
          overflow: "hidden",
        }}
      >
        {/* Hero Section */}
        <Box
          sx={{
            height: { xs: "60vh", md: "70vh" },
            backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${BlogBackground6})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            px: 2,
            position: "relative",
            mt: { xs: 10, md: 10 },
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => window.history.back()}
            sx={{
              position: "absolute",
              top: { xs: 16, md: 32 },
              left: { xs: 16, md: 32 },
              color: "#fff",
              backgroundColor: "rgba(0,0,0,0.5)",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
            }}
          >
            Back
          </Button>
          <Typography
            variant="h3"
            textAlign="center"
            gutterBottom
            sx={{
              backgroundImage: cardGradient,
              backgroundSize: "200%",
              backgroundClip: "text",
              fontWeight: 800,
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
              fontSize: {
                xs: "1.8rem",
                sm: "2.2rem",
                md: "2.8rem",
                lg: "3.5rem",
              },
              lineHeight: 1.2,
            }}
          >
            5 Common Misconceptions About Invoice Finance in 
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ maxWidth: 700, mx: "auto" }}
          >
            Debunking the myths that hold ck from better cash
            flow
          </Typography>
        </Box>

        {/* Intro */}
        <Container maxWidth="md" sx={{ py: 6, px: 2 }}>
          <Typography
            variant="body1"
            sx={{ color: themeColors.description, lineHeight: 1.9, mb: 2 }}
          >
            For many o-medium enterprises (SMEs), cash flow is
            the difference between growth and stagnation. Yet, even with solid
            sales and healthy order books, waiting 30, 60, or even 90 days for
            invoice payments can choke your working capital.
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: themeColors.description, lineHeight: 1.9 }}
          >
            That’s where{" "}
            <Link
              to="/Nexus-Finance/Business-loans/Debtor-&-invoice-finance"
              style={{
                color: themeColors.accent,
                textDecoration: "underline",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              invoice finance
            </Link>
            —also known as{" "}
            <Link
              to="/Nexus-Finance/Business-loans/Debtor-&-invoice-finance"
              style={{
                color: themeColors.accent,
                textDecoration: "underline",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              debtor finance
            </Link>
            —comes in. It’s a proven financial tool that helps businesses
            unlock cash tied up in unpaid invoices. But despite its growing
            popularity, invoice finance is still misunderstood across
             post, we’ll bust five common myths about invoice
            finance, explain how it actually works, and show why modern,
            transparent providers like Nexus Finance’s{" "}
            <Link
              to="/Nexus-Finance/Business-loans/Debtor-&-invoice-finance"
              style={{
                color: themeColors.accent,
                textDecoration: "underline",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              Invoice Finance Solutions
            </Link>{" "}
            are changing the narrative for 
          </Typography>
        </Container>

        {/* Blog Sections */}
        <Box sx={{ maxWidth: "1150px", mx: "auto", py: 5, px: 2 }}>
          {blogSections.map((section, index) => (
            <Grid key={index} container spacing={2} sx={{ mb: 10 }}>
              <Paper
                elevation={4}
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    md: index % 2 === 0 ? "row" : "row-reverse",
                  },
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={section.img}
                  alt={section.heading}
                  sx={{
                    width: { xs: "100%", md: "50%" },
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
                <Box
                  sx={{
                    width: { xs: "100%", md: "50%" },
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: themeColors.sectionBg,
                  }}
                >
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      backgroundImage: cardGradient,
                      backgroundSize: "200%",
                      backgroundClip: "text",
                      fontWeight: 600,
                      textFillColor: "transparent",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {section.heading}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: themeColors.description, lineHeight: 1.9 }}
                  >
                    {Array.isArray(section.description)
                      ? section.description.map((desc, i) => (
                          <span key={i}>
                            {desc}
                            <br />
                            <br />
                          </span>
                        ))
                      : section.description}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Box>

        {/* Why Choose Nexus */}
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Typography
            variant="h4"
            textAlign="center"
            gutterBottom
            sx={{ fontWeight: 700, color: themeColors.text }}
          >
            Why Choose Nexus Finance for{" "}
            <Link
              to="/Nexus-Finance/Business-loans/Debtor-&-invoice-finance"
              style={{
                color: themeColors.accent,
                textDecoration: "underline",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              Invoice Finance Solutions
            </Link>
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ color: themeColors.description, mb: 4 }}
          >
            Here’s what sets Nexus Finance apart in the 
          </Typography>
          <Grid container spacing={2}>
            {[
              {
                icon: <CheckCircle />,
                text: "Fast Approvals: Get funds within 24–48 hours after submitting invoices.",
              },
              {
                icon: <CheckCircle />,
                text: "Transparent Fees: No hidden costs, no long-term contracts.",
              },
              {
                icon: <CheckCircle />,
                text: "Flexible Funding: Choose which invoices to finance—no “all in” requirement.",
              },
              {
                icon: <CheckCircle />,
                text: "Local Expertise: eam that understands SME cash-flow challenges.",
              },
              {
                icon: <CheckCircle />,
                text: "Personalised Support: Direct access to finance specialists for guidance.",
              },
            ].map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <ListItem>
                  <ListItemIcon sx={{ color: "#2ECC71" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ color: themeColors.text }}
                  />
                </ListItem>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* FAQs */}
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Typography
            variant="h4"
            textAlign="center"
            gutterBottom
            sx={{ fontWeight: 700, color: themeColors.text }}
          >
            Frequently Asked Questions
          </Typography>
          {faqs.map((faq, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ color: themeColors.text, fontWeight: 600 }}
              >
                {faq.q}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: themeColors.description }}
              >
                {faq.a}
              </Typography>
            </Box>
          ))}
        </Container>

        {/* Final Thoughts */}
        <Container maxWidth="md" sx={{ py: 6, textAlign: "center" }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 700, color: themeColors.text }}
          >
            Final Thoughts
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: themeColors.description, lineHeight: 1.9, mb: 2 }}
          >
            Invoice finance myths have held too many ck from
            faster, smarter cash-flow management. The reality is that invoice
            finance has evolved—it’s now a transparent, flexible, and accessible
            solution used by growth-focused businesses across 
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: themeColors.description, lineHeight: 1.9 }}
          >
            By partnering with a trusted, local provider like Nexus Finance,
            you can turn unpaid invoices into immediate opportunities—funding
            operations, expansion, and innovation without taking on new debt.
            Learn more about how Nexus Finance’s{" "}
            <Link
              to="/Nexus-Finance/Business-loans/Debtor-&-invoice-finance"
              style={{
                color: themeColors.accent,
                textDecoration: "underline",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              Invoice Finance Solutions
            </Link>{" "}
            can help your business thrive today.
          </Typography>
        </Container>

        {/* Share */}
        <Divider
          sx={{
            my: 6,
            borderColor: isDarkMode
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.1)",
          }}
        />
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom sx={{ color: themeColors.text }}>
            Share this blog:
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
              gap: 2,
            }}
          >
            <IconButton
              aria-label="share on Twitter"
              onClick={() =>
                window.open(`https://twitter.com/intent/tweet?url=${BLOG_URL}`)
              }
              sx={{ color: "lightblue", "&:hover": { color: "#1DA1F2" } }}
            >
              <Twitter sx={{ fontSize: 40 }} />
            </IconButton>
            <IconButton
              aria-label="share on LinkedIn"
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/shareArticle?url=${BLOG_URL}`
                )
              }
              sx={{ color: "lightblue", "&:hover": { color: "#0077b5" } }}
            >
              <LinkedIn sx={{ fontSize: 40 }} />
            </IconButton>
            <IconButton
              aria-label="share on Facebook"
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${BLOG_URL}`
                )
              }
              sx={{ color: "lightblue", "&:hover": { color: "#1877F2" } }}
            >
              <Facebook sx={{ fontSize: 40 }} />
            </IconButton>
            <IconButton
              aria-label="share on WhatsApp"
              onClick={() =>
                window.open(`https://api.whatsapp.com/send?text=${BLOG_URL}`)
              }
              sx={{ color: "lightblue", "&:hover": { color: "#25D366" } }}
            >
              <WhatsApp sx={{ fontSize: 40 }} />
            </IconButton>
            <IconButton
              aria-label="share via Email"
              onClick={() =>
                window.open(`mailto:?subject=Check this blog&body=${BLOG_URL}`)
              }
              sx={{ color: "lightblue", "&:hover": { color: "#0a66c2" } }}
            >
              <Email sx={{ fontSize: 40 }} />
            </IconButton>
          </Box>
        </Container>

        <Divider
          sx={{
            my: 6,
            borderColor: isDarkMode
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.1)",
          }}
        />

        {/* Comments */}
        <Container maxWidth="md" sx={{ pb: 8 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: themeColors.text }}
          >
            Leave a Comment
          </Typography>
          <div
            className="fb-comments"
            data-href={BLOG_URL}
            data-width="100%"
            data-numposts="5"
            data-colorscheme={isDarkMode ? "dark" : "light"}
          ></div>
        </Container>
      </Box>
    </>
  );
}