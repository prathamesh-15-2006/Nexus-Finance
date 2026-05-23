import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Star, ExternalLink, Store, Users, Truck, Factory, ShoppingBag, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InteractiveCard } from './ui/InteractiveCard';

const Testimonials = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  
  // Loan calculator state variables
  const [loanAmount, setLoanAmount] = useState<number>(50000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTerm, setLoanTerm] = useState<number>(60);
  const [establishmentFee, setEstablishmentFee] = useState<number>(2);

  const googleReviewsUrl = "https://www.google.com/search?q=Nexus+finance+autralia&rlz=1C1VDKB_enIN1105IN1105&oq=Nexus+finance+autralia&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQIRgVMgcIAhAhGI8CMgcIAxAhGI8C0gEJNTEwNWowajE1qAIIsAIB8QWoI5dGfA2chg&sourceid=chrome&ie=UTF-8#lrd=0x6b12a3a12a1c9b59:0x7d1c883481ba71e2,1,,,,";

  const testimonials = [
    {
      name: 'Toni Enriquez',
      role: 'Small Business Owner',
      content: 'Exceptional service and guidance from Nexus Finance! Working with Prathamesh, the Director at Nexus Finance, was an outstanding experience from start to finish.',
      rating: 5,
      icon: Store,
      businessType: 'Retail',
      location: 'Sydney, NSW'
    },
    {
      name: 'Roli Aggarwal',
      role: 'HR Bridge',
      content: 'Incredible experience with Nexus Finance! We urgently needed $80,000 to cover upcoming payroll and keep operations smooth. Within just 12 hours, the funds were in our account—no delays, no confusion.',
      rating: 5,
      icon: Users,
      businessType: 'Consulting',
      location: 'Melbourne, VIC'
    },
    {
      name: 'Baljinder Kaur',
      role: 'Transport Business Owner',
      content: 'Urgent unsecured business loan secured in 12 hours with favorable terms. The team understood our industry challenges and provided tailored solutions.',
      rating: 5,
      icon: Truck,
      businessType: 'Transport',
      location: 'Brisbane, QLD'
    },
    {
      name: 'Sam Rajput',
      role: 'Logistics Company Director',
      content: 'I had an excellent experience with Nexus Finance and would like to especially thank Prathamesh Gupta for his outstanding service and industry expertise.',
      rating: 5,
      icon: Factory,
      businessType: 'Manufacturing',
      location: 'Perth, WA'
    },
    {
      name: 'Sarah Johnson',
      role: 'Restaurant Owner',
      content: 'Nexus Finance helped us expand our restaurant chain with flexible financing options. Their understanding of hospitality industry needs was impressive.',
      rating: 5,
      icon: ShoppingBag,
      businessType: 'Hospitality',
      location: 'Adelaide, SA'
    },
    {
      name: 'Michael Chen',
      role: 'Property Developer',
      content: 'Professional and efficient service for our property development project. Quick approval process and competitive rates exceeded our expectations.',
      rating: 5,
      icon: Home,
      businessType: 'Real Estate',
      location: 'Gold Coast, QLD'
    }
  ];

  const handleReviewClick = () => {
    window.open( '_blank');
  };

  return (
    <>
      <style>{`
        @keyframes scroll-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .animate-scroll-right {
          animation: scroll-right 10s linear infinite;
        }
      `}</style>
    <section
      className={`py-20 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-blue-50 via-white to-pink-50'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-10 text-center">
              <span className="">
             Client Success Stories              </span>
            </h2>
          {/* <p
            className={`text-xl max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Explore how n businesses have relied on our expertise to secure financing and achieve long-term success.
          </p> */}
        </div>

        <div className="relative max-w-7xl mx-auto overflow-hidden group">
          <div className="flex animate-scroll-right group-hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((testimonial, index) => {
              const IconComponent = testimonial.icon;
              return (
                <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4">
                  <div
                    onClick={handleReviewClick}
                    className={`h-full rounded-[48px] p-6 border-none transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer group/card ${
                      isDarkMode
                        ? 'bg-gray-800'
                        : 'bg-white hover:shadow-blue-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`p-3 rounded-full mr-3 ${
                          isDarkMode ? 'bg-indigo-900' : 'bg-blue-100'
                        }`}>
                          <IconComponent className={`w-6 h-6 ${
                            isDarkMode ? 'text-indigo-400' : 'text-blue-600'
                          }`} />
                        </div>
                        <div>
                          <h4
                            className={`font-bold text-lg ${
                              isDarkMode ? 'text-white' : 'text-gray-800'
                            }`}
                          >
                            {testimonial.name}
                          </h4>
                          <p
                            className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}
                          >
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <ExternalLink className={`w-5 h-5 opacity-0 group-hover/card:opacity-100 transition-opacity ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                    </div>

                    <div className="flex items-center mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            isDarkMode ? 'text-yellow-400' : 'text-yellow-400'
                          } fill-current`}
                        />
                      ))}
                      <span className={`ml-2 text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {testimonial.businessType} • {testimonial.location}
                      </span>
                    </div>

                    <p
                      className={`leading-relaxed italic mb-4 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      "{testimonial.content}"
                    </p>

                    <div className="border-t pt-4">
                      <p
                        className={`text-xs ${
                          isDarkMode ? 'text-gray-500' : 'text-gray-500'
                        }`}
                      >
                        Click to read more reviews on Google
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      
      </div>
    </section>
    </>
  );
};

export default Testimonials;
