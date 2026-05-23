import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  TrendingUp, 
  Zap, 
  Shield, 
  Clock, 
  Users, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp,
  DollarSign,
  Target,
  Rocket,
  Briefcase,
  Lightbulb,
  Award,
  Heart,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  BarChart3,
  CreditCard,
  ShoppingCart,
  Truck,
  Building2,
  Globe,
  Wifi,
  Settings,
  Database,
  Cloud,
  Monitor,
  Printer,
  Coffee,
  BookOpen,
  GraduationCap,
  Trophy,
  Gift,
  PartyPopper,
  Sparkles,
  Sun,
  Moon,
  CloudRain,
  Wind,
  Zap as Lightning
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import FaqSection from './Faq';
import bg from './../../../asset/bgimgs/startup.avif';
const Startup = () => {
  const { isDarkMode } = useTheme();

  const [activeCard, setActiveCard] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('animate');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Updated with new color theme
  const loanOptions = [
    {
      type: "Unsecured Startup Loans",
      amount: "$5K - $500K",
      duration: "6+ months trading",
      features: ["No asset security required", "Approval in 24 hours", "Flexible repayment terms", "No upfront fees"],
      color: "from-[#3264c1] to-[#24dd93]",
      icon: <Zap className="w-8 h-8" />,
      gradient: "bg-gradient-to-br from-[#3264c1] via-[#24dd93] to-[#076a49]"
    },
    {
      type: "Secured Startup Loans",
      amount: "$5K - $500K",
      duration: "Pre-revenue accepted",
      features: ["Property equity as security", "Lower interest rates", "Higher loan amounts", "Longer terms available"],
      color: "from-[#24dd93] to-[#076a49]",
      icon: <Shield className="w-8 h-8" />,
      gradient: "bg-gradient-to-br from-[#24dd93] via-[#076a49] to-[#3264c1]"
    }
  ];

  // Updated with new color theme
  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24 Hour Approval",
      description: "Get approved within 24 hours, funds available same day",
      color: "from-[#24dd93] to-[#076a49]"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "From 7.75% p.a.",
      description: "Competitive rates tailored for startup businesses",
      color: "from-[#3264c1] to-[#24dd93]"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "50+ Lenders",
      description: "Access to 's largest lender network",
      color: "from-[#076a49] to-[#3264c1]"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "No Upfront Fees",
      description: "Transparent pricing with no hidden costs or surprises",
      color: "from-[#24dd93] to-[#3264c1]"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Expert Support",
      description: "Dedicated lending specialists for personalized service",
      color: "from-[#3264c1] to-[#076a49]"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "-Wide",
      description: "Serving startups across all states and territories",
      color: "from-[#076a49] to-[#24dd93]"
    }
  ];

  // Updated with new color theme
  const useCases = [
    {
      title: "Equipment & Setup Costs",
      icon: <Truck className="w-8 h-8" />,
      description: "Purchase essential equipment and setup infrastructure",
      color: "from-[#3264c1] to-[#24dd93]"
    },
    {
      title: "Inventory & Stock",
      icon: <ShoppingCart className="w-8 h-8" />,
      description: "Stock up on inventory to meet customer demand",
      color: "from-[#3264c1] to-[#24dd93]"
    },
    {
      title: "Marketing & Branding",
      icon: <Target className="w-8 h-8" />,
      description: "Launch marketing campaigns and build brand awareness",
      color: "from-[#3264c1] to-[#24dd93]"
    },
    {
      title: "Staff Hiring",
      icon: <Users className="w-8 h-8" />,
      description: "Hire key team members to scale operations",
      color: "from-[#3264c1] to-[#24dd93]"
    },
    {
      title: "Cash Flow Bridge",
      icon: <CreditCard className="w-8 h-8" />,
      description: "Manage cash flow gaps during growth periods",
      color: "from-[#3264c1] to-[#24dd93]"
    },
    {
      title: "Business Scaling",
      icon: <Rocket className="w-8 h-8" />,
      description: "Expand operations and enter new markets",
      color: "from-[#3264c1] to-[#24dd93]"
    }
  ];

  // Updated with new color theme
  const testimonials = [
    {
      name: "Perth Tech Startup",
      role: "Software Development",
      amount: "$120K Secured Loan",
      story: "Used funds to hire developers and launch product ahead of schedule. Achieved 300% growth in first year.",
      image: "bg-gradient-to-br from-[#3264c1] to-[#24dd93]",
      icon: <Monitor className="w-6 h-6" />
    },
    {
      name: "Melbourne Beauty Salon",
      role: "Retail & Services",
      amount: "$40K Unsecured Loan",
      story: "Lease fit-out and digital advertising campaign success. Opened 3 new locations within 18 months.",
      image: "bg-gradient-to-br from-[#24dd93] to-[#076a49]",
      icon: <Heart className="w-6 h-6" />
    },
    {
      name: "Sydney E-commerce",
      role: "Online Retail",
      amount: "$85K Working Capital",
      story: "Inventory purchase and marketing scaling. Revenue grew from $50K to $500K monthly in 12 months.",
      image: "bg-gradient-to-br from-[#076a49] via-[#3264c1] to-[#24dd93]",
      icon: <Globe className="w-6 h-6" />
    }
  ];

  const stats = [
    { value: "$50M+", label: "Funded", icon: <DollarSign className="w-8 h-8" />, color: "from-[#3264c1] to-[#24dd93]" },
    { value: "500+", label: "Startups Helped", icon: <Rocket className="w-8 h-8" />, color: "from-[#24dd93] to-[#076a49]" },
    { value: "4.9/5", label: "Customer Rating", icon: <Star className="w-8 h-8" />, color: "from-[#076a49] to-[#3264c1]" },
    { value: "24hrs", label: "Average Approval", icon: <Clock className="w-8 h-8" />, color: "from-[#3264c1] to-[#24dd93]" }
  ];

  return (
    <>
      <div className={`min-h-screen font-sans ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        
        {/* Hero Section with Background Image */}
        <section className="relative h-[62vh] sm:h-[70vh] md:h-[85vh] lg:h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${bg})`,
              filter: 'brightness(0.4)'
            }}
          />
          
          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-xl">
              <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-nexus-gradient"
              >
                Startup Business Loans
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-xl md:text-2xl mb-4 text-white"
              >
                Fast, Flexible Startup Finance -Wide
              </motion.p>
            </div>
          </div>

        </section>

        {/* Stats Section */}
        <section className="py-12 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-4 rounded-xl backdrop-blur-sm"
                style={{ backgroundColor: isDarkMode ? 'rgba(31,41,55,0.5)' : 'rgba(255,255,255,0.1)' }}
              >
                <div className={`w-12 h-12 mx-auto mb-2 bg-nexus-gradient rounded-full flex items-center justify-center text-white`}>
                  {stat.icon}
                </div>
                <div className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Loan Options Section */}
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-nexus-gradient mb-4`}>Choose Your Path</h2>
            <p className={`text-lg sm:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Tailored startup financing options for every stage</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {loanOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                <div className={`bg-nexus-gradient p-1 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300`}>
                  <div className={`rounded-2xl p-6 sm:p-8 h-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className={`w-16 h-16 mx-auto mb-4 bg-nexus-gradient rounded-full flex items-center justify-center text-white`}>
                      {option.icon}
                    </div>
                    <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-4`}>{option.type}</h3>
                    <p className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-2`}>{option.amount}</p>
                    <p className={`text-gray-600 dark:text-gray-300 mb-6`}>{option.duration}</p>
                    <ul className="space-y-3">
                      {option.features.map((feature, idx) => (
                        <li key={idx} className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className={`py-16 px-4 max-w-7xl mx-auto ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-nexus-gradient mb-4 font-sans`}>Why Choose Nexus Finance</h2>
            <p className={`text-lg sm:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Your trusted partner for startup success</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`text-center group rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-nexus-gradient rounded-full flex items-center justify-center text-white`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-2`}>{feature.title}</h3>
                <p className={`text-gray-600 dark:text-gray-300 text-sm`}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-nexus-gradient mb-4`}>Perfect For</h2>
            <p className={`text-lg sm:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every startup milestone and challenge</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className={`w-12 h-12 mb-4 bg-nexus-gradient rounded-lg flex items-center justify-center text-white`}>
                  {useCase.icon}
                </div>
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-2`}>{useCase.title}</h3>
                <p className={`text-gray-600 dark:text-gray-300 text-sm`}>{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section className={`py-16 px-4 max-w-7xl mx-auto ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-nexus-gradient mb-4">Success Stories</h2>
            <p className={`text-xl ${isDarkMode ? 'text-blue-100' : 'text-gray-600'}`}>Real results from real startups</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`rounded-2xl p-6 shadow-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className={`bg-nexus-gradient w-16 h-16 rounded-full mb-4 flex items-center justify-center text-white`}>
                  {story.icon}
                </div>
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-2`}>{story.name}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>{story.role}</p>
                <p className={`text-lg font-semibold text-[#3264c1] dark:text-[#24dd93] mb-4`}>{story.amount}</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{story.story}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <FaqSection />
      </div>
    </>
  );
};


export default Startup;
