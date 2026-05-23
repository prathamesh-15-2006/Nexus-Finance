import React from "react";
import { Globe, Users, CheckCircle } from "lucide-react";
import heroImage from "./../asset/Banner.png";
import awardImg from "../asset/logo/Nexus-logo.png";
import LoanSelection from "./LoanSelection";
import { useTheme } from "../contexts/ThemeContext";

interface HeroProps {
  isDarkMode?: boolean;
  headingLine1?: string;
  headingLine2?: string;
}

const marqueeItems = [
  "Minimum 6 months trading",
  "Loans from $20,000",
  "Sole traders & companies welcome",
  "n ABN required",
  "No hidden fees",
  "Flexible payments",
  "Same day cash transfer",
  "Your details are 100% secure",
];

const Hero: React.FC<HeroProps> = ({
  isDarkMode: propDarkMode,
  headingLine1 = "Trusted Business Loan",
  headingLine2 = "Broker in ",
}) => {
  const { isDarkMode: contextDarkMode } = useTheme();
  const isDarkMode = propDarkMode !== undefined ? propDarkMode : contextDarkMode;

  return (
    <section
      id="home"
      className={`relative w-full overflow-hidden 
      pt-20 sm:pt-24 md:pt-28 lg:pt-13
      ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-pink-50"
      }`}
    >
      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start pb-8">

          {/* LEFT SIDE */}
          <div className="space-y-8 text-center lg:text-left">

            <h1 className="font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              {headingLine1 && (
                <span className="block whitespace-nowrap">
                  {headingLine1}
                </span>
              )}
              {headingLine2 && (
                <span className="block whitespace-nowrap ml-6">
                  {headingLine2}
                </span>
              )}
            </h1>

            <div className="max-w-xl mx-auto lg:mx-0">
              <LoanSelection isDarkMode={isDarkMode} />
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-center lg:justify-end">

            <div className="mt-[110px] sm:mt-[120px] md:mt-[130px] lg:mt-[140px] relative">
              
              {/* IMAGE */}
              <img
                src={heroImage}
                alt="Nexus Finance Hero"
                className="
                  w-full
                  h-[520px]
                  sm:h-[500px]
                  md:h-[500px]
                  lg:h-[500px]
                  xl:h-[500px]
                  2xl:h-[500px]
                  max-w-none
                  object-cover
                  transition-all
                  duration-500
                  hover:scale-105
                "
                style={{
                  borderTopRightRadius: "200px",
                  borderBottomLeftRadius: "200px",
                }}
              />

              {/* ================= UPDATED POSITION + HOVER ================= */}
              <div className="absolute top-1/2 left-6 translate-y-[-20%] text-left animate-fadeInUp">

                <div className="bg-white/80 backdrop-blur-md px-5 py-3 rounded-xl shadow-lg font-semibold text-black transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
                  Quick Loan Process
                </div>

                <div className="bg-white/80 backdrop-blur-md px-5 py-3 rounded-xl shadow-lg font-semibold text-black mt-4 ml-[10px] transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
                  Small Business Loan
                </div>

                <div className="bg-white/80 backdrop-blur-md px-5 py-3 rounded-xl shadow-lg font-semibold text-black mt-4 ml-[20px] transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
                  Very Low Rates
                </div>

                <div className="bg-white/80 backdrop-blur-md px-5 py-3 rounded-xl shadow-lg font-semibold text-black mt-4 ml-[30px] transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
                  Easy Bridging Loans
                </div>

              </div>
              {/* ============================================================ */}

            </div>

          </div>

        </div>
      </div>

      {/* ================= MARQUEE ================= */}
      <div
        className={`w-full border-y ${
          isDarkMode ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"
        }`}
      >
        <div className="flex items-center">

          <div className="overflow-hidden flex-1">
            <div className="flex animate-marquee whitespace-nowrap items-center">
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <div key={index} className="flex items-center px-4 py-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-sm sm:text-base font-semibold">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 px-6 py-3">
            <img
              src={awardImg}
              alt="Awards Finalist"
              className="h-12 sm:h-14 md:h-16 object-contain"
            />

          
          </div>

        </div>
      </div>

      <style>{`
        .animate-marquee {
          animation: marquee 26s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease forwards;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;