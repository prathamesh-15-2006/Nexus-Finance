import React from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { Box, Typography, Container, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowForward } from '@mui/icons-material';
import FaqSection from "./Faq";
import Atobg from "../../../asset/bgimgs/banner.webp";
import finance from '../../../asset/Ato/image copy 2.webp';
import finance1 from '../../../asset/Ato/image copy 2.webp';
import finance2 from '../../../asset/Ato/image copy 2.webp';
import finance3 from '../../../asset/Ato/image copy.webp';

import { gradients } from "../../../styles/gradients";

const Tax = () => {
  const { isDarkMode } = useTheme();

  const gradientTextStyle = {
    ...gradients.primaryText,
    lineHeight: 1.2,
  };



  const gradientButtonClass =
    "bg-nexus-gradient";

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[62vh] sm:h-[70vh] md:h-[100vh] lg:h-screen flex items-center justify-center overflow-hidden ">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${Atobg})`,
            height: "150vh",
            top: "500",
          
            marginTop: "80px",
          }}
        ></div>

        <div className="relative max-w-4xl mx-auto text-center z-10">
          <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-2xl p-8 sm:p-12 shadow-2xl">
           
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-wide leading-tight drop-shadow-xl transition-colors duration-300"
              style={{...gradientTextStyle, fontWeight: 800}}
            >
              Effective ATO Tax Debt Loans -Wide
            </h2>
            <p
              className={`text-lg sm:text-xl mb-8 transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } drop-shadow-lg`}
            >
              Professional tax debt solutions tailored for n businesses
            </p>
            <button
                                             onClick={() => window.open('https://Nexusfinance.afos.io/business-loans/quick-quote', '_blank')}

              className={`mt-8 px-8 py-3 font-semibold text-lg text-white rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${gradientButtonClass}`}
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img
              src={finance}
              alt="Financial Advisor"
              className={`rounded-2xl shadow-xl w-full h-auto object-cover transition-all duration-300 hover:scale-105 ${
                isDarkMode ? "opacity-90" : ""
              }`}
            />
          </div>
          <div className="md:w-1/2">
            <h3              className="text-3xl sm:text-[2.5rem] md:text-5xl font-extrabold mb-4 transition-colors duration-300"
              style={{...gradientTextStyle, fontWeight: 800}}
            >
              ATO Debt Finance – Manage Your Tax Obligations With Nexus
              Finance
            </h3>
           
            <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full mb-6"></div>
            <p
              className={`leading-relaxed mb-4 transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Facing a tax debt to the n Taxation Office (ATO) can put
              immense strain on your business finances. Nexus Finance offers{" "}
              <strong
                className={`font-bold transition-colors duration-300 ${
                  isDarkMode ? "text-indigo-300" : "text-indigo-900"
                }`}
              >
                ATO Debt Finance solutions
              </strong>{" "}
              to help businesses resolve their tax obligations smoothly.
            </p>
            <p
              className={`leading-relaxed transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Whether you're struggling with a direct payment arrangement or
              need more flexible options, our tailored loan solutions can
              provide relief while maintaining your cash flow and business
              operations.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h3
            className="text-3xl sm:text-[2.5rem] md:text-5xl font-extrabold mb-3 transition-colors duration-300"
            style={{...gradientTextStyle, fontWeight: 800}}
          >
            Why Choose ATO Debt Finance?
          </h3>
          <h3
            className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-2 transition-colors duration-300"
            style={{...gradientTextStyle, fontWeight: 800}}
          >
            Key Benefits Overview
          </h3>
          <p
            className={`text-lg mb-12 transition-colors duration-300 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Unlock the advantages of smarter tax debt management
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Clear Your ATO Debt",
                description:
                  "Manage overdue taxes without the stress of immediate full payments.",
                icon: "💰",
              },
              {
                title: "Protect Your Credit Rating",
                description:
                  "Safeguard your business's credit score by addressing debt quickly.",
                icon: "🛡️",
              },
              {
                title: "Flexible Repayment Plans",
                description:
                  "Repayment terms aligned with your cash flow for reduced stress.",
                icon: "📅",
              },
              {
                title: "Improved Cash Flow",
                description:
                  "Allocate resources more effectively to grow your business.",
                icon: "📈",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl shadow-lg p-6 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                } border`}
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <strong
                  className={`text-lg font-bold mb-2 block transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {item.title}
                </strong>
                <p
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overdraft Solutions Section */}
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="md:w-1/2">
            <img
              src={finance1}
              alt="Overdraft Solutions"
              className={`rounded-2xl shadow-xl w-full h-auto object-cover transition-all duration-300 hover:scale-105 ${
                isDarkMode ? "opacity-90" : ""
              }`}
            />
          </div>
          <div className="md:w-1/2">
            <h3
              className="text-3xl sm:text-[2.5rem] md:text-5xl font-extrabold mb-4 transition-colors duration-300"
              style={{...gradientTextStyle, fontWeight: 800}}
            >
              Overdraft Solutions for Businesses
            </h3>
            <h3
              className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-3 transition-colors duration-300"
              style={{...gradientTextStyle, fontWeight: 800}}
            >
              Flexible Working Capital
            </h3>
            <p
              className={`leading-relaxed mb-4 transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Nexus Finance provides flexible overdraft facilities designed to
              give your business quick access to working capital whenever
              needed. Whether you're facing seasonal cash flow gaps or
              unexpected expenses, our overdraft solutions can help you stay on
              top of operations without disruption.
            </p>
            <p
              className={`leading-relaxed transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              With competitive rates and tailored limits, we ensure you have the
              financial flexibility to grow and adapt in a fast-changing
              business environment.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img
              src={finance3}
              alt="How ATO Debt Finance Works"
              className={`rounded-2xl shadow-xl w-full h-auto object-cover transition-all duration-300 hover:scale-105 ${
                isDarkMode ? "opacity-90" : ""
              }`}
            />
          </div>
          <div className="md:w-1/2">
            <h3
              className="text-3xl sm:text-[2.5rem] md:text-5xl font-extrabold mb-4 transition-colors duration-300"
              style={{...gradientTextStyle, fontWeight: 800}}
            >
              How ATO Debt Finance Works
            </h3>
            <h3
              className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-3 transition-colors duration-300"
              style={{...gradientTextStyle, fontWeight: 800}}
            >
              Application Process
            </h3>
            <p
              className={`leading-relaxed transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Our finance experts simplify the loan application process, guiding
              you every step of the way. You'll provide your financial details,
              including proof of the tax debt amount, and we'll assess your
              business's eligibility and loan requirements. Once approved, we'll
              structure a loan that covers your tax debt while working within
              your business's financial framework.
            </p>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 text-center transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h3
            className="text-3xl sm:text-[2.5rem] md:text-5xl font-extrabold mb-8 transition-colors duration-300"
            style={gradientTextStyle}
          >
            Eligibility Criteria for ATO Debt Finance
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "n Businesses",
                description:
                  "Registered and operational businesses in .",
                icon: "🏢",
              },
              {
                title: "Tax Debt",
                description: "Outstanding tax liabilities owed to the ATO.",
                icon: "📋",
              },
              {
                title: "Repayment Capability",
                description:
                  "Ability to meet flexible loan repayments based on cash flow.",
                icon: "💪",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 shadow-md transition-all duration-300 transform hover:scale-105 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-gray-50 border-gray-200"
                } border`}
              >
                <div className="text-2xl mb-4">{item.icon}</div>
                <strong
                  className={`text-lg font-bold mb-2 block transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {item.title}
                </strong>
                <p
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img
              src={finance3}
              alt="Benefits of Partnering"
              className={`rounded-2xl shadow-xl w-full h-auto object-cover transition-all duration-300 hover:scale-105 ${
                isDarkMode ? "opacity-90" : ""
              }`}
            />
          </div>
          <div className="md:w-1/2">
            <h3
              className="text-3xl sm:text-[2.5rem] md:text-5xl font-extrabold mb-4 transition-colors duration-300"
              style={gradientTextStyle}
            >
              Benefits of Partnering with Nexus Finance
            </h3>
            <p
              className={`leading-relaxed transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              At Nexus Finance, we are dedicated to providing fast approvals,
              personalised support, and affordable loan solutions. Our financial
              experts specialise in helping n businesses manage their
              tax obligations effectively. We take a consultative approach,
              ensuring you understand every aspect of the loan and providing
              strategies for long-term financial health.
            </p>
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h3
              className="text-3xl sm:text-[2.5rem] md:text-5xl font-extrabold mb-4 transition-colors duration-300"
              style={gradientTextStyle}
            >
              Apply for ATO Debt Finance Today
            </h3>
            <p
              className={`leading-relaxed mb-6 transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Avoid penalties and safeguard your business's financial future by
              managing your ATO debt with the help of Nexus Finance. Contact
              us today to discuss your options and begin the journey toward
              financial freedom.
            </p>
            <button
             onClick={() => {
                  const contactForm = document.getElementById('call-us-form');
                  if (contactForm) {
                    contactForm.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              className={`px-8 py-3 font-semibold text-lg text-white rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${gradientButtonClass}`}
            >
              Start Your Application
            </button>
          </div>
          <div className="md:w-1/2">
            <img
              src={finance2}
              alt="Apply for ATO Debt Finance"
              className={`rounded-2xl shadow-xl w-full h-auto object-cover transition-all duration-300 hover:scale-105 ${
                isDarkMode ? "opacity-90" : ""
              }`}
            />
          </div>
        </div>
      </section>

      <FaqSection />
    </>
  );
};

export default Tax;
