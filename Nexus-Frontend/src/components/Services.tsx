"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Shield,
  Users,
  Award,
  CheckCircle,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface ServicesProps {
  isDarkMode?: boolean;
}

const Services: React.FC<ServicesProps> = ({ isDarkMode: propIsDarkMode }) => {
  const { isDarkMode: contextIsDarkMode } = useTheme();
  const isDarkMode = propIsDarkMode !== undefined ? propIsDarkMode : contextIsDarkMode;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Data for the services section
  const services = [
    {
      icon: TrendingUp,
      title: "Business Loans",
      description:
        "SME funding, working capital, equipment finance, and commercial loans.",
      features: [
        "SME Funding",
        "Working Capital",
        "Equipment Finance",
        "Commercial Loans",
      ],
    },
    {
      icon: Shield,
      title: "Business Loan Against Property",
      description:
        "Tailored loans for commercial property purchase, refinance, or investment.",
      features: [
"Interest rates: from 7.99% p.a.",
"Maximum LVR: up to 80%",
"Pre-approval: in 24–48 hours",
"Settlement: in 10–15 business days"
      ],
    },
    {
      icon: Users,
      title: "Vehicle & Equipment Finance",
      description: "Car loans, fleet financing, machinery and asset finance.",
      features: [
        "Car Loans",
        "Fleet Financing",
        "Machinery Finance",
        "Asset Finance",
      ],
    },
    {
      icon: Award,
      title: "Construction Loans",
      description:
        "Funding for new home builds, renovations, and development projects.",
      features: [
        "New Home Builds",
        "Renovations",
        "Development Projects",
        "Progress Payments",
      ],
    },
  ];

  return (
    <section
      id="services"
      className={`py-24 relative overflow-hidden font-sans ${
        isDarkMode
          ? "bg-gray-950 text-gray-100"
          : "bg-gradient-to-br from-gray-50 via-blue-50 to-pink-50 text-gray-800"
      }`}
    >
      {/* Background Animation - Refined */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className={`absolute top-10 left-1/4 w-72 h-72 rounded-full blur-3xl animate-float-slow ${
            isDarkMode ? "bg-blue-800/10" : "bg-blue-200/20"
          }`}
        />
        <div
          className={`absolute bottom-10 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse-delayed-2s ${
            isDarkMode ? "bg-emerald-800/10" : "bg-emerald-200/20"
          }`}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Custom CSS for animations and shadows */}
        <style>{`
          .shadow-finance-lg {
            box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
          .shadow-glow {
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(16, 185, 129, 0.3);
          }
          .text-glow {
            text-shadow: 0 0 8px rgba(59, 130, 246, 0.7), 0 0 12px rgba(16, 185, 129, 0.5);
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 10px rgba(8, 145, 178, 0.5), 0 0 20px rgba(6, 182, 212, 0.3); }
            50% { box-shadow: 0 0 15px rgba(8, 145, 178, 0.7), 0 0 30px rgba(6, 182, 212, 0.5); }
          }
          .animate-glow {
            animation: glow 2s ease-in-out infinite;
          }
        `}</style>

        {/* Services Section */}
        <div className="animate-slide-in-left">
          <h6 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 md:mb-10 text-center font-sans">
            <span className="">Our Core Services</span>
          </h6>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border backdrop-blur-sm transition-all duration-500 relative overflow-hidden transform cursor-pointer ${
                  isDarkMode
                    ? "bg-gray-800/50 border-gray-700"
                    : "bg-white/90 border-gray-200"
                } ${hoveredIndex === index ? 'scale-105 shadow-finance-lg' : ''}`}
              >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-nexus-gradient rounded-full flex items-center justify-center shadow-glow mb-4 sm:mb-6 animate-glow">
                    <service.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </div>
                <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 transition-colors duration-300">
                  {service.title}
                </h4>
                <p className={`text-lg leading-relaxed mb-4 sm:mb-6 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                  {service.description}
                </p>
                <ul className={`space-y-1 sm:space-y-2 transition-all duration-500 overflow-hidden ${hoveredIndex === index ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'}`}>
                  {service.features.map((feature, i) => (
                    <li
                      key={i}
                      className={`flex items-center text-xs sm:text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
