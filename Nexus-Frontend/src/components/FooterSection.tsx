
import React, { useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../asset/logo/Nexus-logo.png';
import memberFallback from '../asset/experts/leader.png';

import {
  Phone, Mail, MapPin,
  Clock, Shield, Calendar, Award, Users, X
} from 'lucide-react';

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

const FooterSection: React.FC = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });

  const showPopup = location.pathname === '/Nexus-Finance/inquiry-submitted';
  const handleClosePopup = () => navigate(-1);

  const legalLinks = [
    'Privacy Policy', 'Privacy Non-disclosure', 'Terms of Service', 'Credit Guide', 'Complaints Policy'
  ];

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setStatus({ type: '', message: '' });

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      const response = await fetch('/api/contact/submit', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("HTTP status:", response.status);

      const result = await response.json().catch(() => null);
      console.log("Server response:", result);

      if (!response.ok) {
        throw new Error(result?.message || `Backend returned status ${response.status}`);
      }

      formRef.current.reset();
      setStatus({ type: "success", message: "✅ Message sent successfully!" });
      navigate("/Nexus-Finance/inquiry-submitted");

    } catch (error: any) {
      console.error("Error submitting form:", error);
      setStatus({
        type: "error",
        message: `❌ Failed to submit application. ${error.message}`,
      });
    } finally {
      setIsSending(false);
    }
  };

  const homeLoans = [
    'First Home Buyers', 'Home Loan Refinancing', 'Investment Property Loans',
    'Construction Loans', 'SMSF Property Loans', 'Low Doc Home Loans'
  ];
  const businessLoans = [
    'SME Business Loans', 'Working Capital Loans', 'Equipment Finance',
    'Commercial Property Loans', 'Business Line of Credit', 'Invoice Finance'
  ];
  const assetFinance = [
    'Vehicle Finance', 'Plant & Equipment', 'Technology Finance',
    'Medical Equipment', 'Agricultural Finance'
  ];
  const logos = [
    { name: 'Company 1', src: memberFallback, alt: '' },
    { name: 'Company 2', src: memberFallback, alt: '' },
    { name: 'Company 3', src: memberFallback, alt: '' },
    { name: 'Company 4', src: memberFallback, alt: '' },
    { name: 'Company 5', src: memberFallback, alt: '' },

  ];



  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className={`relative w-full max-w-md p-6 rounded-2xl shadow-lg text-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <button
              className="absolute top-4 right-4 hover:scale-110 transition-transform"
              onClick={handleClosePopup}
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold mb-3">Thank You!</h2>
            <p className="mb-6 text-lg">Your response has been submitted successfully.<br />One of our specialist will connect with you shortly.</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleClosePopup}
                className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition-all"
              >
                OK
              </button>
              <button
                onClick={handleClosePopup}
                className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'} px-6 py-2 rounded-lg shadow hover:scale-105 transition-all`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <footer
        id="contact"
        className={`relative overflow-hidden transition-colors duration-300 ${isDarkMode
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
            : 'bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900'
          }`}
      >
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-green-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-pulse-delayed"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center space-x-4 group">
                <div className='relative -top-[70px]'>
                  <Link to="/" className="group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={logo}
                      alt="Nexus Finance  - n mortgage and finance brokerage"
                      className=" rounded-2xl object-cover"
                    />
                  </Link>
                </div>
              </div>

                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed text-lg`}>
                Nexus Finance is a trusted business loan broker, committed to helping businesses and individuals achieve their financial goals. We provide tailored solutions, including low doc business loans and unsecured business loan options, ensuring finance is simple, accessible, and stress-free.

              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3 group">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center group-hover:bg-blue-600/30 transition-colors duration-300 backdrop-blur-sm">
                    <Shield className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Accredited Brokers</div>
                    <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Fully Licensed</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center group-hover:bg-green-600/30 transition-colors duration-300 backdrop-blur-sm">
                    <Clock className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Fast Pre-Approval</div>
                    <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Quick Decisions</div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">

              </div>
            </div>

            <div className="lg:col-span-3">
              <h3 className="text-xl font-bold mb-8 flex items-center">
                <div className="w-2 h-2 bg-nexus-gradient rounded-full mr-3"></div>
                Quick Links
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">Business Loans</h4>
                  <ul className="space-y-2">
                    <li><Link to="/Nexus-Finance/Business-loans/Unsecured-business-loans" className="text-sm text-gray-400 hover:text-white transition-colors">Unsecured Business Loans</Link></li>
                    <li><Link to="/Nexus-Finance/Business-loans/Business-line-of-credit" className="text-sm text-gray-400 hover:text-white transition-colors">Business Line of Credit</Link></li>
                   
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-lg">Property Finance</h4>
                  <ul className="space-y-2">
                    <li><Link to="Nexus-Finance/Property-Finance/Loan-against-property" className="text-sm text-gray-400 hover:text-white transition-colors">Loan Against Property</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-lg">Asset Finance</h4>
                  <div className="space-y-4">
                    <ul className="space-y-2">
                      <li><Link to="Nexus-Finance/Asset-Finance/Business-vehicle-loans" className="text-sm text-gray-400 hover:text-white transition-colors">Business Vehicle Loans</Link></li>
                      <li><Link to="Nexus-Finance/Asset-Finance/Solar-equipment-finance" className="text-sm text-gray-400 hover:text-white transition-colors">Solar Equipment Finance</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <style >{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
          box-sizing: border-box;
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        .marquee-content {
          display: flex;
          animation: marquee 20s linear infinite;
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
        .logo-item-footer {
          width: 25%;
          flex-shrink: 0;
          padding: 2rem;
        }
        @media (max-width: 768px) {
          .logo-item-footer {
            width: 50%;
          }
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
        }
      `}</style>

          <div className="container mx-auto px-4 pb-20 relative z-10">
            <div className="w-full pb-0">

            </div>
          </div>

          <div className="bg-gradient-to-r from-white-800/50 to-white-700/50 backdrop-blur-sm rounded-3xl p-6 md:p-10 mb-16 border border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Get in Touch</h3>
                {[
                  { icon: Phone, title: '9370439566', subtitle: 'Call us today for expert advice', href: 'tel:1300054351' },
                  { icon: Mail, title: 'info@Nexusfinance.com.au', subtitle: 'Email us anytime', href: 'mailto:info@Nexusfinance.com.au' },
                  { icon: MapPin, title: 'Office Adress', subtitle: 'none' },
                  { icon: Calendar, title: 'Book a Consultation', subtitle: 'Available via website - Free consultation', href: '#call-us-form' }
                ].map((item, index) => (
                  item.href ? (
                    <a key={index} href={item.href} target={item.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="flex items-start space-x-3 md:space-x-4 group mb-4 md:mb-6">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-nexus-gradient rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <div>
                        <p className={`font-bold text-lg md:text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</p>
                        {item.subtitle.split('\n').map((line, i) => (
                          <p key={i} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm md:text-base`}>{line}</p>
                        ))}
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-start space-x-3 md:space-x-4 group mb-4 md:mb-6" key={index}>
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-nexus-gradient rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <div>
                        <p className={`font-bold text-lg md:text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</p>
                        {item.subtitle.split('\n').map((line, i) => (
                          <p key={i} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm md:text-base`}>{line}</p>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>

              <div id="call-us-form">
                <h3 className="text-3xl font-bold mb-8">Tell us bit more about your requirement</h3>
                <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                  <input type="text" name="hidden_field" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        placeholder="Full Name *"
                        className={`w-full rounded-xl p-4 border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode
                            ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        required
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="Email ID *"
                        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                        title="Enter a valid email address"
                        className={`w-full rounded-xl p-4 border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode
                            ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        required
                        aria-required="true"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        placeholder="Contact No. *"
                        pattern="^\+?\d{7,15}$"
                        title="Enter a valid phone number"
                        className={`w-full rounded-xl p-4 border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode
                            ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        required
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <input
                        id="business-abn"
                        name="business_abn"
                        type="text"
                        placeholder="Business ABN/ACN (If applicable)"
                        className={`w-full rounded-xl p-4 border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode
                            ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        id="trading-name"
                        name="trading_name"
                        type="text"
                        placeholder="Trading Name"
                        className={`w-full rounded-xl p-4 border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode
                            ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                      />
                    </div>
                    <div>
                      <select
                        id="credit-rating"
                        name="credit_rating"
                        className={`w-full rounded-xl p-4 border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode
                            ? 'bg-gray-800/50 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        required
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Credit Rating *
                        </option>
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Bad">Bad</option>
                        <option value="Unsure">Unsure</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <select
                        id="loan-type"
                        name="loan_type"
                        className={`w-full rounded-xl p-4 border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode
                            ? 'bg-gray-800/50 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        required
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Type of Loan you are looking for *
                        </option>
                        <option value="Unsecured Business Loan">Unsecured Business Loan</option>
                        <option value="Business Loan Against Property">Business Loan Against Property</option>
                        <option value="Asset Finance">Asset Finance</option>
                        <option value="Medical and Health Professional Loans">Medical and Health Professional Loans</option>
                        <option value="ATO Debt Finance">ATO Debt Finance</option>
                        <option value="Debtor/Invoice Finance">Debtor/Invoice Finance</option>
                        <option value="Personal Loan">Personal Loan</option>
                        <option value="Home Loan">Home Loan</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    <div>
                      <select
                        id="trading-time"
                        name="business_trading_time"
                        className={`w-full rounded-xl p-4 border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode
                            ? 'bg-gray-800/50 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        required
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Business Trading Time *
                        </option>
                        <option value="0-6 Months">0-6 Months</option>
                        <option value="6-24 Months">6-24 Months</option>
                        <option value="Greater than 24 Months">Greater than 24 Months</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <input
                      id="loan-amount"
                      name="loan_amount"
                      type="number"
                      placeholder="Loan Amount $"
                      className={`w-full rounded-xl p-4 border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode
                          ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      required
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder="Your Message *"
                      rows={4}
                      className={`w-full rounded-xl p-4 border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode
                          ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      required
                      aria-required="true"
                    ></textarea>
                  </div>

                  {status.message && (
                    <p className={`text-sm ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                      {status.message}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-nexus-gradient text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                    aria-label={isSending ? 'Sending message' : 'Send message'}
                  >
                    {isSending ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* <div className="border-t border-gray-700 pt-12">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                {legalLinks.slice(0, 5).map((link, index) => {
                  const linkMap = {
                    'Privacy Policy': '/privacy-policy',
                    'Privacy Non-disclosure': '/privacy-non-disclosure',
                    'Terms of Service': '/terms-of-service',
                    'Credit Guide': '/credit-guide',
                    'Complaints Policy': '#call-us-form'
                  };
                  if (link === 'Complaints Policy') {
                    return (
                      <a
                        key={index}
                        href="/#call-us-form"
                        className={`text-sm relative group ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          } hover:text-white transition-all duration-300`}
                      >
                        {link}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-green-400 transition-all duration-300 group-hover:w-full"></span>
                      </a>
                    );
                  }
                  return (
                    <Link
                      key={index}
                      to={linkMap[link as keyof typeof linkMap] || '#'}
                      className={`text-sm relative group ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        } hover:text-white transition-all duration-300`}
                    >
                      {link}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-green-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  );
                })}
              </div>
              <div className="text-center lg:text-right">
                <p
                  className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-2`}
                >
                  © 2026 Nexus Finance. All rights reserved   
                </p>
                <p
                  className={`${isDarkMode ? 'text-gray-500' : 'text-gray-500'} text-xs`}
                >
                  ABN: 73 685 074 631
                  ACN: 685 074 631
                  CRN No : 567862 under ACL 530764 of Finstead Capital Pty Ltd (Sub-Aggregator)
                </p>
                <p
                  className={`${isDarkMode ? 'text-gray-500' : 'text-gray-500'} text-xs mt-1`}
                >
                  Commercial Finance Brokers
                  Nexus Finance Pty Ltd - Parramatta, NSW,  & Adelaide, SA
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </footer>
    </>
  );
};

export default FooterSection;

