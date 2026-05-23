import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { gradients } from '../../styles/gradients';
import image from '../../asset/Loan-against-property/image.webp';

// You can replace these with your preferred icons, e.g., from lucide-react
const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 dark:text-emerald-400">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const MortgageLoanSection = () => {
  const { isDarkMode } = useTheme();
  return (
    // Main container with theme-aware background
    <div className={`${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'} font-sans antialiased transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-40 sm:py-64">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
               <h2 className="text-4xl sm:text-5xl font-bold tracking-tight transition-colors duration-300"
                   style={{
                     ...gradients.primaryText,
                     display: "inline-block"
                   }}>
                Unlock Your Property's Potential
              </h2>
              <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'} max-w-xl transition-colors duration-300`}>
                Access extra capital with our flexible first and second mortgage loans. We offer straightforward solutions, including low-doc options, to help you achieve your financial goals.
              </p>
            </div>

            {/* Feature Box for Mortgage Details */}
            <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-6 sm:p-8 rounded-2xl shadow-sm border transition-colors duration-300`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* First Mortgage Details */}
                <div>
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'} mb-1 transition-colors duration-300`}>First Mortgage</h3>
                  <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} transition-colors duration-300`}>Benefit from lower interest rates as the primary lien holder on your property.</p>
                </div>
                
                {/* Second Mortgage Details */}
                <div>
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'} mb-1 transition-colors duration-300`}>Second Mortgage</h3>
                  <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} transition-colors duration-300`}>Gain supplementary funding with flexible terms that work for you.</p>
                </div>
              </div>

              {/* Divider */}
              <hr className={`my-6 sm:my-8 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} transition-colors duration-300`} />

              {/* Key Features List */}
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircleIcon />
                  <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} transition-colors duration-300`}>Loan amounts starting from <span className="font-semibold">$100,000</span></span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon />
                  <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} transition-colors duration-300`}>Flexible terms up to <span className="font-semibold">3 years</span></span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon />
                  <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} transition-colors duration-300`}>Rates from <span className="font-semibold">7.99% (1st)</span> and <span className="font-semibold">14.99% (2nd)</span></span>
                </li>
              </ul>
            </div>
            
            {/* Call to Action Button */}
           
          </div>
          
          {/* Right Column: Image */}
          <div className="relative h-full flex items-center justify-center">
            <div className="w-full max-w-md">
                <img
                  src={image}
                  alt="Couple reviewing mortgage documents in a modern home"
                  className="rounded-2xl shadow-xl w-full h-auto object-cover aspect-[4/3]"
                  onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x450/e2e8f0/475569?text=Home+Equity'; }}
                />
                {/* Decorative background element */}
                <div className={`absolute -top-4 -right-4 w-24 h-24 ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'} rounded-full -z-10 transition-colors duration-300`}></div>
                <div className={`absolute -bottom-6 -left-6 w-32 h-32 ${isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-100'} rounded-2xl -z-10 transform rotate-12 transition-colors duration-300`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageLoanSection;
