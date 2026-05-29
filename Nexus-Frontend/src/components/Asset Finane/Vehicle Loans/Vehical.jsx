import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Car, 
  Construction, 
  Heart, 
  Laptop, 
  Tractor,
  Shield,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Users,
  Award,
  Zap,
  Target,
  CreditCard
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import heroImage from '../../../asset/bgimgs/car.webp';
import FaqSection from "./FaqPage";

const Vehicle = () => {
  const { isDarkMode } = useTheme();
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const vehicleTypes = [
    { icon: Car, name: 'Cars & Utes', color: 'from-[#3264c1] to-[#24dd93]' },
    { icon: Truck, name: 'Trucks & Fleets', color: 'from-[#24dd93] to-[#076a49]' },
    { icon: Truck, name: 'Vans & Commercial', color: 'from-[#3264c1] to-[#076a49]' },
    { icon: Construction, name: 'Construction Equipment', color: 'from-[#24dd93] to-[#3264c1]' },
    { icon: Heart, name: 'Medical Equipment', color: 'from-[#3264c1] to-[#24dd93]' },
    { icon: Laptop, name: 'IT & Office Tech', color: 'from-[#076a49] to-[#24dd93]' },
    { icon: Tractor, name: 'Agriculture Machinery', color: 'from-[#3264c1] to-[#076a49]' }
  ];

  const features = [
    { icon: Clock, title: 'Fast Approvals', desc: 'Get approved within 24-48 hours' },
    { icon: DollarSign, title: 'Competitive Rates', desc: 'Access to 50+ lenders for best rates' },
    { icon: Shield, title: 'Low-Doc Options', desc: 'Perfect for self-employed & startups' },
    { icon: CheckCircle, title: 'No Hidden Fees', desc: 'Transparent pricing, no surprises' }
  ];

  const stats = [
    { number: '$15M+', label: 'Financed', icon: TrendingUp },
    { number: '350+', label: 'Businesses Helped', icon: Users },
    { number: '50+', label: 'Lenders Access', icon: Award },
    { number: '24hrs', label: 'Fast Approval', icon: Clock }
  ];

  const processSteps = [
    { icon: Target, title: 'Apply Online', desc: 'Takes less than 60 seconds', step: 1 },
    { icon: Zap, title: 'Get Matched', desc: 'We compare 50+ lenders', step: 2 },
    { icon: CreditCard, title: 'Approval & Funding', desc: 'Fast decisions, simple repayments', step: 3 }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-[62vh] sm:h-[70vh] md:h-[85vh] lg:h-screen flex items-center justify-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
            filter: 'brightness(0.4)'
          }}
        />
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-xl">
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-nexus-gradient"
            >
              Trusted Business Vehicle Finance
            </h1>
            <p 
              className="text-lg sm:text-xl md:text-2xl text-white"
            >
              t Approvals • Low-Doc Options • Competitive Rates
            </p>
            <button
              onClick={() => window.open('/?openInquiry=car', '_blank')}
              className="mt-6 bg-nexus-gradient text-white px-8 py-3 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg relative overflow-hidden group inline-flex items-center justify-center border-none cursor-pointer"
            >
              <span className="relative z-10">Get Started Today</span>
              <div className="absolute inset-0 bg-nexus-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <motion.div 
          className="max-w-7xl mx-auto px-4"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={`text-center p-6 rounded-2xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white shadow-lg'} hover:shadow-2xl transition-all duration-300`}
                whileHover={{ y: -10 }}
              >
                <div className={`w-12 h-12 mx-auto mb-4 bg-nexus-gradient rounded-full flex items-center justify-center text-white`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stat.number}</div>
                <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Vehicle Types Section */}
      <section className="py-20">
        <motion.div 
          className="max-w-7xl mx-auto px-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 
            className={`text-4xl font-bold text-center mb-12 font-[800] bg-nexus-gradient bg-clip-text text-transparent`}
            variants={fadeInUp}
          >
            What Can We Finance?
          </motion.h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {vehicleTypes.map((vehicle, index) => (
              <motion.div
                key={index}
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-32 h-32 mx-auto rounded-full bg-nexus-gradient p-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <vehicle.icon className="w-16 h-16 text-white" />
                </div>
                <p className={`text-center mt-4 font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{vehicle.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <motion.div 
          className="max-w-7xl mx-auto px-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2 
            className={`text-4xl font-bold text-center mb-12 font-[800] bg-nexus-gradient bg-clip-text text-transparent`}
            variants={fadeInUp}
          >
            Why Choose Nexus Finance?
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-2xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white shadow-lg'} hover:shadow-2xl transition-all duration-300`}
                whileHover={{ y: -10 }}
              >
                <div className="w-16 h-16 bg-nexus-gradient rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <motion.div 
          className="max-w-7xl mx-auto px-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2 
            className={`text-4xl font-bold text-center mb-12 font-[800] bg-nexus-gradient bg-clip-text text-transparent`}
            variants={fadeInUp}
          >
            How It Works
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className={`relative ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className={`p-8 rounded-2xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white shadow-lg'} text-center`}>
                  <div className="w-20 h-20 bg-nexus-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white font-bold text-2xl">{step.step}</span>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{step.title}</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <FaqSection/>
    </div>
  );
};

export default Vehicle;
