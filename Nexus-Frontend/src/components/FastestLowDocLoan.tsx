import { useTheme } from '../contexts/ThemeContext';
import { 
  Zap, 
  Landmark, 
  Timer, 
  ShieldCheck, 
  BarChart3, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

// Define the content data based exactly on the user's input
const lowDocFeatures = [
  {
    icon: Zap,
    title: 'Quick Access to Funds',
    description: 'Our fastest business loan solutions help n businesses secure capital quickly, so you can focus on growth.',
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    icon: Landmark,
    title: 'Tailored Low Doc Loans',
    description: 'Specifically designed for small and medium businesses across , minimizing paperwork while maximizing convenience.',
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Timer,
    title: 'Fast Approval Process',
    description: 'Experience one of the fastest business loan approvals in , giving your business the funds it needs without delays.',
    iconColor: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: ShieldCheck,
    title: 'Flexible Options',
    description: 'From startups to established companies, our low doc business loans provide flexible terms to suit your business needs nationwide.',
    iconColor: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
  },
  {
    icon: BarChart3,
    title: 'Nationwide Support',
    description: 'Our expert team assists businesses across , offering guidance, advice, and fast loan solutions for all financial needs.',
    iconColor: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
  },
];

const LowDocBusinessLoanSection = () => {
  const { isDarkMode } = useTheme();

  return (
    <section id="low-doc-loans" className={`py-20 overflow-hidden relative ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      
      {/* Background Shapes for modern aesthetic */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* --- Part 1: Fastest Low Doc Business Loans (Hero Style Header) --- */}
        <div className="text-center mb-16 max-w-5xl mx-auto">
        <h3 className="text-4xl sm:text-5xl font-bold mb-4 font-sans">
              <span className="text-gradient-nexus">
              Get Fastest Low Doc Business Loans
              </span>{" "}
               in  Today
            </h3>
          {/* <h2 className={`text-6xl font-extrabold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">Get Fastest</span> Low Doc Business Loans in  Today
          </h2> */}
          <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Quick Access to Funds: Our fastest business loan solutions help n businesses secure capital quickly, so you can focus on growth.
          </p>
        </div>

        {/* Feature Grid - Sleek, borderless cards with shadow/hover effects */}
        <div className="flex flex-wrap justify-center gap-8">
  {lowDocFeatures.map((feature, index) => (
    <div 
      key={index} 
      // 1. Added cursor-pointer and onClick event
      onClick={() => {
        const contactForm = document.getElementById('call-us-form');
        if (contactForm) {
          contactForm.scrollIntoView({ behavior: 'smooth' });
        }
      }}
      className={`p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group
        w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] min-w-[320px]
        ${isDarkMode 
          ? 'bg-gray-800 border border-gray-700 hover:border-blue-500/50 shadow-2xl hover:bg-gray-750' 
          : 'bg-white border border-gray-100 hover:border-blue-200 shadow-lg shadow-gray-200/50 hover:bg-blue-50/30'
        }
      `}
    
    >
      {/* Modern Icon Style: Soft Square with subtle glow */}
      {/* Icon Container */}
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 
        ${feature.bgColor} ${feature.iconColor} transition-transform duration-300 group-hover:scale-110`}
      >
        <feature.icon strokeWidth={1.5} size={28} />
      </div>
      
      {/* Title */}
      <h3 className={`text-xl font-bold mb-3 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {feature.title}
      </h3>
      
      {/* Description */}
      <p className={`leading-relaxed text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {feature.description}
      </p>
      
      {/* Subtle "Learn More" link adds professionalism */}
      {/* <div className={`mt-6 flex items-center text-xs font-bold uppercase tracking-wider ${feature.iconColor} cursor-pointer hover:opacity-80`}>
        Check Eligibility <ArrowRight size={14} className="ml-2" />
      </div> */}
    </div>
  ))}
</div>

        {/* --- Separator and CTA prompt (using subtle animated circle) --- */}
        <div className="text-center my-20">
          {/* <div className={`w-12 h-12 rounded-full border-4 ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200'} mx-auto flex items-center justify-center animate-bounce-slow`}>
            <ArrowRight className={`w-6 h-6 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          </div> */}
        </div>

        {/* --- Part 2: Unsecured Business Broker Loan (High-Contrast Block) --- */}
        <div className="max-w-4xl mx-auto text-center">
          <div className={`rounded-[30px] p-12 shadow-2xl transition-all duration-500 relative overflow-hidden 
            bg-gradient-to-br from-indigo-700 to-purple-800 text-white`}
          >
            {/* Background pattern/overlay for tech feel */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-color-indigo-400)_0%,_var(--tw-color-purple-900)_100%)]"></div>
            
            <div className="relative z-10">
              <div className={`w-20 h-20 mx-auto mb-6 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20`}>
                <BookOpen className="w-10 h-10 text-white" />
              </div>

              <h3 className={`text-4xl font-extrabold mb-6`}>
                Unsecured Business Broker Loan for n Businesses
              </h3>
              
              <p className={`text-lg mb-8 leading-relaxed text-indigo-100`}>
                At Nexus Finance, we provide n businesses with trusted Unsecured Business Broker Loan for n Businesses. Our expert team helps companies access fast and reliable funding through our business broker loan services, specializing in tailored unsecured business loan  options. With minimal paperwork, flexible terms, and a client-focused approach, we make securing finance simple, stress-free, and efficient
              </p>

              {/* CTA Button - High contrast, glowing effect */}
              {/* <button className={`bg-white text-indigo-700 px-10 py-4 rounded-xl hover:shadow-white/50 hover:shadow-xl transition-all duration-300 font-bold text-lg relative overflow-hidden transform hover:scale-[1.05]`}

              onClick={() => {
                const contactForm = document.getElementById('call-us-form');
                if (contactForm) {
                  contactForm.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              >
                
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Talk to a Broker Today</span>
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LowDocBusinessLoanSection;

// NOTE: You will need to add the following utility classes to your CSS or Tailwind config if they are not already defined:
/* // For subtle background animation
.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

// For bounce animation (can use standard Tailwind if available, or this)
.animate-bounce-slow {
    animation: bounce 3s infinite;
}
*/