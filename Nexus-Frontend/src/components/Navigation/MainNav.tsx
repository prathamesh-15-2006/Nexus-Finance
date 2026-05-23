import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Menu, X, Phone, ChevronDown, Sun, Moon, Calculator, FileText } from 'lucide-react';

const MainNav: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const businessLoans = [
    { name: 'Equipment Finance', description: 'Finance for business equipment and machinery' },
    { name: 'Working Capital', description: 'Cash flow solutions for daily operations' },
    { name: 'Business Expansion', description: 'Funding for business growth and expansion' },
    { name: 'Commercial Property', description: 'Office, retail and industrial property finance' },
    { name: 'Invoice Finance', description: 'Unlock cash flow from outstanding invoices' },
    { name: 'Trade Finance', description: 'Import and export financing solutions' },
    { name: 'Business Overdraft', description: 'Flexible credit facility for business needs' },
    { name: 'SME Loans', description: 'Small to medium enterprise funding solutions' }
  ];

  const homeLoans = [
    { name: 'First Home Buyer', description: 'Get into your first home with expert guidance' },
    { name: 'Home Loan Refinance', description: 'Better rates and terms on existing loans' },
    { name: 'Investment Property', description: 'Finance your property investment portfolio' },
    { name: 'Construction Loans', description: 'Build your dream home with flexible funding' },
    { name: 'SMSF Property', description: 'Self-managed super fund property investments' },
    { name: 'Commercial Property', description: 'Office, retail and warehouse financing' },
    { name: 'Bridging Finance', description: 'Short-term property finance solutions' },
    { name: 'Development Finance', description: 'Property development and subdivision finance' }
  ];

  const assetFinance = [
    { name: 'Vehicle Finance', description: 'Cars, trucks and commercial vehicle finance' },
    { name: 'Plant & Equipment', description: 'Heavy machinery and industrial equipment' },
    { name: 'Technology Finance', description: 'IT equipment and software financing' },
    { name: 'Medical Equipment', description: 'Healthcare and dental equipment finance' },
    { name: 'Agricultural Finance', description: 'Farm equipment and livestock finance' },
    { name: 'Aviation Finance', description: 'Aircraft and aviation equipment finance' },
    { name: 'Marine Finance', description: 'Boats and marine equipment financing' },
    { name: 'Solar & Energy', description: 'Renewable energy equipment finance' }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? isDarkMode 
          ? 'bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-700/50' 
          : 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-blue-100/50'
        : isDarkMode
          ? 'bg-gray-900/90 backdrop-blur-lg'
          : 'bg-white/90 backdrop-blur-lg'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
                <span className="text-white font-bold text-xl relative z-10">U</span>
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>Nexusan>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent ml-1">Finance</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#home" className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium transition-all duration-300 hover:scale-105 relative group`}>
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            
            {/* Business Loans Dropdown */}
            <div className="relative group">
              <button className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium transition-all duration-300 hover:scale-105 relative`}>
                <span>Business Loans</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <div className={`absolute top-full left-0 mt-3 w-96 ${isDarkMode ? 'bg-gray-800/98 border-gray-600' : 'bg-white/98 border-blue-100'} backdrop-blur-xl rounded-2xl shadow-2xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-4 group-hover:translate-y-0`}>
                <div className="p-8">
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center`}>
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mr-3"></div>
                    Business Loans
                  </h3>
                  <div className="space-y-2">
                    {businessLoans.map((item, index) => (
                      <a key={index} href="#" className={`block p-4 rounded-xl ${isDarkMode ? 'hover:bg-gray-700/50 border-gray-600' : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 border-blue-100'} transition-all duration-300 group/item border border-transparent hover:border-opacity-100`}>
                        <div className={`font-semibold ${isDarkMode ? 'text-white group-hover/item:text-blue-400' : 'text-gray-800 group-hover/item:text-blue-600'} transition-colors duration-300`}>{item.name}</div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{item.description}</div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Home Loans Dropdown */}
            <div className="relative group">
              <button className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium transition-all duration-300 hover:scale-105 relative`}>
                <span>Home Loans</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <div className={`absolute top-full left-0 mt-3 w-96 ${isDarkMode ? 'bg-gray-800/98 border-gray-600' : 'bg-white/98 border-green-100'} backdrop-blur-xl rounded-2xl shadow-2xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-4 group-hover:translate-y-0`}>
                <div className="p-8">
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center`}>
                    <div className="w-2 h-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mr-3"></div>
                    Home Loans
                  </h3>
                  <div className="space-y-2">
                    {homeLoans.map((item, index) => (
                      <a key={index} href="#" className={`block p-4 rounded-xl ${isDarkMode ? 'hover:bg-gray-700/50 border-gray-600' : 'hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 border-green-100'} transition-all duration-300 group/item border border-transparent hover:border-opacity-100`}>
                        <div className={`font-semibold ${isDarkMode ? 'text-white group-hover/item:text-green-400' : 'text-gray-800 group-hover/item:text-green-600'} transition-colors duration-300`}>{item.name}</div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{item.description}</div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Asset Finance Dropdown */}
            <div className="relative group">
              <button className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium transition-all duration-300 hover:scale-105 relative`}>
                <span>Asset Finance</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <div className={`absolute top-full left-0 mt-3 w-96 ${isDarkMode ? 'bg-gray-800/98 border-gray-600' : 'bg-white/98 border-purple-100'} backdrop-blur-xl rounded-2xl shadow-2xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-4 group-hover:translate-y-0`}>
                <div className="p-8">
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center`}>
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mr-3"></div>
                    Asset Finance
                  </h3>
                  <div className="space-y-2">
                    {assetFinance.map((item, index) => (
                      <a key={index} href="#" className={`block p-4 rounded-xl ${isDarkMode ? 'hover:bg-gray-700/50 border-gray-600' : 'hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 border-purple-100'} transition-all duration-300 group/item border border-transparent hover:border-opacity-100`}>
                        <div className={`font-semibold ${isDarkMode ? 'text-white group-hover/item:text-purple-400' : 'text-gray-800 group-hover/item:text-purple-600'} transition-colors duration-300`}>{item.name}</div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{item.description}</div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <a href="#calculator" className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium transition-all duration-300 hover:scale-105 relative group flex items-center space-x-1`}>
              <Calculator className="w-4 h-4" />
              <span>Calculator</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#about" className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium transition-all duration-300 hover:scale-105 relative group`}>
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#contact" className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium transition-all duration-300 hover:scale-105 relative group`}>
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* Contact Info, Theme Toggle & CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className={`flex items-center space-x-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} group`}>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg">9370439566div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Call us today</div>
              </div>
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'} transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            
            <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white px-8 py-3 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold relative overflow-hidden group">
              <span className="relative z-10 flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Apply Now</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'} transition-colors duration-200`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`lg:hidden ${isDarkMode ? 'bg-gray-800/98 border-gray-700' : 'bg-white/98 border-gray-200'} backdrop-blur-xl border-t rounded-b-2xl shadow-xl`}>
            <div className="px-4 py-6 space-y-4">
              <a href="#home" className={`block ${isDarkMode ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'} font-medium py-3 px-4 rounded-lg transition-all duration-200`}>
                Home
              </a>
              <a href="#business" className={`block ${isDarkMode ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'} font-medium py-3 px-4 rounded-lg transition-all duration-200`}>
                Business Loans
              </a>
              <a href="#home-loans" className={`block ${isDarkMode ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-green-50'} font-medium py-3 px-4 rounded-lg transition-all duration-200`}>
                Home Loans
              </a>
              <a href="#asset" className={`block ${isDarkMode ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-purple-50'} font-medium py-3 px-4 rounded-lg transition-all duration-200`}>
                Asset Finance
              </a>
              <a href="#calculator" className={`block ${isDarkMode ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'} font-medium py-3 px-4 rounded-lg transition-all duration-200`}>
                Calculator
              </a>
              <a href="#about" className={`block ${isDarkMode ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'} font-medium py-3 px-4 rounded-lg transition-all duration-200`}>
                About
              </a>
              <a href="#contact" className={`block ${isDarkMode ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'} font-medium py-3 px-4 rounded-lg transition-all duration-200`}>
                Contact
              </a>
              
              <div className={`pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className={`flex items-center space-x-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4 px-4`}>
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-bold">9370439566div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Call us today</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mb-4 px-4">
                  <button
                    onClick={toggleTheme}
                    className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'} transition-all duration-300`}
                  >
                    {isDarkMode ? (
                      <Sun className="w-5 h-5" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )}
                  </button>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white py-4 rounded-xl hover:shadow-lg transition-all duration-200 font-semibold">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default MainNav;