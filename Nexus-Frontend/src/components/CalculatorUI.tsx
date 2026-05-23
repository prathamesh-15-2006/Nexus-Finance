import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Slider,
  Button,
  Divider,
  Container,
  Grid,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTheme } from "../contexts/ThemeContext";

const slides = [
  {
    tag: "Smart Loans For Bright Futures",
    title: "Smart Finance Solutions For Your Business",
  },
  {
    tag: "Fast Approvals For Bold Decisions",
    title: "Flexible Funding Tailored To Your Goals",
  },
  {
    tag: "Grow More With Less Stress",
    title: "Empower Your Business With Smart Capital",
  },
];

interface CalculatorUIProps {
  isDarkMode?: boolean;
}

export default function CalculatorUI({ isDarkMode: propIsDarkMode }: CalculatorUIProps) {
  const navigate = useNavigate();
  const { isDarkMode: contextIsDarkMode } = useTheme();
  const isDarkMode = propIsDarkMode !== undefined ? propIsDarkMode : contextIsDarkMode;
  const [loanAmount, setLoanAmount] = useState<number>(5000000);
  const [months, setMonths] = useState<number>(60);
  const [slideIndex, setSlideIndex] = useState(0);

  const interestRate = 0.15;
  const payMonthly = Math.round((loanAmount * (1 + interestRate)) / months);
  const totalPayBack = payMonthly * months;

  const handlePrev = () =>
    setSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const handleNext = () =>
    setSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const sliderSx = {
    color: "#00D4E8",
    height: 4,
    "& .MuiSlider-thumb": {
      width: 20,
      height: 20,
      backgroundColor: "#00D4E8",
      border: `3px solid ${isDarkMode ? "#1e293b" : "white"}`,
      boxShadow: "0 0 0 3px #00D4E8",
      "&:hover": { boxShadow: "0 0 0 5px rgba(0,212,232,0.3)" },
    },
    "& .MuiSlider-rail": { backgroundColor: isDarkMode ? "rgba(255,255,255,0.2)" : "#CBD5E1", opacity: 1 },
    "& .MuiSlider-track": { backgroundColor: "#00D4E8" },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: isDarkMode
          ? "linear-gradient(135deg, #090d16 0%, #0f172a 100%)"
          : "linear-gradient(135deg, #f0f4f8 0%, #e2ebf0 100%)",
        display: "flex",
        alignItems: "center",
        py: { xs: 6, md: 0 },
        transition: "all 0.5s ease",
      }}
    >
      <Container maxWidth="xl">
        <Grid container ml={{ xs: 0, lg: 15 }} alignItems="center">

          {/* LEFT SIDE */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <Box sx={{ position: "relative", pr: { lg: 6 } }}>

              {/* 🔥 ADDED SMOOTH SLIDING LINE ABOVE TEXT */}
              <Box
                sx={{
                  position: "relative",
                  width: 150,
                  height: 4,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: 10,
                  overflow: "hidden",
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${100 / slides.length}%`,
                    height: "100%",
                    backgroundColor: "#00D4E8",
                    borderRadius: 10,
                    transform: `translateX(${slideIndex * 100}%)`,
                    transition: "transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)",
                  }}
                />
              </Box>

              <Typography
                variant="h3"
                sx={{
                  color: isDarkMode ? "white" : "#0F1B4C",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  mb: 5,
                  fontSize: { xs: "2rem", md: "2.8rem" },
                  transition: "color 0.5s ease",
                }}
              >
                {slides[slideIndex].title}
              </Typography>

              <Button
                variant="outlined"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate("/calculator")}
                sx={{
                  borderColor: isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(15, 27, 76, 0.5)",
                  color: isDarkMode ? "white" : "#0F1B4C",
                  fontWeight: 700,
                  letterSpacing: 1,
                  px: 3,
                  py: 1.5,
                  borderRadius: 0,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#00D4E8",
                    color: "#00D4E8",
                    backgroundColor: isDarkMode ? "rgba(0, 212, 232, 0.1)" : "rgba(0, 212, 232, 0.05)",
                  },
                }}
              >
                GET STARTED
              </Button>
            </Box>
          </Grid>

          {/* RIGHT SIDE — Calculator Card */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  backgroundColor: isDarkMode ? "rgba(30, 41, 59, 0.7)" : "white",
                  backdropFilter: "blur(20px)",
                  ml: { xs: 0, lg: 16 },
                  p: { xs: 3, sm: 4, md: 5 },
                  boxShadow: isDarkMode 
                    ? "0 25px 70px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)" 
                    : "0 25px 70px rgba(15, 27, 76, 0.15)",
                  maxWidth: { md: 480, lg: 540 },
                  flex: 1,
                  borderTopRightRadius: "80px",
                  borderBottomLeftRadius: "80px",
                  borderTopLeftRadius: "0px",
                  borderBottomRightRadius: "0px",
                  border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
                  transition: "all 0.5s ease",
                }}
              >
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ fontWeight: 700, color: isDarkMode ? "white" : "#0F1B4C", mb: 4, transition: "color 0.5s ease" }}
                >
                  How Much Do You Need?
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <Typography fontWeight={700} sx={{ color: isDarkMode ? "#00D4E8" : "#0F1B4C", transition: "color 0.5s ease" }}>
                    ${loanAmount.toLocaleString()}
                  </Typography>
                  <Slider
                    value={loanAmount}
                    min={1000}
                    max={50000}
                    step={500}
                    onChange={(_, val) => setLoanAmount(val as number)}
                    sx={sliderSx}
                  />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography fontWeight={700} sx={{ color: isDarkMode ? "#00D4E8" : "#0F1B4C", transition: "color 0.5s ease" }}>
                    {months} {months === 1 ? "Month" : "Months"}
                  </Typography>
                  <Slider
                    value={months}
                    min={1}
                    max={12}
                    step={1}
                    onChange={(_, val) => setMonths(val as number)}
                    sx={sliderSx}
                  />
                </Box>

                <Divider sx={{ mb: 2, borderColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)", transition: "border-color 0.5s ease" }} />

                {[
                  { label: "Pay Monthly", value: `$${payMonthly.toLocaleString()}` },
                  { label: "Term of Use", value: `${months} Month` },
                  {
                    label: "Total Pay Back Amount",
                    value: `$${totalPayBack.toLocaleString()}`,
                  },
                ].map(({ label, value }) => (
                  <Box key={label}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        py: 2,
                      }}
                    >
                      <Typography fontWeight={600} sx={{ color: isDarkMode ? "#cbd5e1" : "#0F1B4C", transition: "color 0.5s ease" }}>
                        {label}
                      </Typography>
                      <Typography fontWeight={700} sx={{ color: isDarkMode ? "white" : "#0F1B4C", transition: "color 0.5s ease" }}>
                        {value}
                      </Typography>
                    </Box>
                    <Divider sx={{ borderColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)", transition: "border-color 0.5s ease" }} />
                  </Box>
                ))}

                <Button
                  fullWidth
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate("/calculator")}
                  sx={{
                    mt: 3,
                    backgroundColor: "#00D4E8",
                    color: "#0F1B4C",
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    py: 1.6,
                    borderRadius: 0,
                    transition: "all 0.3s ease",
                    "&:hover": { 
                      backgroundColor: "#00bcd4",
                      boxShadow: "0 0 15px rgba(0, 212, 232, 0.4)",
                    },
                  }}
                >
                  APPLY FOR LOAN
                </Button>
              </Box>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}