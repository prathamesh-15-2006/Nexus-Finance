"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FileText,
  Search,
  CheckCircle,
  Wallet,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface ProcessProps {
  isDarkMode?: boolean;
}

const Process: React.FC<ProcessProps> = ({ isDarkMode: propIsDarkMode }) => {
  const { isDarkMode: contextIsDarkMode } = useTheme();
  const isDarkMode = propIsDarkMode !== undefined ? propIsDarkMode : contextIsDarkMode;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  const steps = [
    {
      step: "01",
      title: "Application Submit",
      desc: "Complete a simple online application with minimal paperwork.",
      icon: FileText,
    },
    {
      step: "02",
      title: "Review & Verification",
      desc: "We verify documents and structure the best loan solution.",
      icon: Search,
    },
    {
      step: "03",
      title: "Loan Approval",
      desc: "Quick pre-approval from our lender network.",
      icon: CheckCircle,
    },
    {
      step: "04",
      title: "Loan Disbursement",
      desc: "Funds are released smoothly and stress-free.",
      icon: Wallet,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 🔥 Sync card activation with line animation
  useEffect(() => {
    if (visible) {
      steps.forEach((_, index) => {
        setTimeout(() => {
          setActiveStep(index);
        }, index * 800);
      });
    }
  }, [visible]);

  return (
    <>
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        .timeline-line {
          background: linear-gradient(
            90deg,
            #ec4899,
            #f472b6,
            #ec4899
          );
          background-size: 200% 100%;
          animation: gradientMove 3s linear infinite;
        }

        .fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s ease;
        }

        .fade-up.show {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <section
        ref={sectionRef}
        id="process"
        className={`py-28 overflow-hidden ${
          isDarkMode
            ? "bg-gray-950 text-gray-100"
            : "bg-gradient-to-br from-gray-50 via-pink-50 to-blue-50 text-gray-800"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Our Working Process
            </h2>
          </div>

          {/* Desktop Timeline */}
          <div className="relative hidden lg:flex justify-between items-start">

            {/* Animated Line (UNCHANGED) */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[90%]">
              <div
                className={`h-1 rounded-full transition-all duration-[3200ms] ${
                  visible ? "w-full timeline-line" : "w-0"
                }`}
              ></div>
            </div>

            {steps.map((item, index) => {
              const Icon = item.icon;
              const isActive = index <= activeStep;

              return (
                <div
                  key={index}
                  className={`relative w-1/4 px-4 text-center fade-up ${
                    visible ? "show" : ""
                  }`}
                  style={{ transitionDelay: `${index * 300}ms` }}
                >
                  {/* Step Number Circle (hover effect preserved) */}
                  <div
                    className={`w-16 h-16 rounded-full 
                    flex items-center justify-center 
                    text-white font-bold shadow-lg mx-auto mb-6
                    transition-all duration-500 
                    group-hover:rotate-12 group-hover:scale-110
                    ${
                      isActive
                        ? "bg-nexus-gradient"
                        : isDarkMode
                          ? "bg-slate-800 text-gray-500"
                          : "bg-gray-400"
                    }`}
                  >
                    {item.step}
                  </div>

                  {/* Card (hover preserved) */}
                  <div
                    className={`p-8 rounded-3xl border 
                    transition-all duration-500 
                    hover:-translate-y-3 hover:shadow-2xl
                    ${
                      isActive
                        ? isDarkMode
                          ? "bg-gray-800 border-gray-700 opacity-100 text-white"
                          : "bg-white border-gray-200 opacity-100 text-gray-800"
                        : isDarkMode
                          ? "bg-slate-900/40 border-slate-800/60 opacity-50 text-gray-500"
                          : "bg-gray-200 border-gray-300 opacity-60 text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-16 h-16 mx-auto mb-6 rounded-xl 
                      flex items-center justify-center 
                      transition-all duration-500
                      ${
                        isActive
                          ? isDarkMode
                            ? "bg-gray-700 text-white"
                            : "bg-gray-100 text-gray-800"
                          : isDarkMode
                            ? "bg-slate-800/60 text-gray-600"
                            : "bg-gray-300 text-gray-500"
                      }`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>

                    <h3 className={`text-lg font-bold mb-3 ${isActive ? (isDarkMode ? "text-white" : "text-gray-900") : "text-gray-400"}`}>
                      {item.title}
                    </h3>

                    <p className={`text-sm leading-relaxed ${isActive ? (isDarkMode ? "text-gray-300" : "text-gray-600") : "text-gray-500"}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Version (UNCHANGED) */}
          <div className="lg:hidden flex flex-col gap-10">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`fade-up ${visible ? "show" : ""}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="w-14 h-14 mb-4 rounded-full pink-glow text-white flex items-center justify-center font-bold">
                    {item.step}
                  </div>

                  <div
                    className={`p-6 rounded-2xl border ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <Icon />
                      <h3 className="font-bold">{item.title}</h3>
                    </div>
                    <p className="text-sm opacity-70">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Process;