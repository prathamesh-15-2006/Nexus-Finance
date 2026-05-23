import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
const Calculator = lazy(() => import('./components/Calculator'));
const About = lazy(() => import('./components/About'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const FastestLowDoc = lazy(() => import('./components/FastestLowDocLoan.tsx'));
import FooterSection from './components/FooterSection';
import Hero from './components/Hero';
import Header from './components/Header';
import { useTheme } from './contexts/ThemeContext';
import FrontPage from './components/Business-loan/line-credit/front.jsx';
import BusinessOverdraftPage from './components/Business-loan/overdraft/BusinessOverdraftPage.jsx';
import Unsecured from './components/Business-loan/unsecured-loan/Unsecured.jsx';
import BusinessLoans from './components/Business-loan/BusinessLoans.jsx';
import Sameer from './components/Property-finance/Sammer.jsx';
import LowDoc from './components/Business-loan/low-doc/LowDoc.jsx';
import Specialist from '../src/components/Business-loan/Medical and health loand/Speacialist.jsx';
import Tax from '../src/components/Business-loan/ATO TAX DEBT LOANS/Tax.jsx';
import Vehical from '../src/components/Asset Finane/Vehicle Loans/Vehical.jsx';
import Finance from '../src/components/Business-loan/Debtor and finance/Finance.jsx';
import Trade from '../src/components/Business-loan/Trade finance/Trade.jsx';
import Startup from './components/Business-loan/Start-up/Startup.jsx'; // Importing Startup component
import AssetFinance from './components/Asset Finane/AssetFinance.jsx';
import Solar from '../src/components/Asset Finane/solar/Front.jsx';
import Contact from '../src/components/Contact-Us/Form.jsx';
import Blog from '../src/components/Contact-Us/Blog.jsx';
import CommercialFinance from "../src/components/Contact-Us/CommricialFinance.jsx";
import Blog2 from "../src/components/Contact-Us/Blogs2.jsx";
import Blog3 from "../src/components/Contact-Us/Blog3.jsx";
import Blogs4 from "../src/components/Contact-Us/Blogs4.jsx";
import Blogs5 from "../src/components/Contact-Us/Blogs5.jsx";
import Blog6 from "../src/components/Contact-Us/Blog6.jsx";
import Patner from './components/PatnerWithUs/Patner.tsx';
import ClientDeal from './components/PatnerWithUs/client-deal.tsx';
import ApplicationForm from './components/ApplicationForm';
import PrivacyPolicy from './components/Footer-Terms/Privacy-Policy';
import PrivacyNonDisclosure from './components/Footer-Terms/Privacy-Non-disclosure';
import TermsOfService from './components/Footer-Terms/Terms-of-Service';
import CreditGuide from './components/Footer-Terms/Credit-Guide';
import CalculatorUI from './components/CalculatorUI';
import Team from './components/Team.tsx';
import Services from './components/Services.tsx';
import CompanyTransparency from './components/CompanyTransparency.tsx';
import WhychooseUs from './components/WhychooseUs.tsx';
import Process from './components/Process.tsx';
// import ComplaintsPolicy from './components/Footer-Terms/Complaints-Policy';

// Admin dashboard routes

import Layout from './components/login/Layout.tsx';
import Dashboard from './components/pages/Dashboard.tsx';
import Leads from './components/pages/Leads.tsx';
import Analytics from './components/pages/Analytics.tsx';
import SalesTeam from './components/pages/SalesTeam.tsx';
import Settings from './components/pages/Settings.tsx';
import Profile from './components/pages/Profile.tsx';
import EmailTemplates from './components/pages/EmailTemplates.tsx';
import SalesEmailTemplates from './components/pages/SalesEmailTemplates.tsx';
import Login from './components/login/LoginForm.tsx';
import ProtectedRoute from './components/login/ProtectedRoute.tsx'; // Import ProtectedRoute
// import ResetPasswordForm from './Nexus-CRM/components/ResetForm.tsx';
import { HelmetProvider } from "react-helmet-async";


function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  // Scroll to top on page load and route change
  useEffect(() => {
    // If there's a hash in the URL, scroll to that element instead of top
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure components are rendered
    } else {
      // Only scroll to top if there's no hash
      window.scrollTo(0, 0);
    }
  }, [location]);

  const muiTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#2563eb', // blue-600
      },
      secondary: {
        main: '#059669', // emerald-600
      },
      background: {
        default: isDarkMode ? '#111827' : '#f9fafb', // gray-900 : gray-50
        paper: isDarkMode ? '#1f2937' : '#ffffff', // gray-800 : white
      },
      text: {
        primary: isDarkMode ? '#f9fafb' : '#111827', // gray-50 : gray-900
        secondary: isDarkMode ? '#d1d5db' : '#6b7280', // gray-300 : gray-500
      },
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
            },
          },
        },
      },
    },
  });

  const isAdminRoute = location.pathname.startsWith('/Nexus-crm-admin');

  return (
    <HelmetProvider>
      <MuiThemeProvider theme={muiTheme}>
        <div className={`min-h-screen transition-colors duration-500 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50`}>
         {/* <FinanceCursor /> */}
          {!isAdminRoute && <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}
          <Routes>
            <Route path="/" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Hero isDarkMode={isDarkMode} />
                <CalculatorUI isDarkMode={isDarkMode} />
                <Services isDarkMode={isDarkMode} />
                <WhychooseUs isDarkMode={isDarkMode} />
                <Process isDarkMode={isDarkMode} />

                <Testimonials />
                <Team isDarkMode={isDarkMode} />
                <CompanyTransparency isDarkMode={isDarkMode} />
              </Suspense>
            } />
            <Route path="/About-us" element={
              <Suspense fallback={<div>Loading...</div>}>
                <About isDarkMode={isDarkMode} />
              </Suspense>
            } />
            <Route path="/Nexus-Finance/Business-loans" element={<BusinessLoans />} />
           <Route path="/Nexus-Finance/Business-loans/Unsecured-business-loans" element={<Unsecured />} />
            <Route path="/Nexus-Finance/Business-loans/Business-line-of-credit" element={<FrontPage />} />
            <Route path="/Nexus-Finance/Business-loans/Business-overdraft" element={<BusinessOverdraftPage />} />
            <Route path="Nexus-Finance/Property-Finance/Loan-against-property" element={<Sameer />} />
            <Route path="/Nexus-Finance/Business-loans/Low-doc-business-loans" element={<LowDoc />} />
            <Route path="/Nexus-Finance/Business-loans/Debtor-&-invoice-finance" element={<Finance/>} />
            <Route path="/Nexus-Finance/Business-loans/Medical-&-health-loans" element={<Specialist />} />
            <Route path="/Nexus-Finance/Business-loans/Ato-tax-debt-loans" element={<Tax />} />
            <Route path="Nexus-Finance/Asset-Finance/Business-vehicle-loans" element={<Vehical/>} />
            <Route path="/Nexus-Finance/Business-loans/Trade-finance" element={<Trade />} />
            <Route path="/Nexus-Finance/Business-loans/Start-up-business-loans" element={<Startup />} />
            <Route path="/Nexus-Finance/Asset-Finance" element={<AssetFinance />} />
            <Route path="Nexus-Finance/Asset-Finance/Solar-equipment-finance" element={<Solar />} />
            <Route path="/Blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Blog/Commercial-Finance" element={<CommercialFinance />} />
            <Route path="/Blog/Secure-Bussiness-Loan" element={<Blog2 />} />
            <Route path="/Blog/Asset-Finance" element={<Blog3 />} />
            <Route path="/Blog/APR-Matters" element={<Blogs5 />} />
            <Route path="/Partner-With-Us" element={<Patner />} />
            <Route path="/Client-Deals" element={<ClientDeal />} />
            <Route path="/apply" element={<ApplicationForm />} />
            <Route path="/Blog/Understanding-Business-Credit-Scores" element={<Blog6 />} />
           
            <Route path="/calculator" element={<Calculator />} />

            {/* Routes for Blog Keywords */}
            <Route path="/Nexus-Finance/Business-loans/multi-lender-solutions" element={<BusinessLoans />} />
            <Route path="/Nexus-Finance/Business-loans/unsecured-business-loans" element={<Unsecured />} />
            <Route path="/Nexus-Finance/Business-loans/private-lender-business-loans" element={<BusinessLoans />} />
            <Route path="/Nexus-Finance/Business-loans/low-doc-sme-lending" element={<LowDoc />} />
            <Route path="/Nexus-Finance/Business-loans/long-term-business-loans" element={<BusinessLoans />} />
            <Route path="/Nexus-Finance/Asset-Finance/equipment-finance" element={<AssetFinance />} />
            <Route path="/Nexus-Finance/Business-loans/commercial-expansion-lending" element={<BusinessLoans />} />
            <Route path="/Nexus-Finance/Refinance/business-loan-consolidation" element={<BusinessLoans />} />
            <Route path="/Nexus-Finance/Refinance/business-loan-refinance" element={<BusinessLoans />} />

            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/privacy-non-disclosure" element={<PrivacyNonDisclosure />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/credit-guide" element={<CreditGuide />} />
            {/* <Route path="/complaints-policy" element={<ComplaintsPolicy />} /> */}

            {/* Admin Pannel Crm Routes */}

             {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/reset-password/:token" element={<ResetPasswordForm />} /> */}

        {/* Protected Routes: Everything else requires login */}
        {/* We use ProtectedRoute as the wrapper */}
        <Route element={<ProtectedRoute />}>
          <Route path="/Nexus-crm-admin" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="leads" element={<Leads />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="team" element={<SalesTeam />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="email-templates" element={<EmailTemplates />} />
            <Route path="sales-email-templates" element={<SalesEmailTemplates />} />
          </Route>
        </Route>
        
        {/* Optional: Add a catch-all route for 404 handling */}
        <Route path="*" element={<div>404 Not Found</div>} />

          </Routes>
          {!isAdminRoute && <FooterSection />}
        </div>
      </MuiThemeProvider>
    </HelmetProvider>
  );
}

export default App;
