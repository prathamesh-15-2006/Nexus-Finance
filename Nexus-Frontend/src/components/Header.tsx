import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown, Sun, Moon,Mail, MapPin, } from 'lucide-react';
import logo from '../asset/logo/Nexus-logo.png';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
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

  // const homeLoansItems = [
  //   { name: 'First Home Buyers', description: 'Get into your first home with expert guidance' },
  //   { name: 'Home Loan Refinancing', description: 'Better rates and terms on your existing loan' },
  //   { name: 'Investment Property Loans', description: 'Finance your property investment portfolio' },
  //   { name: 'Construction Loans', description: 'Build your dream home with flexible funding' },
  //   { name: 'Upsizing & Downsizing', description: 'Move to your next home seamlessly' },
  //   { name: 'SMSF Property Loans', description: 'Self-managed super fund property investments' },
  //   { name: 'Low Doc Home Loans', description: 'Simplified documentation for self-employed' },
  //   { name: 'Bad Credit Home Loans', description: 'Second chance home loan solutions' }
  // ];
const businessLoansItems = [
    { name: 'UNSECURED BUSINESS LOANS', link: '/Nexus-Finance/Business-loans/Unsecured-business-loans' },
    { name: 'BUSINESS LINE OF CREDIT', link: '/Nexus-Finance/Business-loans/Business-line-of-credit' },
    // { name: 'BUSINESS OVERDRAFT', link: '/Nexus-Finance/Business-loans/Business-overdraft' },
    // { name: 'LOW DOC BUSINESS LOANS', link: '/Nexus-Finance/Business-loans/Low-doc-business-loans' },
    // { name: 'MEDICAL & HEALTH LOANS', link: '/Nexus-Finance/Business-loans/Medical-&-health-loans' },
    // { name: 'ATO TAX DEBT LOANS', link: '/Nexus-Finance/Business-loans/Ato-tax-debt-loans' },
    // { name: 'DEBTOR & INVOICE FINANCE', link: '/Nexus-Finance/Business-loans/Debtor-&-invoice-finance' },
    // { name: 'TRADE FINANCE', link: '/Nexus-Finance/Business-loans/Trade-finance' },
    // { name: 'START-UP BUSINESS LOANS', link: '/Nexus-Finance/Business-loans/Start-up-business-loans'} 

    
  ];

  const propertyFinance = [
    { name: 'LOAN AGAINST PROPERTY', link: 'Nexus-Finance/Property-Finance/Loan-against-property' },
    
  ];

  const assetFINANCEItems = [
     {name:'BUSINESS VEHICLE LOANS', link: 'Nexus-Finance/Asset-Finance/Business-vehicle-loans'},
     {name:'SOLAR EQUIPMENT FINANCE', link: 'Nexus-Finance/Asset-Finance/Solar-equipment-finance'}
  ];

  const blogItems = [];
  
  const ContactItem = [
    {name:'CALL US',  path: 'tel:1300054351'},
    {name:'EMAIL US', path: 'mailto:enquiries@Nexusfinance.com.au'},
    {
      name: 'BOOK CONSULTATION',
      path: '/#call-us-form',
      newTab: false,
    },
  
  ] 

  const ExploreUs = [
    {name:'ABOUT US',  link: '/About-us'},
    {name:'BLOG', link: '/Blog'},
    
  ] 

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? isDarkMode 
          ? 'bg-gray-900/98 backdrop-blur-lg shadow-xl border-b border-gray-700' 
          : 'bg-white/98 backdrop-blur-lg shadow-xl border-b border-blue-100/50'
        : isDarkMode
          ? 'bg-gray-900/95 backdrop-blur-md'
          : 'bg-white/95 backdrop-blur-md'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 ">
          {/* Logo with NexusFinance Text */}
          <div className="flex items-center space-x-0 group">
            <Link to="/" className="group-hover:scale-105 transition-transform duration-300">
              <img 
                src={logo} 
                alt="Nexus Finance Logo" 
                className="w-[200px] object-contain"
              />
            </Link>
            {/* <span className={`text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 bg-clip-text text-transparent mr-2`}>
              NexusFinance
            </span> */}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-4">
            {/* About Us */}
            <Link
              to="/About-us"
              className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium text-sm transition-all duration-300 hover:scale-105 relative`}
            >
              <span>ABOUT US</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nexus-gradient transition-all duration-300 group-hover:w-full"></span>
            </Link>

{/* <div className="relative group"> */}
  {/* About-us button */}
  {/* <Link
    to="/About-us"
    className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium text-sm transition-all duration-300 hover:scale-105 relative`}
  >
    <span>ABOUT</span>
    
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nexus-gradient transition-all duration-300 group-hover:w-full"></span>
  </Link>

  
</div> */}

            {/* Business Loans Dropdown */}
            <div className="relative group">
  <button 
    className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium text-sm transition-all duration-300 hover:scale-105 relative`}
    onClick={() => handleDropdownToggle('business')}
  >
    <span>BUSINESS LOANS</span>
    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nexus-gradient transition-all duration-300 group-hover:w-full"></span>
  </button>

  <div className={`absolute top-full left-0 mt-3 w-96 max-h-[80vh] overflow-y-auto ${isDarkMode ? 'bg-gray-800/80 border-gray-600' : 'bg-white/80 border-green-100'}  backdrop-blur-md rounded-2xl shadow-2xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-4 group-hover:translate-y-0`}>
    <div className="p-8">
      {/* <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center`}>
        <div className="w-2 h-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mr-3"></div>
        Business Loans
      </h3> */}
      <div className="space-y-2">
      {businessLoansItems.map((item, index) => (
  item.link && item.link !== "#" ? (
    <Link
      key={index}
      to={item.link}
      className={`block p-4 rounded-xl ${isDarkMode ? 'hover:bg-gray-700/50 border-gray-600' : 'hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 border-green-100'} transition-all duration-300 group/item border border-transparent hover:border-opacity-100`}
    >
      <div className={`font-semibold ${isDarkMode ? 'text-white group-hover/item:text-green-400' : 'text-gray-800 group-hover/item:text-green-600'} transition-colors duration-300`}>{item.name}</div>
    </Link>
  ) : (
    <div
      key={index}
      className={`block p-4 rounded-xl cursor-not-allowed opacity-50 ${isDarkMode ? 'border-gray-600' : 'border-green-100'} border`}
    >
      <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{item.name}</div>
    </div>
  )
))}

      </div>
    </div>
  </div>
