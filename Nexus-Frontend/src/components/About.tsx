"use client";

import React, { useState, useEffect, useRef } from "react";
import about from '../asset/About/about.avif';
import aboutImage1 from '../asset/About/image.webp';
import aboutImage2 from '../asset/About/wp.webp';



interface AboutProps {
  isDarkMode: boolean;
}

const About: React.FC<AboutProps> = ({ isDarkMode }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);



  // Image URLs for the expert and welcome sections
  const welcomeImages = [about, aboutImage1, aboutImage2];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverStartTime, setHoverStartTime] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % welcomeImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? welcomeImages.length - 1 : prevIndex - 1
    );
  };

  const startInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      if (!isHovering) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % welcomeImages.length);
      }
    }, 3000);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [welcomeImages.length, isHovering]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    setHoverStartTime(Date.now());
    
    // Clear any existing hover timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Set new timeout for 10 seconds
    hoverTimeoutRef.current = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % welcomeImages.length);
    }, 10000);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoverStartTime(null);
    
    // Clear the hover timeout when mouse leaves
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };


  return (
    <>
      {/* Custom CSS for animations and gradients */}
      <style>{`
        @keyframes float {
          0% { transform: translate(0, 0); }
          50% { transform: translate(20px, 30px); }
          100% { transform: translate(0, 0); }
        }

        @keyframes pulse-delayed {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px rgba(8, 145, 178, 0.5), 0 0 20px rgba(6, 182, 212, 0.3); }
          50% { box-shadow: 0 0 15px rgba(8, 145, 178, 0.7), 0 0 30px rgba(6, 182, 212, 0.5); }
        }
        
        .finance-gradient {
          background-image: linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to));
          --tw-gradient-from: #3b82f6; /* blue-500 */
          --tw-gradient-to: #10b981; /* emerald-500 */
        }
        
        .shadow-finance-lg {
          box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .shadow-glow {
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(16, 185, 129, 0.3);
        }
        .text-glow {
          text-shadow: 0 0 8px rgba(59, 130, 246, 0.7), 0 0 12px rgba(16, 185, 129, 0.5);
        }

        /* Responsive animations with Tailwind */
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }
        .animate-bounce-in {
          animation: bounceIn 1s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounceIn {
          0%, 20%, 50%, 80%, 100% {
            transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
          }
          0% { opacity: 0; transform: scale3d(0.3, 0.3, 0.3); }
          20% { transform: scale3d(1.1, 1.1, 1.1); }
          40% { transform: scale3d(0.9, 0.9, 0.9); }
          60% { opacity: 1; transform: scale3d(1.03, 1.03, 1.03); }
          80% { transform: scale3d(0.97, 0.97, 0.97); }
          100% { opacity: 1; transform: scale3d(1, 1, 1); }
        }
      `}</style>

      <section
        id="about"
      className={`py-24 relative overflow-hidden font-  sans ${
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

        <div className="container mx-auto px-6 relative z-10 space-y-24">
          {/* Main Header */}
          <div className="text-center animate-fade-in-up">
            {/* <div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 shadow-finance-lg hover:scale-110 transition-transform duration-300 ${
                isDarkMode ? "bg-blue-800/40" : "bg-blue-100"
              }`}
            >
              <Shield
                className={`w-10 h-10 ${
                  isDarkMode ? "text-blue-300" : "text-blue-600"
                }`}
              />
            </div> */}
            <h5 className="text-4xl sm:text-5xl font-bold mb-4 font-sans">
             <span className="">
             About Nexus Finance
            </span>
            </h5>
            {/* <p className="text-lg max-w-4xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300 font-sans">
            We are an n-based finance advisory and trusted business loan broker in , helping individuals, families, and businesses with expert guidance, tailored loans, and clear financial direction.
            </p> */}
          </div>

          {/* Welcome Section - Combined from the second component */}
          <div className="animate-fade-in-up">
            <div
              className={`p-4 sm:p-6 md:p-8 lg:p-12 rounded-3xl border backdrop-blur-sm shadow-2xl max-w-6xl h-auto min-h-[500px] sm:min-h-[550px] md:min-h-[600px] mx-auto flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 lg:gap-12 ${
                isDarkMode
                  ? "bg-gray-800/50 border-gray-700"
                  : "bg-white/90 border-gray-200"
              }`}
            >
              {/* Welcome Image */}
              <div className="relative group flex-shrink-0 w-full md:w-1/2 h-[250px] sm:h-[300px] md:h-[350px] lg:h-[450px]">
                <div className="relative rounded-2xl overflow-hidden shadow-finance-lg h-full hover:scale-105 transition-all duration-500 group-hover:shadow-glow">
                  <img
                    src={welcomeImages[currentImageIndex]}
                    alt="Welcome to Nexus Finance"
                    className="w-full h-full object-cover object-center transition-opacity duration-1000"
                    onError={(e) => {
                      (e.target as HTMLImageElement).onerror = null;
                    }}
                  />
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className={`absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 ${
                      isDarkMode
                        ? 'bg-gray-800/80 text-white hover:bg-gray-700'
                        : 'bg-white/80 text-gray-800 hover:bg-white'
                    } shadow-lg backdrop-blur-sm`}
                    aria-label="Previous image"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 ${
                      isDarkMode
                        ? 'bg-gray-800/80 text-white hover:bg-gray-700'
                        : 'bg-white/80 text-gray-800 hover:bg-white'
                    } shadow-lg backdrop-blur-sm`}
                    aria-label="Next image"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Dot Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {welcomeImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'bg-white w-6'
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Welcome Content */}
              <div className="flex-grow text-center md:text-left md:w-1/2">
                <h4 className="text-2xl sm:text-3xl font-bold leading-tight mb-4 ">
                Welcome to Nexus Finance – Trusted Low Doc Business Loan Experts in  
                </h4>
                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                Nexus Finance is a trusted Business Loan Broker in , helping individuals, business owners, and professionals secure the right finance solutions.{" "}
                  <span className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                  We offer low doc business loans and unsecured business loan  options, tailored to your needs.   
                  </span>{" "}
                  With fast approvals, minimal paperwork, and a client-first approach,{" "}
                  <span className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                  we make finance simple, transparent, and effective.
                  </span>{" "}
                  Our team guides you from consultation to approval, ensuring confident financial decisions that support long-term success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
