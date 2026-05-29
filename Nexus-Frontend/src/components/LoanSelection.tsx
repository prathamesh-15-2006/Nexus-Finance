import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createDraftLead } from '../services/api';
import carImage from '../asset/bgimgs/car.webp';
import businessImage from '../asset/patner/business.webp';
import propertyImage from '../asset/patner/property.webp';
import assetImage from '../asset/assetfinance.webp';

const loanOptions = [
  { name: "Business Loans", image: businessImage },
  { name: "Business Loan Against Property", image: propertyImage },
  { name: "Vehicle Loan", image: carImage },
  { name: "Other Finances", image: assetImage },
];

interface LoanSelectionProps {
  isDarkMode: boolean;
}

const LoanSelection: React.FC<LoanSelectionProps> = ({ isDarkMode }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", contact: "" });
  // Added error state
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const openInquiry = searchParams.get('openInquiry');
    if (openInquiry) {
      const map: { [key: string]: string } = {
        business: 'Business Loans',
        property: 'Business Loan Against Property',
        car: 'Vehicle Loan',
        equipment: 'Other Finances'
      };
      const optionName = map[openInquiry];
      if (optionName) {
        setSelected(optionName);
        setShowForm(true);
        setPhoneError(false);
        setEmailError(false);
        // Clear search parameter so it doesn't reopen if the user closes it or refreshes
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('openInquiry');
        setSearchParams(newParams, { replace: true });
      }
    }
  }, [searchParams, setSearchParams]);

  const handleCardClick = (optionName: string) => {
    setSelected(optionName);
    setShowForm(true);
    setPhoneError(false); // Reset error when opening
    setEmailError(false); // Reset email error when opening
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Phone Regex (Indian mobiles)
    const indPhoneRegex = /^(?:\+?91|0)?[6-9]\d{9}$/;

    // Email Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Manual Validation Check
    if (!indPhoneRegex.test(formData.contact.replace(/\s/g, ''))) {
      setPhoneError(true); // Show red error text instead of alert
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setEmailError(true); // Show red error text for email
      return;
    }

    setPhoneError(false);
    setEmailError(false);

    const loanTypeMap: { [key: string]: string } = {
      'Business Loans': 'business',
      'Business Loan Against Property': 'property',
      'Vehicle Loan': 'car',
      'Other Finances': 'equipment'
    };

    const loanType = loanTypeMap[selected || ''] || 'business';
    const targetUrl = `/apply?loanType=${loanType}`;

    // Store form data in localStorage for auto-fill
    localStorage.setItem('loanSelectionData', JSON.stringify({
      fullName: formData.fullName,
      contact: formData.contact,
      email: formData.email
    }));

    // Open in new tab immediately
    window.open(targetUrl, '_blank');
    setShowForm(false);

    try {
      // Call the API to create draft lead
      await createDraftLead({
        loan_type: loanType,
        full_name: formData.fullName,
        contact_number: formData.contact,
        email: formData.email,
        hidden_field: ""
      });
    } catch (error) {
      console.error('Failed to create draft lead:', error);
    }
  };

  return (
    <div className="relative min-h-[400px]">
      <div className={`${
          isDarkMode
            ? 'bg-gray-800/90 border-gray-700 border-white/20 shadow-[0_0_30px_rgba(59,130,246,0.6)]'
            : 'bg-white/90 border-gray-200 border-black/20 shadow-[0_0_30px_rgba(59,130,246,0.4)]'
        } backdrop-blur-sm rounded-lg p-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl text-center border`}>
        <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-10 ${
          isDarkMode ? 'text-white' : 'text-[#2b0b73]'
        }`}>
          Loans that Meet Your Needs
        Get an instant decision on loans up to $50,000 in most cases
        </h2>
        {/* <p className={`mb-4 text-sm md:text-base ${
          isDarkMode ? 'text-gray-300' : 'text-[#6a47b8]'
        }`}>
        Get quick quote without affecting your credit score.
        </p> */}

        <div className="grid grid-cols-2 gap-2 lg:gap-4 px-4 lg:px-4">
          {loanOptions.map((option) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              key={option.name}
              onClick={() => handleCardClick(option.name)}
              className={`cursor-pointer rounded-2xl p-2 lg:p-3 flex flex-col items-center justify-center transition-all duration-300 min-h-[100px] shadow-2xl ${
                selected === option.name
                  ? "bg-[#c88bfa]/30 border-2 border-[#7b49ff] "
                  : "bg-[#f4edff] hover:bg-[#ebe0ff]"
              }`}
            >
              <img
                src={option.image}
                alt={option.name}
                className="w-12 h-12 lg:w-14 lg:h-14 object-contain mb-1"
              />
              <p className={`font-semibold text-sm lg:text-base ${
                  selected === option.name ? "text-white" : "text-[#3c2f63]"
                }`}>
                {option.name}
              </p>
            </motion.div>
          ))}
        </div>
        </div>

      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`${
                isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'
              } rounded-[2rem] shadow-2xl w-full max-w-xl border flex flex-col max-h-[100vh]`}
            >
              <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700">
                <h3 className="text-xl md:text-2xl font-bold">Loan Inquiry</h3>
                <p className="text-sm opacity-70">Fill out the form below to continue.</p>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                <form id="loan-form" onSubmit={handleSubmit} className="space-y-5 text-left">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-60">Selected Loan</label>
                    <input
                      type="text"
                      value={selected || ""}
                      readOnly
                      className={`w-full p-3 rounded-xl border font-semibold ${
                        isDarkMode ? 'bg-gray-700/50 border-gray-600 text-purple-400' : 'bg-gray-50 border-gray-200 text-[#7b49ff]'
                      } outline-none`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-60">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#7b49ff] outline-none text-white"
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-60">Contact Number</label>
                    <input
                      required
                      type="tel"
                      placeholder="e.g. 0400 000 000"
                      className={`w-full p-3 rounded-xl border outline-none transition-all ${
                        phoneError 
                          ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                          : 'border-gray-300 focus:ring-2 focus:ring-[#7b49ff]'
                      } bg-white text-black`}
                      onChange={(e) => {
                        setPhoneError(false); // Hide error while user is typing
                        setFormData({...formData, contact: e.target.value});
                      }}
                    />
                    {phoneError && (
                      <p className="text-red-500 text-xs mt-1 font-semibold italic">
                        * Please enter a valid Indian phone number.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-60">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="name@example.com"
                      className={`w-full p-3 rounded-xl border outline-none transition-all bg-white text-black ${
                        emailError
                          ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-gray-300 focus:ring-2 focus:ring-[#7b49ff]'
                      }`}
                      onChange={(e) => {
                        setEmailError(false); // Hide error while user is typing
                        setFormData({...formData, email: e.target.value});
                      }}
                    />
                    {emailError && (
                      <p className="text-red-500 text-xs mt-1 font-semibold italic">
                        * Please enter a valid email address.
                      </p>
                    )}
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 px-4 rounded-xl bg-gray-100 text-gray-900 font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  form="loan-form"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#7b49ff] text-white font-bold hover:bg-[#6a47b8] shadow-lg shadow-purple-500/20 transition-all"
                >
                  Apply Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoanSelection;