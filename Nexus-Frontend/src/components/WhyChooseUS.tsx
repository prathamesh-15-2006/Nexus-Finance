import React from "react";

import {
  Target,
  Heart,
  TrendingUp,
  Shield,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface WhyChooseUSProps {
  isDarkMode?: boolean;
}

const WhyChooseUS: React.FC<WhyChooseUSProps> = ({ isDarkMode: propIsDarkMode }) => {
  const { isDarkMode: contextIsDarkMode } = useTheme();
  const isDarkMode = propIsDarkMode !== undefined ? propIsDarkMode : contextIsDarkMode;
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

  // Logo section removed - core-slicker images have been deleted
  const logos: any[] = [];
  const logos1: any[] = [];

  return (
    <>
      {/* slider - Theme Supportive */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
        .marquee-container {
          overflow: hidden;
          box-sizing: border-box;
        }
        .marquee-content.left-to-right {
          display: flex;
          animation: marquee-left 20s linear infinite;
          width: fit-content;
        }
        .marquee-content.right-to-left {
          display: flex;
          animation: marquee-right 20s linear infinite;
          width: fit-content;
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
          }
          @keyframes marquee-left {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(0%); }
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
      <div className={`${isDarkMode ? 'bg-slate-900/60 border-y border-slate-800' : 'bg-slate-50 border-y border-slate-100'} py-12 transition-colors duration-500`}>
        <div className="container mx-auto px-4">
          {/* First Marquee: Moving from right to left */}
          <div className="marquee-container w-full mb-8">
            <div className="marquee-content left-to-right items-center">
              {[...logos, ...logos1].map((logo, index) => (
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
          {/* <div className="marquee-container w-full">
            <div className="marquee-content right-to-left items-center">
              {[...logos1, ...logos1].map((logo, index) => (
                <div key={index} className="logo-item flex items-center justify-center">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="animate-fade-in-up">
        <h6 className="text-4xl sm:text-5xl font-bold mb-10 text-center font-sans mt-16">
          <span className="bg-nexus-gradient bg-clip-text text-transparent">
            Why Choose Nexus Finance
          </span>
        </h6>
        <div className="grid md:grid-cols-2 gap-8">
          {whyChooseUs.map((item, index) => (
            <div
              key={index}
              className={`p-8 rounded-3xl border backdrop-blur-sm transition-all duration-500 group transform hover:scale-105 ${
                isDarkMode
                  ? "bg-gray-800/50 border-gray-700"
                  : "bg-white/90 border-gray-200"
              }`}
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-nexus-gradient flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-500">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className={`text-lg font-bold mb-2 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {item.title}
                  </h4>
                  <p className={`text-lg leading-relaxed transition-colors duration-500 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WhyChooseUS;
