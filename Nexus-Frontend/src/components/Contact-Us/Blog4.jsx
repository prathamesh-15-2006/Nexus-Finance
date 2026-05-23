import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  Divider,
  Button,
  Grid,
} from "@mui/material";
import {
  Twitter,
  LinkedIn,
  Facebook,
  WhatsApp,
  Email,
} from "@mui/icons-material";
import { Helmet } from "react-helmet-async";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BlogBackground from "../../asset/ContactPage/blog3/blog5.webp"; // Main background image
import GraphImage from "../../asset/ContactPage/blogGraph2.webp"; // Import your graph image here
import { useTheme } from "../../contexts/ThemeContext";

const BLOG_URL =
  "https://www.Nexusfinance.com.au/why-apr-matters-more-than-simple-interest-rates";

export default function APRvsSimpleInterest() {
  const { isDarkMode } = useTheme();

  const themeColors = {
    background: isDarkMode ? "#0c0d12" : "#f8f9fa",
    paperBg: isDarkMode ? "#1a1c24" : "#ffffff",
    heading: isDarkMode ? "#e0eafb" : "#1a2a4c",
    description: isDarkMode ? "#b3b6c2" : "#556070",
    textPrimary: isDarkMode ? "#f0f2f5" : "#1a1a1a",
    accent: isDarkMode ? "#00c4ff" : "#4a69ff",
    boxShadow: isDarkMode ? "0 8px 25px rgba(0,0,0,0.5)" : "0 8px 25px rgba(0,0,0,0.08)",
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent(BLOG_URL);
    const text = encodeURIComponent(
      "Why APR Matters More Than “Simple” Interest Rates – Comparison between APR & Simple Interest"
    );
    let shareUrl = "";
    switch (platform) {
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${text}&body=${url}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src =
        "https://connect.facebook.com/en_US/sdk.js#xfbml=1&version=v19.0";
      document.body.appendChild(script);
      script.onload = () => window.FB && window.FB.XFBML.parse();
    } else {
      window.FB && window.FB.XFBML.parse();
    }
  }, [isDarkMode]);

  const sections = [
    {
      heading: "What’s the Difference Between APR and Simple Interest?",
      description: (
        <>
          <Typography
            variant="body1"
            sx={{
              color: themeColors.description,
              lineHeight: 1.7,
              mb: 2,
              fontWeight: "bold",
            }}
          >
            APR (Annual Percentage Rate):
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: themeColors.description, lineHeight: 1.7, mb: 2 }}
          >
            APR is the interest rate expressed annually. It’s calculated by multiplying the rate charged at each repayment by the number of repayments in that year. This method gives you a realistic picture of what you’ll actually pay over the life of the loan.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: themeColors.description,
              lineHeight: 1.7,
              mb: 2,
              fontWeight: "bold",
            }}
          >
            Annual Simple Rate:
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: themeColors.description, lineHeight: 1.7 }}
          >
           The simple rate is typically shown as the total interest cost paid as a percentage of the loan amount, divided by the loan term in years. While it sounds straightforward, it often understates the true cost of credit because it doesn’t account for repayment frequency.
          </Typography>
        </>
      ),
    },
    {
      heading: "Real Example: APR vs. Simple Rate",
      description: (
        <>
          <Typography
            variant="body1"
            sx={{ color: themeColors.description, lineHeight: 1.7, mb: 2 }}
          >
            The below report highlights just how misleading “simple” rates can
            be:
          </Typography>
          <Box
            sx={{
              overflowX: "auto",
              my: 3,
              borderRadius: 2,
              border: `1px solid ${themeColors.accent}`,
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                color: themeColors.textPrimary,
              }}
            >
              <thead>
                <tr style={{ background: themeColors.paperBg }}>
                  <th style={{ padding: "12px", textAlign: "left" }}>Loan</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Amount</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Term</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Quoted Rate</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Actual APR</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Fortnightly Repayment</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Total Cost of Credit</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: themeColors.paperBg }}>
                  <td style={{ padding: "12px" }}>Business loan with APR (As quoted by Nexus Finance)</td>
                  <td style={{ padding: "12px" }}>$50,000</td>
                  <td style={{ padding: "12px" }}>2 years</td>
                  <td style={{ padding: "12px" }}>18.95% APR</td>
                  <td style={{ padding: "12px" }}>18.95% APR</td>
                  <td style={{ padding: "12px" }}>$1,158</td>
                  <td style={{ padding: "12px" }}>$10,252</td>
                </tr>
                <tr style={{ background: themeColors.paperBg }}>
                  <td style={{ padding: "12px" }}>Business loan with simple rate (Other lenders)</td>
                  <td style={{ padding: "12px" }}>$50,000</td>
                  <td style={{ padding: "12px" }}>2 years</td>
                  <td style={{ padding: "12px" }}>18.95% simple rate</td>
                  <td style={{ padding: "12px" }}>33.55% APR</td>
                  <td style={{ padding: "12px" }}>$1,325</td>
                  <td style={{ padding: "12px" }}>$18,891</td>
                </tr>
              </tbody>
            </table>
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: themeColors.description,
              lineHeight: 1.7,
              mb: 2,
              fontStyle: "italic",
            }}
          >
            📊 As shown in the chart below, the cost of the “simple rate” loan
            is almost double compared to the APR-based loan.
          </Typography>
        </>
      ),
    },
    // New section for the chart
    {
      heading: "Visualizing the Impact: APR vs. Simple Rate",
      description: (
        <Box sx={{ width: '100%', height: 400, mt: 3, mb: 4 }}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: isDarkMode ? '#2c2d3a' : '#f0f0f0',
              borderRadius: 2,
              color: isDarkMode ? '#b3b6c2' : '#556070',
              border: `1px dashed ${isDarkMode ? '#556070' : '#d0d0d0'}`,
            }}
          >
            {/* Replaced placeholder text with the imported image */}
            <img 
              src={GraphImage} 
              alt="Graph comparing APR vs Simple Rate loan costs" 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%', 
                objectFit: 'contain',
                borderRadius: 'inherit' // Inherit border-radius from parent Box
              }} 
            />
          </Box>
          {/* <Typography
            variant="body2"
            sx={{
              color: themeColors.description,
              mt: 2,
              fontStyle: 'italic',
            }}
          >
            This graph visually represents the significant difference in the total cost of credit between a loan
            quoted with a 'simple rate' and one with a transparent APR.
          </Typography> */}
        </Box>
      ),
    },
    {
      heading: "Why Nexus Finance Uses APR",
      description: (
        <>
          <Typography
            variant="body1"
            sx={{ color: themeColors.description, lineHeight: 1.7, mb: 1 }}
          >
            At Nexus Finance, we quote using APR, not simple interest. This
            means:
          </Typography>
          <ul>
            <li>
              <Typography
                variant="body1"
                sx={{ color: themeColors.description, lineHeight: 1.7 }}
              >
                ✅ You get full transparency on the true cost of borrowing.
              </Typography>
            </li>
            <li>
              <Typography
                variant="body1"
                sx={{ color: themeColors.description, lineHeight: 1.7 }}
              >
                ✅ You can compare loans on a like-for-like basis.
              </Typography>
            </li>
            <li>
              <Typography
                variant="body1"
                sx={{ color: themeColors.description, lineHeight: 1.7 }}
              >
                ✅ You avoid the hidden traps of “low advertised rates” that balloon into higher repayments.
              </Typography>
            </li>
          </ul>
          <Typography
            variant="body1"
            sx={{ color: themeColors.description, lineHeight: 1.7, mt: 2 }}
          >
           We also provide amortisation schedules so you can clearly see how your repayments are structured over time.
          </Typography>
        </>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Why APR Matters More Than “Simple” Interest Rates – Comparison
        </title>
      </Helmet>

      <Box sx={{ background: themeColors.background, minHeight: "100vh" }}>
        {/* Header and Hero */}
        <Box
          sx={{
            py: { xs: 8, md: 10 },
            px: { xs: 2, md: 4 },
            background: `linear-gradient(rgba(0, 0, 0, ${isDarkMode ? "0.6" : "0.5"}), rgba(0, 0, 0, ${isDarkMode ? "0.6" : "0.5"})), url(${BlogBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            color: "#ffffff",
          }}
        >
          <Container maxWidth="lg" sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => window.history.back()}
              sx={{
                position: "absolute",
                top: { xs: -40, md: -60 },
                left: { xs: 0, md: -24 },
                color: "#fff",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
              }}
            >
              Back
            </Button>
            <Typography
              variant="h3"
              component="h1"
              fontWeight={700}
              sx={{
                fontSize: { xs: "2rem", md: "3.5rem" },
                mb: 2,
                textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
              }}
            >
              Why APR Matters More Than “Simple” Interest Rates
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
              admin • {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </Typography>
          </Container>
        </Box>

        {/* Article Intro */}
        <Container maxWidth="md" sx={{ mt: { xs: 4, md: 6 } }}>
          <Paper
            elevation={4}
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: 2,
              backgroundColor: themeColors.paperBg,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontStyle: "italic",
                textAlign: "center",
                color: themeColors.description,
              }}
            >
             When it comes to business loans, not all interest rates are created equal. Many lenders advertise their products using a simple annual rate, which can make loans look cheaper than they actually are. At Nexus Finance, we want our clients to understand the true cost of borrowing — that’s why we use the Annual Percentage Rate (APR) when quoting our loan pricing.
            </Typography>
          </Paper>
        </Container>

        {/* Sections */}
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            {sections.map((sec, index) => (
              <Grid item xs={12} key={index}>
                <Paper
                  elevation={4}
                  sx={{
                    p: { xs: 2, md: 4 },
                    borderRadius: 2,
                    backgroundColor: themeColors.paperBg,
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: themeColors.boxShadow,
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    fontWeight={600}
                    sx={{
                      color: themeColors.heading,
                      mb: 2,
                    }}
                  >
                    {sec.heading}
                  </Typography>
                  {sec.description}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Outro */}
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Paper
            elevation={4}
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: 2,
              textAlign: "center",
              backgroundColor: themeColors.paperBg,
            }}
          >
            <Typography
              variant="body1"
              sx={{ mb: 2, color: themeColors.description }}
            >
              Knowing the true cost of your loan can save your business thousands of dollars.
              Don’t be misled by lenders advertising “simple” rates that don’t tell the full story.
              Always compare:
            </Typography>
            <ul
              style={{
                listStyleType: "none",
                padding: 0,
                textAlign: "center",
              }}
            >
              <li>
                <Typography
                  variant="body1"
                  sx={{ color: themeColors.description, lineHeight: 1.7 }}
                >
                  <strong>Loan amount</strong>
                </Typography>
              </li>
              <li>
                <Typography
                  variant="body1"
                  sx={{ color: themeColors.description, lineHeight: 1.7 }}
                >
                  <strong>Term</strong>
                </Typography>
              </li>
              <li>
                <Typography
                  variant="body1"
                  sx={{ color: themeColors.description, lineHeight: 1.7 }}
                >
                  <strong>Repayment structure</strong>
                </Typography>
              </li>
              <li>
                <Typography
                  variant="body1"
                  sx={{ color: themeColors.description, lineHeight: 1.7 }}
                >
                  <strong>Fees</strong>
                </Typography>
              </li>
            </ul>
            <Typography
              variant="body1"
              sx={{ color: themeColors.description, mt: 2 }}
            >
              At Nexus Finance, our goal is to give you clarity and
              confidence when choosing finance — because better knowledge
              means better decisions.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: themeColors.description,
                mt: 2,
                fontWeight: "bold",
              }}
            >
              📞 Have questions? Call us on 9370439566 or email
              info@Nexusfinance.com.au and we’ll walk you through your
              options.
            </Typography>
          </Paper>
        </Container>

        {/* Share Section */}
        <Container maxWidth="md" sx={{ mt: 8, textAlign: "center" }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: themeColors.textPrimary, fontFamily: "serif" }}
          >
            Share this blog
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
              gap: 2,
            }}
          >
            <IconButton
              aria-label="share on Twitter"
              onClick={() => handleShare("twitter")}
              sx={{
                color: isDarkMode ? "#1DA1F2" : "#1DA1F2",
                "&:hover": { transform: "scale(1.1)", opacity: 0.8 },
              }}
            >
              <Twitter sx={{ fontSize: 40 }} />
            </IconButton>
            <IconButton
              aria-label="share on LinkedIn"
              onClick={() => handleShare("linkedin")}
              sx={{
                color: isDarkMode ? "#0077b5" : "#0077b5",
                "&:hover": { transform: "scale(1.1)", opacity: 0.8 },
              }}
            >
              <LinkedIn sx={{ fontSize: 40 }} />
            </IconButton>
            <IconButton
              aria-label="share on Facebook"
              onClick={() => handleShare("facebook")}
              sx={{
                color: isDarkMode ? "#1877F2" : "#1877F2",
                "&:hover": { transform: "scale(1.1)", opacity: 0.8 },
              }}
            >
              <Facebook sx={{ fontSize: 40 }} />
            </IconButton>
            <IconButton
              aria-label="share on WhatsApp"
              onClick={() => handleShare("whatsapp")}
              sx={{
                color: isDarkMode ? "#25D366" : "#25D366",
                "&:hover": { transform: "scale(1.1)", opacity: 0.8 },
              }}
            >
              <WhatsApp sx={{ fontSize: 40 }} />
            </IconButton>
            <IconButton
              aria-label="share via Email"
              onClick={() => handleShare("email")}
              sx={{
                color: isDarkMode ? "#00c4ff" : "#4a69ff",
                "&:hover": { transform: "scale(1.1)", opacity: 0.8 },
              }}
            >
              <Email sx={{ fontSize: 40 }} />
            </IconButton>
          </Box>
        </Container>
        <Divider sx={{ my: 6 }} />

        {/* Comments Section */}
        <Container maxWidth="md">
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: themeColors.textPrimary, fontFamily: "serif" }}
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