</div>


 



            {/* Property Finance  Dropdown */}
            <div className="relative group">
              <button 
                className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium text-sm transition-all duration-300 hover:scale-105 relative`}
                onClick={() => handleDropdownToggle('vehicle')}
              >
                <span>PROPERTY FINANCE</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nexus-gradient transition-all duration-300 group-hover:w-full"></span>
              </button>
              <div className={`absolute top-full left-0 mt-3 w-96 ${isDarkMode ? 'bg-gray-800/80 border-gray-600' : 'bg-white/80 border-purple-100'} backdrop-blur-md rounded-2xl shadow-2xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-4 group-hover:translate-y-0`}>
                <div className="p-8">
                  {/* <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center`}>
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mr-3"></div>
                    Vehicle & Equipment
                  </h3> */}
                  <div className="space-y-2">
                    {propertyFinance.map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className={`block p-4 rounded-xl ${isDarkMode ? 'hover:bg-gray-700/50 border-gray-600' : 'hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 border-purple-100'} transition-all duration-300 group/item border border-transparent hover:border-opacity-100`}
                      >
                        <div className={`font-semibold ${isDarkMode ? 'text-white group-hover/item:text-purple-400' : 'text-gray-800 group-hover/item:text-purple-600'} transition-colors duration-300`}>{item.name}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Assets finance Dropdown */}
 <div className="relative group">
  <button 
    className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium text-sm transition-all duration-300 hover:scale-105 relative`}
    onClick={() => handleDropdownToggle('business')}
  >
    <span>ASSET FINANCE</span>
    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nexus-gradient transition-all duration-300 group-hover:w-full"></span>
  </button>

  <div className={`absolute top-full left-0 mt-3 w-96 max-h-[80vh] overflow-y-auto ${isDarkMode ? 'bg-gray-800/80 border-gray-600' : 'bg-white/80 border-green-100'}  backdrop-blur-md rounded-2xl shadow-2xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-4 group-hover:translate-y-0`}>
    <div className="p-8">
    <div className="space-y-2">
  {assetFINANCEItems.map((item, index) => (
    <Link
      key={index}
      to={item.link || "#"}
      className={`block p-4 rounded-xl ${
        isDarkMode
          ? "hover:bg-gray-700/50 border-gray-600"
          : "hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 border-green-100"
      } transition-all duration-300 group/item border border-transparent hover:border-opacity-100`}
    >
      <div
        className={`font-semibold ${
          isDarkMode
            ? "text-white group-hover/item:text-green-400"
            : "text-gray-800 group-hover/item:text-green-600"
        } transition-colors duration-300`}
      >
        {item.name}
      </div>
    </Link>
  ))}
</div>
    </div>
  </div>
</div>

  {/* Blog Dropdown */}

  {/* <div className="relative group"> */}
  {/* Blog button */}
  {/* <Link
    to="/Blog"
    className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium text-sm transition-all duration-300 hover:scale-105 relative`}
  >
    <span>BLOG</span>
    
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nexus-gradient transition-all duration-300 group-hover:w-full"></span>
  </Link>

  
</div> */}
<div className="relative group">
<Link to="/Partner-with-us"
             className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium text-sm transition-all duration-300 hover:scale-105 relative`}
             >
  
    <span >PARTNER WITH US</span>
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nexus-gradient transition-all duration-300 group-hover:w-full"></span>
  
  </Link>
          </div>

{/* Blog Link */}
<Link
  to="/Blog"
  className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium text-sm transition-all duration-300 hover:scale-105 relative`}
>
  <span>BLOG</span>
  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nexus-gradient transition-all duration-300 group-hover:w-full"></span>
</Link>


