import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Container, Button, TextField } from '@mui/material';
import { motion, useAnimation, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowForward } from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';
import { submitPartnerApplication } from '../../services/api';
import {
  Shield,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  Target,
  Heart,
  Briefcase,
  Star,
  ExternalLink,
  Store,
  Truck,
  Factory,
  ShoppingBag,
  Home,
} from "lucide-react";

import bgimg from '../../asset/bgimgs/banner.webp';

// Core-slicker images removed - folder was deleted

import unsecuredBusinessLoan from '../../asset/patner/unsecured.webp';
import businessLoan from '../../asset/patner/business.webp';
import propertyLoan from '../../asset/patner/property.webp';
import assetLoan from '../../asset/patner/asset.webp';


const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

const Patner = () => {
  const { isDarkMode } = useTheme();

  const gradientText = {
    background: cardGradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
  };

  // Timeline events for partner process
  const timelineEvents = [
    {
      id: 'step1',
      date: 'Step 1',
      title: 'Share your client details',
      description: 'Provide us with your client information and requirements.',
      icon: <span className="text-white font-bold">1</span>,
      color: 'violet',
    },
    {
      id: 'step2',
      date: 'Step 2',
      title: 'We assess their eligibility and submit application',
      description: 'Our team evaluates the client\'s eligibility and processes the application.',
      icon: <span className="text-white font-bold">2</span>,
      color: 'violet',
    },
    {
      id: 'step3',
      date: 'Step 3',
      title: 'Clients get approved and funded',
      description: 'Upon approval, clients receive their funding quickly and efficiently.',
      icon: <span className="text-white font-bold">3</span>,
      color: 'violet',
    },
    {
      id: 'step4',
      date: 'Step 4',
      title: 'You make commission',
      description: 'Earn competitive commissions on successful partnerships.',
      icon: <span className="text-white font-bold">4</span>,
      color: 'violet',
    },
  ];

  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    profession: '',
    businessDescription: '',
    businessName: '',
    businessAbn: '',
    streetAddress: '',
    city: '',
    state: '',
    postCode: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitMessage('');

  const payload = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    contactNo: formData.contactNo,
    profession: formData.profession,
    businessDescription: formData.businessDescription,
    businessName: formData.businessName,
    businessAbn: formData.businessAbn,
    streetAddress: formData.streetAddress,
    city: formData.city,
    state: formData.state,
    postCode: formData.postCode,
  };

  try {
    const result = await submitPartnerApplication(payload);
    console.log("Server Response:", result);

    setSubmitMessage("Form submitted successfully! We will contact you soon.");

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      contactNo: "",
      profession: "",
      businessDescription: "",
      businessName: "",
      businessAbn: "",
      streetAddress: "",
      city: "",
      state: "",
      postCode: "",
    });

  } catch (error) {
    console.error("Submission error:", error);
    setSubmitMessage("Error submitting form. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};


  const timelineContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineContainerRef,
    offset: ["start center", "end center"]
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Core-slicker images were removed (folder deleted), but the marquees still referenced coreSlicker1..N.
  // Reuse the partner category images that still exist to keep the UI working and prevent runtime crashes.
  const baseLogos = [
    { src: unsecuredBusinessLoan, alt: 'Unsecured Business Loan Partner' },
    { src: businessLoan, alt: 'Business Loan Partner' },
    { src: propertyLoan, alt: 'Property Loan Partner' },
    { src: assetLoan, alt: 'Asset Loan Partner' },
  ];

  // Duplicate to create enough items for the marquee loop.
  const logos = [...baseLogos, ...baseLogos, ...baseLogos];
  const logos1 = [...baseLogos.slice().reverse(), ...baseLogos.slice().reverse(), ...baseLogos.slice().reverse()];

  // Data for the 'Why Choose Us' section
  const whyChooseUs = [
    {
      icon: Target,
      title: "Access to 20+Lenders",
      description:
        "Including major banks, credit unions, and non-bank lenders for the best rates and terms.",
    },
    {
      icon: Heart,
      title: "Personalized Service",
      description:
        "Tailored loan structuring and comparison to match your unique financial situation.",
    },
    {
      icon: TrendingUp,
      title: "Fast Pre-Approvals",
      description:
        "Expert support throughout your loan journey with quick pre-approval processes.",
    },
    {
      icon: Shield,
      title: "Ongoing Support",
      description:
        "Continued assistance even after settlement to ensure your finances stay on track.",
    },
  ];

  const googleReviewsUrl = "https://www.google.com/search?q=NexNsinance+autralia&rlz=1C1VDKB_enIN1105IN1105&oq=NeNexxsance+autralia&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQIRgVMgcIAhAhGI8CMgcIAxAhGI8C0gEJNTEwNWowajE1qAIIsAIB8QWoI5dGfA2chg&sourceid=chrome&ie=UTF-8#lrd=0x6b12a3a12a1c9b59:0x7d1c883481ba71e2,1,,,,";

  const testimonials = [
    {
      name: 'Toni Enriquez',
      role: 'Small Business Owner',
      content: 'Exceptional service and guidance from Nexus Finance! Working with Prathamesh, the Director at NeNnxusance, was an outstanding experience from start to finish.',
      rating: 5,
      icon: Store,
      businessType: 'Retail',
      location: 'Sydney, NSW'
    },
    {
      name: 'Roli Aggarwal',
      role: 'HR Bridge',
      content: 'Incredible experience with Nexus Finance! We urgently needed $80,000 to cover upcoming payroll and keep operations smooth. Within just 12 hours, the funds were in our account—no delays, no confusion.',
      rating: 5,
      icon: Users,
      businessType: 'Consulting',
      location: 'Melbourne, VIC'
    },
    {
      name: 'Baljinder Kaur',
      role: 'Transport Business Owner',
      content: 'Urgent unsecured business loan secured in 12 hours with favorable terms. The team understood our industry challenges and provided tailored solutions.',
      rating: 5,
      icon: Truck,
      businessType: 'Transport',
      location: 'Brisbane, QLD'
    },
    {
      name: 'Sam Rajput',
      role: 'Logistics Company Director',
      content: 'I had an excellent experience with Nexus Finance and would like to especially thank Prathamesh Gupta for his outstanding service and industry expertise.',
      rating: 5,
      icon: Factory,
      businessType: 'Manufacturing',
      location: 'Perth, WA'
    },
    {
      name: 'Sarah Johnson',
      role: 'Restaurant Owner',
      content: 'Nexus Finance helped us expand our restaurant chain with flexible financing options. Their understanding of hospitality industry needs was impressive.',
      rating: 5,
      icon: ShoppingBag,
      businessType: 'Hospitality',
      location: 'Adelaide, SA'
    },
    {
      name: 'Michael Chen',
      role: 'Property Developer',
      content: 'Professional and efficient service for our property development project. Quick approval process and competitive rates exceeded our expectations.',
      rating: 5,
      icon: Home,
      businessType: 'Real Estate',
      location: 'Gold Coast, QLD'
    }
  ];

  const handleReviewClick = () => {
    window.open(googleReviewsUrl, '_blank');
  };

  return (
    <>
      {/* Hero Section */}
       <Box
              sx={{
                position: "relative",
                height: "110vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                backgroundImage: `url(${bgimg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                overflow: "hidden",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(0,0,0,0.3))",
                  zIndex: 1,
                },
              }}
            >
              <Container sx={{ position: "relative", zIndex: 2 }}>
                <Box
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "20px",
                    padding: "40px",
                    display: "inline-block",
                    maxWidth: "10000px",
                    margin: "0 auto",
                  }}
                >
                  <Typography
                    variant="h2"
                    component="h2"
                    sx={{
                      fontSize: { xs: "2.25rem", sm: "3rem" },
                      fontWeight: 700,
                      mb: 5,
                      textAlign: "center",
                      background: cardGradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
Partner With Nexus Finance  Wide
                  </Typography>
                  <Box sx={{ textAlign: "center", mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button
                     onClick={() => {
                  const contactForm = document.getElementById('call-us-form');
                  if (contactForm) {
                    contactForm.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                      variant="contained"
                      size="large"
                      sx={{
                        background: cardGradient,
                        color: 'white',
                        px: 6,
                        py: 2,
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        borderRadius: '50px',
                        textTransform: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: cardGradient,
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      Become a partner
                    </Button>
                    <Button
                      onClick={() => window.open('/Client-Deals', '_blank')}

                      variant="contained"
                      size="large"
                    
                      sx={{
                        background: cardGradient,
                        color: 'white',
                        px: 6,
                        py: 2,
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        borderRadius: '50px',
                        textTransform: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: cardGradient,
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      Submit client deal
                    </Button>
                  </Box>
                </Box>
              </Container>
      
              <style>
                {`
                  @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                  @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                `}
              </style>
            </Box>

      {/* New Section */}
      <Box sx={{ py: 8, backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5' }}>
        <Container>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem" },
              fontWeight: 700,
              mb: 6,
              textAlign: "center",
              background: cardGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Become our partner and get access to our top-industry products
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
              gap: 4,
            }}
          >
            {/* Card 1: Unsecured Business Loan */}
            <Box
              sx={{
                position: 'relative',
                height: 300,
                borderRadius: 4,
                overflow: 'hidden',
                backgroundImage: `url(${unsecuredBusinessLoan})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                p: 3,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
                  zIndex: 1,
                },
                '& .MuiTypography-root::after': {
                  content: '""',
                  position: 'absolute',
                  left: '0',
                  bottom: -5,
                  width: '0%',
                  height: '2px',
                  background: 'violet',
                  transition: 'width 0.3s ease-in-out',
                },
                '&:hover .MuiTypography-root::after': {
                  width: '100%',
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  mb: 2,
                  position: 'relative',
                  display: 'inline-block',
                  zIndex: 2,
                }}
              >
                Unsecured Business Loan
              </Typography>
              <Button
                variant="contained"
                onClick={() => window.open('/Nexus Finance/Business-loans/Unsecured-business-loans', '_blank')}
                sx={{
                  background: cardGradient,
                  backgroundSize: '200% 100%',
                  color: '#fff',
                  borderRadius: '50px',
                  textTransform: 'none',
                  position: 'relative',
                  zIndex: 2,
                  transition: 'background-position 0.5s ease-in-out, transform 0.3s ease',
                  '&:hover': {
                    backgroundPosition: '100% 0',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Learn more
              </Button>
            </Box>

            {/* Card 2: Business Loan */}
            <Box
              sx={{
                position: 'relative',
                height: 300,
                borderRadius: 4,
                overflow: 'hidden',
                backgroundImage: `url(${businessLoan})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                p: 3,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
                  zIndex: 1,
                },
                '& .MuiTypography-root::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: -5,
                  width: '0%',
                  height: '2px',
                  background: 'violet',
                  transition: 'width 0.3s ease-in-out',
                },
                '&:hover .MuiTypography-root::after': {
                  width: '100%',
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  mb: 2,
                  position: 'relative',
                  display: 'inline-block',
                  zIndex: 2,
                }}
              >
                Business Loan
              </Typography>
              <Button
                variant="contained"
                onClick={() => window.open('/Nexus Finance/Business-loans/Business-line-of-credit', '_blank')}
                sx={{
                  background: cardGradient,
                  backgroundSize: '200% 100%',
                  color: '#fff',
                  borderRadius: '50px',
                  textTransform: 'none',
                  position: 'relative',
                  zIndex: 2,
                  transition: 'background-position 0.5s ease-in-out, transform 0.3s ease',
                  '&:hover': {
                    backgroundPosition: '100% 0',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Learn more
              </Button>
            </Box>

            {/* Card 3: Property Loan */}
            <Box
              sx={{
                position: 'relative',
                height: 300,
                borderRadius: 4,
                overflow: 'hidden',
                backgroundImage: `url(${propertyLoan})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                p: 3,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
                  zIndex: 1,
                },
                '& .MuiTypography-root::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: -5,
                  width: '0%',
                  height: '2px',
                  background: 'violet',
                  transition: 'width 0.3s ease-in-out',
                },
                '&:hover .MuiTypography-root::after': {
                  width: '100%',
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  mb: 2,
                  position: 'relative',
                  display: 'inline-block',
                  zIndex: 2,
                }}
              >
                Property Loan
              </Typography>
              <Button
                variant="contained"
                onClick={() => window.open('/Nexus Finance/Property-Finance/Loan-against-property', '_blank')}
                sx={{
                  background: cardGradient,
                  backgroundSize: '200% 100%',
                  color: '#fff',
                  borderRadius: '50px',
                  textTransform: 'none',
                  position: 'relative',
                  zIndex: 2,
                  transition: 'background-position 0.5s ease-in-out, transform 0.3s ease',
                  '&:hover': {
                    backgroundPosition: '100% 0',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Learn more
              </Button>
            </Box>

            {/* Card 4: Asset Loan */}
            <Box
              sx={{
                position: 'relative',
                height: 300,
                borderRadius: 4,
                overflow: 'hidden',
                backgroundImage: `url(${assetLoan})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                p: 3,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
                  zIndex: 1,
                },
                '& .MuiTypography-root::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: -5,
                  width: '0%',
                  height: '2px',
                  background: 'violet',
                  transition: 'width 0.3s ease-in-out',
                },
                '&:hover .MuiTypography-root::after': {
                  width: '100%',
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  mb: 2,
                  position: 'relative',
                  display: 'inline-block',
                  zIndex: 2,
                }}
              >
                Asset Loan
              </Typography>
              <Button
                variant="contained"
                onClick={() => window.open('/Nexus Finance/Asset-Finance/Business-vehicle-loans', '_blank')}
                sx={{
                  background: cardGradient,
                  backgroundSize: '200% 100%',
                  color: '#fff',
                  borderRadius: '50px',
                  textTransform: 'none',
                  position: 'relative',
                  zIndex: 2,
                  transition: 'background-position 0.5s ease-in-out, transform 0.3s ease',
                  '&:hover': {
                    backgroundPosition: '100% 0',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Learn more
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
       {/* Meet our partners Section */}
      <Box sx={{ py: 8, backgroundColor: isDarkMode ? '#2a2a2a' : '#f9f9f9' }}>
        <Container>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem" },
              fontWeight: 700,
              mb: 6,
              textAlign: "center",
              background: cardGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Meet our partners
          </Typography>

          {/* Slider Section */}
          <style>{`
            @keyframes marquee-left {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            @keyframes marquee-right {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0%); }
            }
            .marquee-container {
              overflow: hidden;
              box-sizing: border-box;
            }
            .marquee-content.left-to-right {
              display: flex;
              animation: marquee-left 12s linear infinite;
            }
            .marquee-content.right-to-left {
              display: flex;
              animation: marquee-right 12s linear infinite;
            }
            .marquee-content:hover {
              animation-play-state: paused;
            }
            .logo-item {
              flex-shrink: 0;
              padding: 1rem;
            }
            @media (max-width: 1024px) {
              .logo-item {
                width: calc(100% / 4);
              }
            }
            @media (max-width: 768px) {
              .logo-item {
                width: calc(100% / 3);
              }
            }
            @media (max-width: 640px) {
              .logo-item {
                width: calc(100% / 2);
                @keyframes marquee-left {
                  0% { transform: translateX(0%); }
                  100% { transform: translateX(-100%); }
                }
                @keyframes marquee-right {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(0%); }
                }
              }
            }

            /* Black and white hover effect for slicker images */
            .logo-item img {
              transition: filter 0.3s ease-in-out;
            }

            .logo-item:hover img {
              filter: grayscale(100%);
            }
          `}</style>

          {/* Theme Supportive Logo Marquee Section */}
          <div className="py-12 transition-colors duration-300">
            <div className="container mx-auto px-4">
              {/* First Marquee: Moving from right to left */}
              <div className="marquee-container w-full mb-8">
                <div className="marquee-content left-to-right items-center">
                  {logos.map((logo, index) => (
                    <div key={index} className="logo-item flex items-center justify-center">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="max-h-16 w-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Second Marquee: Moving from left to right */}
              <div className="marquee-container w-full">
                <div className="marquee-content right-to-left items-center">
                  {logos1.map((logo, index) => (
                    <div key={index} className="logo-item flex items-center justify-center">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="max-h-16 w-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Box>

      {/* Why Choose Us Section */}
      <Box sx={{ py: 8, backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5' }}>
        <Container>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem" },
              fontWeight: 700,
              mb: 6,
              textAlign: "center",
              background: cardGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Why Choose Us
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
              gap: 4,
            }}
          >
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Box
                  sx={{
                    backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
                    borderRadius: 4,
                    p: 4,
                    textAlign: 'center',
                    boxShadow: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    <item.icon size={48} color="#3264c1" />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: isDarkMode ? '#ffffff' : '#000000',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: isDarkMode ? '#cccccc' : '#666666',
                      lineHeight: 1.6,
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Partner Process Timeline Section */}
      <Box sx={{ py: 8, backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5' }}>
        <Container maxWidth="xl">
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem" },
              fontWeight: 700,
              mb: 6,
              textAlign: "center",
              background: cardGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Our smooth partner process
          </Typography>

          {/* Timeline Section */}
          <div
            className={`w-full ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'} py-16 px-4 sm:px-6 lg:px-8 overflow-hidden ${isDarkMode ? 'text-white' : 'text-black'} transition-colors duration-300 relative`}
          >


            <div >
              {/* Decorative elements - 3D floating spheres */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      x: [
                        `${20 + i * 10}%`,
                        `${30 + i * 8}%`,
                        `${15 + i * 12}%`,
                        `${20 + i * 10}%`,
                      ],
                      y: [
                        `${10 + i * 12}%`,
                        `${20 + i * 10}%`,
                        `${30 + i * 8}%`,
                        `${10 + i * 12}%`,
                      ],
                      scale: [1, 1.2, 1.1, 1],
                    }}
                    transition={{
                      duration: 20 + i * 2,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatType: 'loop',
                    }}
                    style={{
                      width: `${50 + i * 20}px`,
                      height: `${50 + i * 20}px`,
                      filter: 'blur(8px)',
                      zIndex: 0,
                    }}
                  />
                ))}
              </div>

              {/* Main timeline content */}
              <motion.div
                className="relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative" ref={timelineContainerRef}>
                  {/* Central animated line */}
                  <motion.div
                    style={{ scaleY }}
                    className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-transparent via-emerald-500 to-transparent h-full transform -translate-x-1/2 origin-top" />
                  {/* Timeline events */}
                  {timelineEvents.map((event, index) => {
                    const isEven = index % 2 === 0;
                    const eventColor = `bg-${event.color}-500`;

                    return (
                      <motion.div
                        key={event.id}
                        data-timeline-event={event.id}
                        className={`relative mb-16 md:mb-24 ${isEven ? 'md:ml-auto' : 'md:mr-auto'} md:w-1/2 flex ${
                          isEven ? 'md:justify-start' : 'md:justify-end'
                        }`}
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: {
                            opacity: 0,
                            x: isEven ? 50 : -50,
                            y: 20,
                          },
                          visible: {
                            opacity: 1,
                            x: 0,
                            y: 0,
                            transition: {
                              duration: 0.8,
                              delay: index * 0.2,
                              ease: 'easeOut',
                            },
                          },
                        }}
                      >
                        {/* Timeline node */}
                        <div
                          className={`absolute left-1/2 md:left-auto ${
                            isEven ? 'md:left-0' : 'md:right-0'
                          } top-0 transform -translate-x-1/2 ${
                            isEven ? 'md:translate-x-0' : 'md:translate-x-0'
                          } z-20`}
                        >
                          <motion.div
                            className={`w-10 h-10 rounded-full ${eventColor} flex items-center justify-center border-4 ${isDarkMode ? 'border-slate-900' : 'border-slate-100'} cursor-pointer`}
                            animate={{
                              scale: activeEvent === event.id || scrollYProgress.get() >= (index + 0.5) / timelineEvents.length ? 1.2 : 1,
                              boxShadow:
                                 activeEvent === event.id || scrollYProgress.get() >= (index + 0.5) / timelineEvents.length
                                  ? [
                                      `0 0 0 rgba(255,255,255,0.5)`,
                                      `0 0 20px rgba(255,255,255,0.8)`,
                                      `0 0 0 rgba(255,255,255,0.5)`,
                                    ]
                                  : `0 0 0 rgba(255,255,255,0)`,
                            }}
                            transition={{
                              boxShadow: {
                                repeat: activeEvent === event.id || scrollYProgress.get() >= (index + 0.5) / timelineEvents.length ? Infinity : 0,
                                duration: 1.5,
                              },
                              scale: { duration: 0.3 },
                            }}
                            onClick={() => setActiveEvent(activeEvent === event.id ? null : event.id)}
                          >
                            {event.icon}
                          </motion.div>
                        </div>

                        {/* Content card */}
                        <motion.div
                          className={`relative z-10 bg-slate-800 bg-opacity-80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl w-full md:w-[calc(100%-2rem)] ${
                            isEven ? 'md:ml-12' : 'md:mr-12'
                          } ${
                            isDarkMode
                              ? 'bg-slate-800 bg-opacity-80 border-slate-700'
                              : 'bg-white bg-opacity-80 border-slate-200'
                          }`}
                          whileHover={{
                            y: -5,
                            x: isEven ? 5 : -5,
                            transition: { duration: 0.3 },
                          }}
                          style={{
                            transformStyle: 'preserve-3d',
                            transform: `perspective(1000px) rotateY(${
                              mousePosition.x * (isEven ? -3 : 3)
                            }deg) rotateX(${mousePosition.y * -3}deg)`,
                            }}                          onMouseEnter={() => setActiveEvent(event.id)}
                          onMouseLeave={() => setActiveEvent(null)}
                        >
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <span className={`text-sm font-mono ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} tracking-wider`}>
                                {event.date}
                              </span>

                              <motion.div
                                className={`w-3 h-3 rounded-full ${eventColor}`}
                                animate={{
                                  scale: [1, 1.5, 1],
                                  opacity: [0.7, 1, 0.7]
                                }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 2,
                                  repeatType: "reverse"
                                }}
                              />
                            </div>
                            <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{event.title}</h3>

                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{
                                height: activeEvent === event.id ? 'auto' : 0,
                                opacity: activeEvent === event.id ? 1 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <p className="text-slate-300 mt-3 leading-relaxed">
                                {event.description}
                              </p>
                            </motion.div>
                          </div>

                          <motion.div
                            className={`absolute bottom-0 left-0 h-1 ${eventColor}`}
                            initial={{ width: "0%" }}
                            animate={{ width: activeEvent === event.id ? "100%" : "0%" }}
                            transition={{ duration: 0.5 }}
                          />
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </Box>

      {/* Contact Form Section */}
      <Box id="call-us-form" sx={{ py: 8, backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5' }}>
  <Container>
    <Typography
      variant="h3"
      component="h3"
      sx={{
        fontSize: { xs: "2rem", sm: "2.5rem" },
        fontWeight: 700,
        mb: 6,
        textAlign: "center",
        background: cardGradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      Become a Partner Today
    </Typography>

    <Box
      component="form"
      sx={{
        maxWidth: 600,
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        p: 4,
        backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
        borderRadius: 4,
        boxShadow: 3,
      }}
      onSubmit={handleSubmit}
    >
      {/* Name Row */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          label="First Name"
          variant="outlined"
          required
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        />

        <TextField
          fullWidth
          label="Last Name"
          variant="outlined"
          required
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        />
      </Box>

      {/* Email */}
      <TextField
        fullWidth
        label="Email"
        type="email"
        required
        variant="outlined"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      {/* Contact */}
      <TextField
        fullWidth
        label="Contact Number"
        required
        variant="outlined"
        value={formData.contactNo}
        onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
      />

      {/* Profession */}
      <TextField
        fullWidth
        label="Profession"
        required
        variant="outlined"
        value={formData.profession}
        onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
      />

      {/* Description */}
      <TextField
        fullWidth
        label="Business Description"
        variant="outlined"
        required
        multiline
        rows={3}
        value={formData.businessDescription}
        onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
      />

      {/* Business Name */}
      <TextField
        fullWidth
        label="Business Name"
        required
        variant="outlined"
        value={formData.businessName}
        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
      />

      {/* ABN */}
      <TextField
        fullWidth
        label="Business ABN"
        required
        variant="outlined"
        value={formData.businessAbn}
        onChange={(e) => setFormData({ ...formData, businessAbn: e.target.value })}
      />

      {/* Street */}
      <TextField
        fullWidth
        label="Street Address"
        required
        variant="outlined"
        value={formData.streetAddress}
        onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
      />

      {/* City + State */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          label="City"
          required
          variant="outlined"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />

        <TextField
          fullWidth
          label="State"
          required
          variant="outlined"
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
        />
      </Box>

      {/* Post Code */}
      <TextField
        fullWidth
        label="Post Code"
        required
        variant="outlined"
        value={formData.postCode}
        onChange={(e) => setFormData({ ...formData, postCode: e.target.value })}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isSubmitting}
        sx={{
          background: cardGradient,
          color: 'white',
          px: 6,
          py: 2,
          fontSize: '1.2rem',
          fontWeight: 600,
          borderRadius: '50px',
          textTransform: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: cardGradient,
            transform: 'translateY(-2px)',
          },
        }}
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>

      {/* Message */}
      {submitMessage && (
        <Typography
          sx={{ mt: 2, textAlign: "center", color: submitMessage.includes("Error") ? "red" : "green" }}
        >
          {submitMessage}
        </Typography>
      )}
    </Box>
  </Container>
</Box>

      {/* Client Success Stories Section */}
      <>
        <style>{`
          @keyframes scroll-right {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
          .animate-scroll-right {
            animation: scroll-right 10s linear infinite;
          }
        `}</style>
      <section
        className={`py-20 ${
          isDarkMode
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
            : 'bg-gradient-to-br from-blue-50 via-white to-green-50'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-10 text-center">
                <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
  Client Success Stories              </span>
              </h2>
            <p
              className={`text-xl max-w-2xl mx-auto ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              See how we've helped n businesses secure the finance they
              need to grow and succeed. Click any card to read more reviews.
            </p>
          </div>

          <div className="relative max-w-7xl mx-auto overflow-hidden group">
            <div className="flex animate-scroll-right group-hover:[animation-play-state:paused]">
              {[...testimonials, ...testimonials].map((testimonial, index) => {
                const IconComponent = testimonial.icon;
                return (
                  <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4">
                    <div
                      onClick={handleReviewClick}
                      className={`h-full rounded-2xl p-6 border transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer group/card ${
                        isDarkMode
                          ? 'bg-gray-800 border-gray-700 hover:border-indigo-500'
                          : 'bg-white border-gray-200 hover:border-blue-500 hover:shadow-blue-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className={`p-3 rounded-full mr-3 ${
                            isDarkMode ? 'bg-indigo-900' : 'bg-blue-100'
                          }`}>
                            <IconComponent className={`w-6 h-6 ${
                              isDarkMode ? 'text-indigo-400' : 'text-blue-600'
                            }`} />
                          </div>
                          <div>
                            <h4
                              className={`font-bold text-lg ${
                                isDarkMode ? 'text-white' : 'text-gray-800'
                              }`}
                            >
                              {testimonial.name}
                            </h4>
                            <p
                              className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                        <ExternalLink className={`w-5 h-5 opacity-0 group-hover/card:opacity-100 transition-opacity ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                      </div>

                      <div className="flex items-center mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              isDarkMode ? 'text-yellow-400' : 'text-yellow-400'
                            } fill-current`}
                          />
                        ))}
                        <span className={`ml-2 text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {testimonial.businessType} • {testimonial.location}
                        </span>
                      </div>

                      <p
                        className={`leading-relaxed italic mb-4 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        "{testimonial.content}"
                      </p>

                      <div className="border-t pt-4">
                        <p
                          className={`text-xs ${
                            isDarkMode ? 'text-gray-500' : 'text-gray-500'
                          }`}
                        >
                          Click to read more reviews on Google
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-16">
            <div
              className={`rounded-2xl p-8 max-w-4xl mx-auto ${
                isDarkMode
                  ? 'bg-gradient-to-r from-blue-800 to-green-800 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-green-600 text-white'
              }`}
            >
              <h3 className="text-2xl font-bold mb-4">
                Ready to Join Our Success Stories?
              </h3>
              <p
                className={`mb-6 ${
                  isDarkMode ? 'text-indigo-200' : 'text-blue-100'
                }`}
              >
                Let's Connect with our satisfied clients who have chosen Nexus Finance for their business and asset finance needs.

              </p>
              <button
                onClick={handleReviewClick}
                className={`px-8 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                  isDarkMode
                    ? 'bg-white text-indigo-800 hover:bg-gray-200'
                    : 'bg-white text-blue-600 hover:bg-gray-100'
                }`}
              >
                View All Reviews
              </button>
            </div>
          </div>
        </div>
      </section>
      </>

    </>
  );
};

export default Patner;
