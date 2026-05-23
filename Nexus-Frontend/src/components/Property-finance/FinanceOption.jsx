import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { gradients } from '../../styles/gradients';

// --- Icon Components ---
// You can replace these with your preferred icons from a library like lucide-react.

// Icon for Caveat Loans
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

// Icon for Development Finance
const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
    <path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M8 10h.01"></path>
  </svg>
);

// Icon for Bridging Finance
const BridgeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 12h8"></path><path d="M6 8h12"></path><path d="M4 16h16"></path><path d="M2 20h20"></path><path d="M10 12V8"></path><path d="M14 12V8"></path>
    </svg>
);

// A generic checkmark icon for list items
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 shrink-0">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

// --- Data for Finance Options ---
const financeOptions = [
  {
    title: 'Caveat Loans',
    description: 'Need funds fast? Secure short-term finance in as little as 24 hours using your property.',
    bullets: [
      'Loan amounts from $50K',
      'Terms up to 60 months',
      'Up to 100% LVR (cash flow dependent)',
      'Low documentation required',
    ],
    icon: <ClockIcon />,
    color: 'blue'
  },
  {
    title: 'Development & Construction',
    description: 'Build or renovate with structured drawdowns aligned to your project milestones.',
    bullets: [
      'Loans from $250K',
      'Funding up to 70% of GRV',
      'Interest-only or capitalised options',
      'Tailored for builders & developers',
    ],
    icon: <BuildingIcon />,
    color: 'emerald'
  },
  {
    title: 'Bridging Finance',
    description: 'Perfect for short-term funding gaps, ATO payments, or time-sensitive deals.',
    bullets: [
      'Loans from $100K',
      'Terms up to 12 months',
      'Funding up to 80% LVR',
      'Fast settlements in 5–10 days',
    ],
    icon: <BridgeIcon />,
    color: 'indigo'
  },
];

// --- Main Component ---
const FinanceOptionsGrid = () => {
  const { isDarkMode } = useTheme();

  const colorVariants = {
    blue: {
      bg: isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50',
      text: isDarkMode ? 'text-blue-400' : 'text-blue-600',
      border: isDarkMode ? 'border-blue-500' : 'border-blue-500',
      button: isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-600 hover:bg-blue-700',
    },
    emerald: {
      bg: isDarkMode ? 'bg-emerald-900/20' : 'bg-emerald-50',
      text: isDarkMode ? 'text-emerald-400' : 'text-emerald-600',
      border: isDarkMode ? 'border-emerald-500' : 'border-emerald-500',
      button: isDarkMode ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-emerald-600 hover:bg-emerald-700',
    },
    indigo: {
      bg: isDarkMode ? 'bg-indigo-900/20' : 'bg-indigo-50',
      text: isDarkMode ? 'text-indigo-400' : 'text-indigo-600',
      border: isDarkMode ? 'border-indigo-500' : 'border-indigo-500',
      button: isDarkMode ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-indigo-600 hover:bg-indigo-700',
    }
  };

  const themeClasses = {
    background: isDarkMode ? 'bg-slate-900' : 'bg-slate-100',
    cardBackground: isDarkMode ? 'bg-slate-800' : 'bg-white',
    cardHover: isDarkMode ? 'hover:shadow-slate-700/50' : 'hover:shadow-xl',
    textPrimary: isDarkMode ? 'text-slate-100' : 'text-slate-800',
    textSecondary: isDarkMode ? 'text-slate-300' : 'text-slate-600',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-slate-700',
    checkIcon: isDarkMode ? 'text-emerald-400' : 'text-emerald-500',
  };

  return (
    <div className={`${themeClasses.background} font-sans antialiased transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-16 sm:py-24">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight transition-colors duration-300"
                   style={{
                     ...gradients.primaryText,
                     display: "inline-block"
                   }}>
                Tailored Finance Solutions
              </h2>
          <p className={`mt-4 text-lg ${themeClasses.textSecondary} max-w-2xl mx-auto`}>
            From rapid funding to large-scale development projects, we have a solution to fit your business needs.
          </p>
        </div>

        {/* Grid of Finance Option Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {financeOptions.map((option, index) => {
            const colors = colorVariants[option.color] || colorVariants.blue;
            return (
              <div
                key={index}
                className={`${themeClasses.cardBackground} rounded-2xl shadow-md border-t-4 ${colors.border} p-8 flex flex-col transition-all duration-300 ${themeClasses.cardHover} hover:-translate-y-2`}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className={`p-3 rounded-lg ${colors.bg} ${colors.text}`}>
                      {option.icon}
                  </div>
                  <h3 className={`text-2xl font-bold ${themeClasses.textPrimary}`}>{option.title}</h3>
                </div>

                <p className={`${themeClasses.textSecondary} leading-relaxed mb-6 flex-grow`}>{option.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {option.bullets.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className={themeClasses.textMuted}>{point}</span>
                    </li>
                  ))}
                </ul>

               
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default FinanceOptionsGrid;