{/* Contact Dropdown */}
<div className="relative group">
  {/* Contact button */}
  <button
    className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium text-sm transition-all duration-300 hover:scale-105 relative`}
  >
    <span>CONTACT</span>
    {/* Assuming ChevronDown is an imported icon component */}
    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nexus-gradient transition-all duration-300 group-hover:w-full"></span>
  </button>

  {/* Dropdown */}
  <div
    className={`absolute top-full left-0 mt-3 w-48 max-h-[80vh] overflow-y-auto ${
      isDarkMode ? 'bg-gray-800/80 border-gray-600' : 'bg-white/80 border-green-100'
    } backdrop-blur-md rounded-2xl shadow-2xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-4 group-hover:translate-y-0`}
  >
    <div className="p-4">
      <div className="space-y-2">
        {ContactItem.map((item, index) => {
          // Check if it's a smooth scroll link (starts with #)
          const isSmoothScroll = item.path.startsWith('#');
          // Check if it's an external link or explicitly marked for a new tab
          const isExternalOrNewTab = item.path.startsWith('http') || item.path.startsWith('mailto:') || item.path.startsWith('tel:') || item.newTab;

          const className = `block p-2 rounded-xl ${
            isDarkMode
              ? 'hover:bg-gray-700/50 border-gray-600'
              : 'hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 border-green-100'
          } transition-all duration-300 group/item border border-transparent hover:border-opacity-100`;

          if (isSmoothScroll) {
            // Smooth scroll for sections (using <a> tag)
            return (
              <a
                key={index}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.querySelector(item.path);
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={className}
              >
                <div
                  className={`font-semibold ${
                    isDarkMode
                      ? 'text-white group-hover/item:text-green-400'
                      : 'text-gray-800 group-hover/item:text-green-600'
                  } transition-colors duration-300`}
                >
                  {item.name}
                </div>
              </a>
            );
          } else if (isExternalOrNewTab) {
            // External links (using <a> tag) - opens in new tab
            return (
              <a
                key={index}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                <div
                  className={`font-semibold ${
                    isDarkMode
                      ? 'text-white group-hover/item:text-green-400'
                      : 'text-gray-800 group-hover/item:text-green-600'
                  } transition-colors duration-300`}
                >
                  {item.name}
                </div>
              </a>
            );
          } else {
            // Internal routes (using React Router <Link> component)
            return (
              <Link
                key={index}
                to={item.path}
                className={className}
              >
                <div
                  className={`font-semibold ${
                    isDarkMode
                      ? 'text-white group-hover/item:text-green-400'
                      : 'text-gray-800 group-hover/item:text-green-600'
                  } transition-colors duration-300`}
                >
                  {item.name}
                </div>
              </Link>
            );
          }
        })}
      </div>
    </div>
  </div>
</div>


          


            {/* <a href="#calculator" className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium transition-all duration-300 hover:scale-105 relative group`}>
              Calculator
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nexus-gradient transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#about" className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium transition-all duration-300 hover:scale-105 relative group`}>
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nexus-gradient transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#contact" className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium transition-all duration-300 hover:scale-105 relative group`}>
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nexus-gradient transition-all duration-300 group-hover:w-full"></span>
            </a> */}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
           
            
           
          </div>
          
  
          {/* Phone Number */}
          <div className="hidden lg:flex items-center space-x-3">
              <a
                href="tel:1300054351"
                className="flex items-center gap-3 group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                  <div className={`relative p-3 rounded-full ${isDarkMode ? 'bg-green-600' : 'bg-green-500'} group-hover:scale-110 transition-transform duration-300`}>
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    9370439566
                  </span>
                 
                </div>
              </a>

                  {/* Book Consultation Button */}
                  <a
                      href="/#call-us-form"
                  className="bg-nexus-gradient text-white px-4 py-2 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold relative overflow-hidden group inline-flex items-center justify-center mt-4"
                  >
                      <span className="relative z-10">Book Consultation</span>
                      <div className="absolute inset-0 bg-nexus-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
              </div>
          
          {/* Mobile Menu Button - Now inside flex container for right alignment */}
          <div className="flex items-center space-x-2 xl:hidden">
            {/* <button
              onClick={toggleTheme}
              aria-label='theme'
              className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
              } transition-all duration-300`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button> */}
            <button
              className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors duration-200`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
              </div>

        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`flex flex-col xl:hidden ${isDarkMode ? 'bg-gray-800/98 border-gray-700' : 'bg-white/98 border-gray-200'} backdrop-blur-lg border-t rounded-b-2xl shadow-xl`}>

            <div className="px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* <Link to="/"    onClick={() => setIsMenuOpen(false)} className={`block ${isDarkMode ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'} font-medium py-3 px-4 rounded-lg transition-all duration-200`}>
                HOME
              </Link> */}
              
              {/* Mobile About Us */}
              <Link
                to="/About-us"
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full text-left ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
                 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              } font-medium py-3 px-4 rounded-lg transition-all duration-200`}
              >
                ABOUT US
              </Link>
              {/* <div className="relative group">
  
  <Link
    to="/About-us"
    className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium text-sm transition-all duration-300 hover:scale-105 relative`}
  >
    <span>ABOUT</span>
    
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nexus-gradient transition-all duration-300 group-hover:w-full"></span>
  </Link>

  
