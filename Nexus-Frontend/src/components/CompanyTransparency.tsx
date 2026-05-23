"use client";

import React, { useState } from "react";
import { Phone, Check } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const CompanyTransparency = ({ isDarkMode: propIsDarkMode }: { isDarkMode?: boolean }) => {
  const { isDarkMode: contextIsDarkMode } = useTheme();
  const isDarkMode = propIsDarkMode !== undefined ? propIsDarkMode : contextIsDarkMode;
  const [activeTab, setActiveTab] = useState("Innovative");

  const tabContent: any = {
    Innovative: {
      description:
        "At Nexus Finance, innovation drives everything we do. We leverage smart technology, fast credit assessment systems, and data-driven insights to provide instant funding decisions tailored for n businesses.",
      points: [
        "Instant funding decisions",
        "Minimal paperwork process",
        "Smart credit assessment tools",
        "Fast-track loan approvals",
      ],
    },
    Talent: {
      description:
        "Led by Prathamesh and backed by over 2+ years of experience, our finance specialists provide strategic advisory and customised lending solutions across multiple industries.",
      points: [
        "2+ years industry expertise",
        "Dedicated finance specialists",
        "Relationship-driven advisory",
        "Industry-focused solutions",
      ],
    },
    Enabling: {
      description:
        "We empower SMEs across  with flexible and scalable finance solutions that align with business growth strategies and cash flow management needs.",
      points: [
        "Flexible repayment structures",
        "Business expansion funding",
        "Working capital support",
        "Asset & equipment finance",
      ],
    },
    "Commercially Responsible": {
      description:
        "Transparency, integrity, and long-term partnerships are the foundation of our operations. We ensure clear terms, competitive rates, and responsible lending practices.",
      points: [
        "100% transparent lending",
        "No hidden charges",
        "Ethical finance practices",
        "Long-term client commitment",
      ],
    },
  };

  return (
    <section className={`w-full py-28 px-6 md:px-20 relative overflow-hidden transition-all duration-500 ${
      isDarkMode ? "bg-slate-950 text-slate-100" : "bg-[#0F1E3D] text-white"
    }`}>

      {/* Soft Sky Blue Glow */}
      <div className={`absolute right-0 top-1/3 w-72 h-72 rounded-full blur-[120px] transition-colors duration-500 ${
        isDarkMode ? "bg-sky-500/10" : "bg-sky-400/20"
      }`}></div>

      <div className="max-w-6xl ml-auto relative z-10">

        {/* Small Heading */}
        <p className={`uppercase tracking-widest text-sm mb-4 font-semibold transition-colors duration-500 ${
          isDarkMode ? "text-sky-400" : "text-white/70"
        }`}>
          Company Transparency
        </p>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-10">
          Our Company Core <br /> Values
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-10">
          {Object.keys(tabContent).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm rounded-full transition-all duration-300 font-medium ${
                activeTab === tab
                  ? "bg-sky-500 text-white shadow-lg scale-105"
                  : isDarkMode
                    ? "bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className={`backdrop-blur-xl p-10 rounded-2xl border transition-all duration-500 shadow-2xl ${
          isDarkMode ? "bg-slate-900/40 border-slate-800/80" : "bg-white/5 border-white/10"
        }`}>

          {/* Description */}
          <p className={`leading-relaxed mb-8 max-w-3xl transition-all duration-500 ${
            isDarkMode ? "text-slate-300" : "text-white/80"
          }`}>
            {tabContent[activeTab].description}
          </p>

          {/* Tick Points */}
          <ul className="grid md:grid-cols-2 gap-5">
            {tabContent[activeTab].points.map((point: string, index: number) => (
              <li
                key={index}
                className="flex items-start gap-3 group transition-all duration-300 hover:translate-x-2"
              >
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-sky-500 shadow-md transition-all duration-300 group-hover:scale-110">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className={`transition-colors duration-300 ${
                  isDarkMode ? "text-slate-300 group-hover:text-white" : "text-white/80 group-hover:text-white"
                }`}>
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Section */}
        <div className="flex items-center gap-5 mt-14 group cursor-pointer">
          
          {/* Animated Phone Icon with Dynamic Corners */}
          <div className="w-16 h-16 bg-sky-500 flex items-center justify-center shadow-xl transition-all duration-500
          
          rounded-tr-3xl rounded-br-3xl rounded-bl-3xl
          group-hover:rounded-tl-3xl 
          group-hover:rounded-bl-none 
          group-hover:rounded-tr-none
          group-hover:rotate-12
          group-hover:scale-110">

            <Phone className="w-6 h-6 text-white" />
          </div>

          <div>
            <p className={`text-sm transition-colors duration-300 ${
              isDarkMode ? "text-slate-400 group-hover:text-slate-300" : "text-white/70 group-hover:text-white"
            }`}>
              Call Us Any Time
            </p>
            <p className="font-bold text-2xl group-hover:tracking-wider transition-all duration-300">
              9370439566
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CompanyTransparency;