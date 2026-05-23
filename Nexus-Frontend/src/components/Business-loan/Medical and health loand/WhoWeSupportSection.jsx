import { Grid, Card, CardContent, Typography, Box, useTheme as useMuiTheme } from "@mui/material";
import { useTheme } from "../../../contexts/ThemeContext";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PeopleIcon from "@mui/icons-material/People";
import ElderlyIcon from "@mui/icons-material/Elderly";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HomeIcon from "@mui/icons-material/Home";
import AccessibleIcon from "@mui/icons-material/Accessible";
import MapIcon from "@mui/icons-material/Map";
import BiotechIcon from "@mui/icons-material/Biotech";
const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";


const whoWeSupport = [
  { label: "Diagnostic Providers", icon: BiotechIcon },
  { label: "General Practitioners", icon: MedicalServicesIcon },
  { label: "Childcare Operators", icon: PeopleIcon },
  { label: "Aged Care Providers", icon: ElderlyIcon },
  { label: "Pharmacy Operators", icon: LocalPharmacyIcon },
  { label: "Private Hospital Operators", icon: LocalHospitalIcon },
  { label: "Home Care Providers", icon: HomeIcon },
  { label: "Specialist Disability Operators", icon: AccessibleIcon },
  { label: "Land Lease Operators", icon: MapIcon },
];

export default function WhoWeSupportSection() {
  const { isDarkMode } = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: isDarkMode ? "#121212" : "#f9f9f9",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Responsive & Centered Heading */}
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
Who We Support
                                                              
                                                               </Typography>
      {/* Subheading */}
      <Typography
        variant="h6"
        textAlign="center"
        color={isDarkMode ? "white" : "black"}
        sx={{
          maxWidth: 800,
          mx: "auto",
          mb: 6,
          fontSize: { xs: "1rem", sm: "1.1rem" }, // responsive subheading size
          px: { xs: 2, sm: 0 }, // padding for mobile so text doesn't touch edges
        }}
      >
        When it comes to healthcare, we are better equipped to deliver
        specialized and tailored financial solutions at Nexus Finance.
      </Typography>

      {/* Cards Grid */}
      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        {whoWeSupport.map((item, index) => {
          const Icon = item.icon;
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={index}
              sx={{ display: "flex" }}
            >
              <Card
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 3,
                  borderRadius: 3,
                  textAlign: "center",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
                  border: isDarkMode
                    ? "1px solid #333333"
                    : "1px solid #e0e0e0",
                  boxShadow: isDarkMode
                    ? "0 4px 12px rgba(0,0,0,0.3)"
                    : "0 4px 12px rgba(0,0,0,0.08)",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: isDarkMode
                      ? "0 8px 24px rgba(0,0,0,0.4)"
                      : "0 8px 24px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Icon
                  sx={{
                    fontSize: 46,
                    mb: 1,
                    color: "#076a49",
                  }}
                />
                <CardContent sx={{ p: 0 }}>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    color={isDarkMode ? "white" : "black"}
                  >
                    {item.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
