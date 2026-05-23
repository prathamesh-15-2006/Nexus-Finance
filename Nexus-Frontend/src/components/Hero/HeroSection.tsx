// import React, { useState } from 'react';
// import { useTheme } from '../../contexts/ThemeContext';
// import { ArrowRight, Shield, Clock, Award, TrendingUp, Users, DollarSign, CheckCircle, Star, Home, Building, Car, Calculator, Phone, Mail } from 'lucide-react';

// const HeroSection: React.FC = () => {
//   const { isDarkMode } = useTheme();
//   const [formData, setFormData] = useState({
//     loanType: '',
//     loanAmount: '',
//     name: '',
//     email: '',
//     phone: '',
//     message: ''
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     alert('Thank you! We will contact you within 24 hours to discuss your finance needs.');
//   };

//   return (
//     <section id="home" className={`relative min-h-screen flex items-center overflow-hidden pt-20 ${
//       isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-green-50'
//     }`}>
//       {/* Animated Background */}
//       <div className="absolute inset-0">
//         {/* Floating Finance Icons */}
//         <div className="absolute top-32 left-20 animate-float">
//           <div className={`w-16 h-16 ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'} rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm`}>
//             <DollarSign className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
//           </div>
//         </div>
//         <div className="absolute top-40 right-32 animate-float-delayed">
//           <div className={`w-12 h-12 ${isDarkMode ? 'bg-green-900/30' : 'bg-green-100'} rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm`}>
//             <TrendingUp className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
//           </div>
//         </div>
//         <div className="absolute bottom-40 left-32 animate-float-slow">
//           <div className={`w-14 h-14 ${isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100'} rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm`}>
//             <Shield className={`w-7 h-7 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
//           </div>
//         </div>
        
//         {/* Gradient Orbs */}
//         <div className={`absolute top-20 left-10 w-72 h-72 ${isDarkMode ? 'bg-gradient-to-r from-blue-900/20 to-green-900/20' : 'bg-gradient-to-r from-blue-200/30 to-green-200/30'} rounded-full blur-3xl animate-pulse`}></div>
//         <div className={`absolute bottom-20 right-10 w-96 h-96 ${isDarkMode ? 'bg-gradient-to-r from-green-900/15 to-blue-900/15' : 'bg-gradient-to-r from-green-200/20 to-blue-200/20'} rounded-full blur-3xl animate-pulse-slow`}></div>
//         <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 ${isDarkMode ? 'bg-gradient-to-r from-blue-800/20 to-green-800/20' : 'bg-gradient-to-r from-blue-100/40 to-green-100/40'} rounded-full blur-2xl animate-pulse-delayed`}></div>
//       </div>

//       <div className="container mx-auto px-4 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-16 items-center">
//           <div className="space-y-8 animate-fade-in-up">
//             <div className="space-y-6">
//               <div className={`inline-flex items-center ${isDarkMode ? 'bg-gradient-to-r from-blue-900/50 to-green-900/50 border-blue-700' : 'bg-gradient-to-r from-blue-100 to-green-100 border-blue-200'} px-6 py-3 rounded-full border backdrop-blur-sm`}>
//                 <Star className="w-5 h-5 text-yellow-500 mr-2" />
//                 <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>'s Trusted Finance Specialists</span>
//               </div>
              
//               <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
//                 <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>Your Finance</span>
//                 <br />
//                 <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 bg-clip-text text-transparent animate-gradient">
//                   Journey
//                 </span>
//                 <br />
//                 <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>Starts</span>
//                 <span className="bg-gradient-to-r from-green-600 via-blue-700 to-blue-600 bg-clip-text text-transparent animate-gradient ml-3">
//                   Here
//                 </span>
//               </h1>
              
//               <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed max-w-2xl`}>
//                 Nexusinance is your trusted n mortgage and finance advisory service. We help individuals, 
//                 families, and businesses achieve their property and financial goals with expert guidance and tailored solutions.
//               </p>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white px-10 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 font-semibold text-lg relative overflow-hidden group">
//                 <span className="relative z-10">Get Started Today</span>
//                 <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
//                 <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               </button>
//               <button className={`border-2 ${isDarkMode ? 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900' : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'} px-10 py-4 rounded-xl transition-all duration-300 font-semibold text-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2`}>
//                 <Phone className="w-5 h-5" />
//                 <span>9370439566</span>
//               </button>
//             </div>

