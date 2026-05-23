import React from "react";
import { DollarSign, Shield, Truck } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";


const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

export default function Flexible() {
  const { isDarkMode } = useTheme();

  const gradientStyle = {
    backgroundImage: isDarkMode 
      ? "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)" 
      : "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
  };

  const gradientTextClasses = `bg-clip-text text-transparent`;

  return (
    <div className={`min-h-screen p-8 font-sans antialiased transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      {/* Header */}
      <header className={`container mx-auto max-w-4xl p-6 rounded-2xl shadow-xl mb-12 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
      }`}>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h1
              className={`text-4xl font-extrabold mb-2 ${gradientTextClasses}`}
              style={gradientStyle}
            >
              Nexus Finance
            </h1>
            <p className={`text-xl transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Invoice & Debtor Finance Solutions
            </p>
          </div>
            <button
             onClick={() => {
                  const contactForm = document.getElementById('call-us-form');
                  if (contactForm) {
                    contactForm.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              className="font-bold py-3 px-8 rounded-full shadow-lg text-white transition-transform transform hover:scale-105"
              style={gradientStyle}
            >
              Get Started
            </button>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto max-w-4xl">
        {/* Hero */}
        <section className={`p-8 rounded-2xl shadow-xl mb-12 text-center md:text-left transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
        }`}>
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${gradientTextClasses}`}
            style={gradientStyle}
          >
            Fast, Flexible Cash Flow for ses
          </h2>
          <p className={`text-lg mb-6 leading-relaxed transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            At Nexus Finance, based in  businesses unlock
            cash flow and stay competitive with smart, low-doc Invoice Finance
            and Debtor Finance solutions. Whether you're a small business owner
            or a large enterprise, our funding options from $5,000 to $150
            million are designed to free up working capital — no property
            security required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4">
            <span className={`font-semibold text-sm px-4 py-2 rounded-full shadow-md transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gray-700 text-green-400 border border-gray-600' 
                : 'bg-white text-blue-800 border border-blue-200'
            }`}>
              Pre-approved in 48 hours
            </span>
            <span className={`font-semibold text-sm px-4 py-2 rounded-full shadow-md transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gray-700 text-green-400 border border-gray-600' 
                : 'bg-white text-blue-800 border border-blue-200'
            }`}>
              Access up to 95% of invoices
            </span>
          </div>
        </section>

        {/* Invoice Finance */}
        <section className={`p-8 rounded-2xl shadow-xl mb-12 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
        }`}>
          <h3
            className={`text-3xl font-bold mb-6 ${gradientTextClasses}`}
            style={gradientStyle}
          >
            What Is Invoice Finance?
          </h3>
          <p className={`text-lg leading-relaxed mb-6 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Also known as invoice discounting, Invoice Finance lets you access
            up to 95% of the value of unpaid invoices before customers pay. It's
            ideal for covering payroll, paying suppliers, or managing tax
            obligations — especially when customers delay payment.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1 */}
            <div className={`border rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer ${
              isDarkMode 
                ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700' 
                : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
            }`}>
              <DollarSign className={`w-10 h-10 mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-green-400' : 'text-blue-600'
              }`} />
              <h4 className={`text-2xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-green-400' : 'text-blue-800'
              }`}>
                Up to 95% Advanced
              </h4>
              <p className={`mt-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Access a significant portion of your invoice value upfront to
                boost your cash flow immediately.
              </p>
            </div>

            {/* 2 */}
            <div className={`border rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer ${
              isDarkMode 
                ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700' 
                : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
            }`}>
              <Shield className={`w-10 h-10 mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-green-400' : 'text-blue-600'
              }`} />
              <h4 className={`text-2xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-green-400' : 'text-blue-800'
              }`}>
                No Real Estate Collateral
              </h4>
              <p className={`mt-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Unlike traditional loans, our finance options don't require you
                to secure your property.
              </p>
            </div>

            {/* 3 */}
            <div className={`border rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer ${
              isDarkMode 
                ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700' 
                : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
            }`}>
              <Truck className={`w-10 h-10 mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-green-400' : 'text-blue-600'
              }`} />
              <h4 className={`text-2xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-green-400' : 'text-blue-800'
              }`}>
                Flexible Repayment
              </h4>
              <p className={`mt-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                You simply repay the advanced amount once your customer pays
                their invoice in full.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