</div> */}

              {/* Mobile Business Loans */}
              <div>
                <button
                  className={`flex items-center justify-between w-full ${isDarkMode ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-green-50'} font-medium py-3 px-4 rounded-lg transition-all duration-200`}
                  onClick={() => handleDropdownToggle('mobile-business-loans')}
                >
                  <span>BUSSINESS LOANS</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'mobile-business-loans' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'mobile-business-loans' && (
                  <div className="pl-4 mt-2 space-y-2 max-h-64 overflow-y-auto">
                    {businessLoansItems.map((item, index) => (
                      <Link key={index} to={item.link}  onClick={() => setIsMenuOpen(false)} className={`block text-sm ${isDarkMode ? 'text-gray-400 hover:text-green-400 hover:bg-gray-700' : 'text-gray-600 hover:text-green-600 hover:bg-green-50'} py-2 px-3 rounded-lg transition-all duration-200`}>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Vehicle & Equipment */}
              {/* <div>
                <button 
                  className={`flex items-center justify-between w-full ${isDarkMode ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-purple-50'} font-medium py-3 px-4 rounded-lg transition-all duration-200`}
                  onClick={() => handleDropdownToggle('mobile-vehicle')}
                >
                  <span>Vehicle & Equipment</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'mobile-vehicle' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'mobile-vehicle' && (
                  <div className="pl-4 mt-2 space-y-2 max-h-64 overflow-y-auto">
                    {propertyFinance.map((item, index) => (
                      <a key={index} href="#" className={`block text-sm ${isDarkMode ? 'text-gray-400 hover:text-purple-400 hover:bg-gray-700' : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'} py-2 px-3 rounded-lg transition-all duration-200`}>
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div> */}

               {/*Property finance Loans */}
               <div>
  <button
    className={`flex items-center justify-between w-full ${
      isDarkMode
        ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
        : 'text-gray-700 hover:text-blue-600 hover:bg-green-50'
    } font-medium py-3 px-4 rounded-lg transition-all duration-200`}
    onClick={() => handleDropdownToggle('mobile-property-finance')}
  >
    <span>PROPERTY FINANCE</span>
    <ChevronDown
      className={`w-4 h-4 transition-transform duration-200 ${
        activeDropdown === 'mobile-property-finance' ? 'rotate-180' : ''
      }`}
    />
  </button>

  {activeDropdown === 'mobile-property-finance' && (
    <div className="pl-4 mt-2 space-y-2 max-h-64 overflow-y-auto">
      {propertyFinance.map((item, index) => (
        <Link
          key={index}
          to={item.link || "#"}
          onClick={() => setIsMenuOpen(false)}
          className={`block text-sm ${
            isDarkMode
              ? 'text-gray-400 hover:text-green-400 hover:bg-gray-700'
              : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
          } py-2 px-3 rounded-lg transition-all duration-200`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  )}
</div>

               {/* Mobile Asset Finance */}
<div>
  <button
    className={`flex items-center justify-between w-full ${
      isDarkMode
        ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
        : 'text-gray-700 hover:text-blue-600 hover:bg-green-50'
    } font-medium py-3 px-4 rounded-lg transition-all duration-200`}
    onClick={() => handleDropdownToggle('mobile-asset-finance')}
  >
    <span>ASSET FINANCE</span>
    <ChevronDown
      className={`w-4 h-4 transition-transform duration-200 ${
        activeDropdown === 'mobile-asset-finance' ? 'rotate-180' : ''
      }`}
    />
  </button>

  {activeDropdown === 'mobile-asset-finance' && (
    <div className="pl-4 mt-2 space-y-2 max-h-64 overflow-y-auto">
      {assetFINANCEItems.map((item, index) => (
        <Link
          key={index}
          to={item.link || "#"}
          onClick={() => setIsMenuOpen(false)}
          className={`block text-sm ${
            isDarkMode
              ? 'text-gray-400 hover:text-green-400 hover:bg-gray-700'
              : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
          } py-2 px-3 rounded-lg transition-all duration-200`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  )}
</div>
               

               {/* Blog Page */}
                {/* Mobile Blog */}
                   {/* <Link
                    to="/Blog"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block w-full text-left ${
                      isDarkMode
                        ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  } font-medium py-3 px-4 rounded-lg transition-all duration-200`}
                  >
                    BLOG
                  </Link> */}
                  
<Link
                    to="/Partner-with-us"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block w-full text-left ${
                      isDarkMode
                        ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  } font-medium py-3 px-4 rounded-lg transition-all duration-200`}
                  >
                    PARTNER WITH US
                  </Link>

              {/* Mobile Blog */}
              <Link
                to="/Blog"
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full text-left ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              } font-medium py-3 px-4 rounded-lg transition-all duration-200`}
              >
                BLOG
              </Link>

               
               {/* Mobile Contact */}
               <div>
  <button 
    className={`flex items-center justify-between w-full ${isDarkMode ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-green-50'} font-medium py-3 px-4 rounded-lg transition-all duration-200`}
    onClick={() => handleDropdownToggle('mobile-business')}
  >
    <span>CONTACT</span>
    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'mobile-business' ? 'rotate-180' : ''}`} />
  </button>

  {activeDropdown === 'mobile-business' && (
    <div className="pl-4 mt-2 space-y-2 max-h-64 overflow-y-auto">
      {ContactItem.map((item, index) => {
        
        // Determine link type
        const isSmoothScroll = item.path.startsWith('#');
        const isExternalHttp = item.path.startsWith('http');
        const isSpecialLink = item.path.startsWith('tel:') || item.path.startsWith('mailto:');
        const isInternalRoute = !isSmoothScroll && !isExternalHttp && !isSpecialLink;

        // Base properties for all links
        const className = `block text-sm ${isDarkMode ? 'text-gray-400 hover:text-green-400 hover:bg-gray-700' : 'text-gray-600 hover:text-green-600 hover:bg-green-50'} py-2 px-3 rounded-lg transition-all duration-200`;

        if (isSmoothScroll) {
          // Smooth scroll for section links
          return (
            <a
              key={index}
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                const section = document.querySelector(item.path);
                section?.scrollIntoView({ behavior: 'smooth' });
                // Optional: Close mobile menu after clicking
                // handleDropdownToggle(null); 
              }}
              className={className}
            >
              {item.name}
            </a>
          );
        } else if (isInternalRoute) {
          // Normal internal navigation (requires React Router's Link)
          return (
            <Link
              key={index}
              to={item.path}
              className={className}
            >
              {item.name}
            </Link>
          );
        } else {
          // All other links: http(s), tel:, mailto:
          return (
            <a
              key={index}
              href={item.path}
              // ONLY apply target="_blank" and rel for standard HTTP/HTTPS links
              {...(isExternalHttp && { target: '_blank', rel: 'noopener noreferrer' })}
              className={className}
            >
              {item.name}
            </a>
          );
        }
      })}
    </div>
  )}
</div>





              {/* <a href="#calculator" className={`block ${isDarkMode ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'} font-medium py-3 px-4 rounded-lg transition-all duration-200`}>
                Calculator
              </a>
              <a href="#about" className={`block ${isDarkMode ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'} font-medium py-3 px-4 rounded-lg transition-all duration-200`}>
                About
              </a>
              <a href="#contact" className={`block ${isDarkMode ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'} font-medium py-3 px-4 rounded-lg transition-all duration-200`}>
                Contact
              </a> */}
              
              <div className={`pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                {/* <div className={`flex items-center space-x-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4 px-4`}>
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-bold">9370439566</div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Call us today</div>
                  </div>
                </div> */}
                

                
                <div className="py-6 flex justify-center border-t border-gray-300 dark:border-gray-700">
                  <a
                    href="tel:1300054351"
                    className={`flex items-center text-lg font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}
                  >
                    <Phone className="w-6 h-6 mr-2 text-green-500" />
                    9370439566
                  </a>
                </div>
                <div className="flex justify-center gap-4">
                  
                  <a
  href="/#call-us-form" 
  className="bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white px-4 py-2 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold relative overflow-hidden group inline-flex items-center justify-center"
>
  <span className="relative z-10">Book Consultation</span>
  <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</a>
                  
                  {/* <Link to="/Partner-with-us" className="flex-1">
                    <button className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white py-4 rounded-xl hover:shadow-lg transition-all duration-200 font-semibold">
                      Partner with us
                    </button>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        )}
    
      
    </header>
  );
};

export default Header;