//             {/* Trust Indicators */}
//             <div className="grid grid-cols-4 gap-6 pt-8">
//               <div className="text-center group cursor-pointer">
//                 <div className={`${isDarkMode ? 'bg-gradient-to-r from-blue-800/50 to-blue-700/50' : 'bg-gradient-to-r from-blue-100 to-blue-200'} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl backdrop-blur-sm`}>
//                   <Home className={`w-10 h-10 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
//                 </div>
//                 <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Home Loans</p>
//                 <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>First Home & Investment</p>
//               </div>
//               <div className="text-center group cursor-pointer">
//                 <div className={`${isDarkMode ? 'bg-gradient-to-r from-green-800/50 to-green-700/50' : 'bg-gradient-to-r from-green-100 to-green-200'} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl backdrop-blur-sm`}>
//                   <Building className={`w-10 h-10 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
//                 </div>
//                 <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Business Loans</p>
//                 <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>SME & Commercial</p>
//               </div>
//               <div className="text-center group cursor-pointer">
//                 <div className={`${isDarkMode ? 'bg-gradient-to-r from-purple-800/50 to-purple-700/50' : 'bg-gradient-to-r from-purple-100 to-purple-200'} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl backdrop-blur-sm`}>
//                   <Car className={`w-10 h-10 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
//                 </div>
//                 <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Asset Finance</p>
//                 <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Vehicles & Equipment</p>
//               </div>
//               <div className="text-center group cursor-pointer">
//                 <div className={`${isDarkMode ? 'bg-gradient-to-r from-orange-800/50 to-orange-700/50' : 'bg-gradient-to-r from-orange-100 to-orange-200'} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl backdrop-blur-sm`}>
//                   <Users className={`w-10 h-10 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
//                 </div>
//                 <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Expert Team</p>
//                 <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>20+Lenders</p>
//               </div>
//             </div>
//           </div>

//           <div className="relative animate-fade-in-right">
//             <div className={`${isDarkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-100'} backdrop-blur-xl rounded-3xl shadow-2xl p-10 border relative overflow-hidden`}>
//               {/* Form Background Animation */}
//               <div className={`absolute top-0 right-0 w-32 h-32 ${isDarkMode ? 'bg-gradient-to-br from-blue-800/30 to-green-800/30' : 'bg-gradient-to-br from-blue-100 to-green-100'} rounded-full blur-2xl opacity-50`}></div>
//               <div className={`absolute bottom-0 left-0 w-24 h-24 ${isDarkMode ? 'bg-gradient-to-tr from-green-800/30 to-blue-800/30' : 'bg-gradient-to-tr from-green-100 to-blue-100'} rounded-full blur-xl opacity-50`}></div>
              
//               <div className="text-center mb-8 relative z-10">
//                 <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-3`}>Book Your Free Consultation</h3>
//                 <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Expert advice tailored to your needs</p>
//               </div>
              
//               <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
//                 <div>
//                   <label className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Loan Type *</label>
//                   <select 
//                     name="loanType"
//                     value={formData.loanType}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-4 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white focus:ring-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 hover:border-blue-300`}
//                     required
//                   >
//                     <option value="">Select loan type</option>
//                     <option value="home-loan">Home Loan</option>
//                     <option value="refinancing">Refinancing</option>
//                     <option value="investment-property">Investment Property</option>
//                     <option value="business-loan">Business Loan</option>
//                     <option value="equipment-finance">Equipment Finance</option>
//                     <option value="vehicle-finance">Vehicle Finance</option>
//                     <option value="construction-loan">Construction Loan</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <label className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Loan Amount</label>
//                   <input
//                     type="text"
//                     name="loanAmount"
//                     value={formData.loanAmount}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-4 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white focus:ring-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 hover:border-blue-300`}
//                     placeholder="e.g. $500,000"
//                   />
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Full Name *</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-4 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white focus:ring-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 hover:border-blue-300`}
//                       placeholder="Your name"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Phone *</label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-4 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white focus:ring-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 hover:border-blue-300`}
//                       placeholder="0400 000 000"
//                       required
//                     />
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Email *</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-4 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white focus:ring-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 hover:border-blue-300`}
//                     placeholder="your@email.com"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Message</label>
//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     rows={3}
//                     className={`w-full px-4 py-4 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white focus:ring-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 hover:border-blue-300`}
//                     placeholder="Tell us about your finance needs..."
//                   />
//                 </div>
                
//                 <button 
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-green-600 via-green-700 to-blue-600 text-white py-5 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold text-lg relative overflow-hidden group"
//                 >
//                   <span className="relative z-10 flex items-center justify-center space-x-2">
//                     <span>Book Free Consultation</span>
//                     <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//                   </span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-green-700 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </button>
//               </form>
//             </div>
            
//             {/* Stats Section */}
//             <div className="grid grid-cols-3 gap-6 mt-10">
//               <div className={`${isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-100'} backdrop-blur-sm rounded-2xl p-6 text-center border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
//                 <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">40+</div>
//                 <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-medium`}>Lenders</div>
//               </div>
//               <div className={`${isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-100'} backdrop-blur-sm rounded-2xl p-6 text-center border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
//                 <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Fast</div>
//                 <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-medium`}>Pre-Approval</div>
//               </div>
//               <div className={`${isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-100'} backdrop-blur-sm rounded-2xl p-6 text-center border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
//                 <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Free</div>
//                 <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-medium`}>Consultation</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;