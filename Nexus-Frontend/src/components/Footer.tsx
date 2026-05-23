// import React, { useState } from 'react';
// import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Clock, Shield, Award, Users, Calendar, User, MessageCircle } from 'lucide-react';
// import logo from '../asset/logo/3.png';

// interface FooterProps {
//   isDarkMode: boolean;
// }

// // A simple Contact Form component to be used inside the footer.
// const ContactForm = () => {
//   // Use state to manage form data
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     message: '',
//   });

//   // Handle input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // In a real application, you would send this data to a backend API.
//     // For now, we'll just log it to the console.
//     console.log('Form submitted:', formData);
//     // You could also show a success message here and reset the form.
//     setFormData({
//       name: '',
//       email: '',
//       phone: '',
//       message: '',
//     });
//   };

//   return (
//     <div className="space-y-6">
//       <h4 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h4>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Name Input */}
//         <div className="relative">
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Your Name"
//             className="w-full bg-gray-900/50 text-white rounded-xl p-4 pl-12 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400"
//             required
//           />
//           <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//         </div>

//         {/* Email Input */}
//         <div className="relative">
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Your Email"
//             className="w-full bg-gray-900/50 text-white rounded-xl p-4 pl-12 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 placeholder-gray-400"
//             required
//           />
//           <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//         </div>

//         {/* Phone Input */}
//         <div className="relative">
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="Your Phone Number"
//             className="w-full bg-gray-900/50 text-white rounded-xl p-4 pl-12 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-400"
//             required
//           />
//           <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//         </div>

//         {/* Message Textarea */}
//         <div className="relative">
//           <textarea
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             placeholder="How can we help you?"
//             rows={4}
//             className="w-full bg-gray-900/50 text-white rounded-xl p-4 pl-12 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 placeholder-gray-400"
//             required
//           />
//           <MessageCircle className="absolute left-4 top-5 text-gray-400" size={20} />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
//         >
//           Send Message
//         </button>
//       </form>
//     </div>
//   );
// };

// const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
//   const homeLoans = [
//     'First Home Buyers', 'Home Loan Refinancing', 'Investment Property Loans', 'Construction Loans', 'SMSF Property Loans', 'Low Doc Home Loans'
//   ];

//   const businessLoans = [
//     'SME Business Loans', 'Working Capital Loans', 'Equipment Finance', 'Commercial Property Loans', 'Business Line of Credit', 'Invoice Finance'
//   ];

//   const vehicleEquipment = [
//     'Car Loans', 'Fleet Financing', 'Machinery Finance', 'Asset Finance', 'Novated Leasing', 'Agricultural Equipment'
//   ];

//   const legalLinks = [
//     'Privacy Policy', 'Terms & Conditions', 'Credit Guide', 'Financial Services Guide', 'Complaints Process', 'Responsible Lending'
//   ];

//   return (
//     <footer id="contact" className={`relative overflow-hidden ${
//       isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
//     } text-white`}>
//       {/* Background Animation */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-20 w-80 h-80 bg-green-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-pulse-delayed"></div>
//       </div>

//       <div className="container mx-auto px-4 py-20 relative z-10">
//         {/* Top Section */}
//         <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-12 mb-16">
//           {/* Company Info */}
//           <div className="lg:col-span-2 space-y-8">
//             <div className="flex items-center space-x-4 group">
//               <img 
//                 src={logo} 
//                 alt="Nexus Finance Logo" 
//                 className="w-16 h-16 rounded-2xl object-cover shadow-2xl group-hover:scale-110 transition-all duration-300"
//               />
//               <div>
//                 <span className="text-3xl font-bold">Nexus</span>
//                 <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent ml-2">Finance</span>
//               </div>
//             </div>
            
//             <p className="text-gray-300 leading-relaxed text-lg">
//               Nexus Finance is an n-based mortgage and finance advisory service committed to helping individuals, 
//               families, and businesses achieve their property and financial goals with expert guidance and tailored solutions.
//             </p>
            
//             <div className="grid grid-cols-2 gap-6">
//               <div className="flex items-center space-x-3 group">
//                 <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center group-hover:bg-blue-600/30 transition-colors duration-300">
//                   <Shield className="w-6 h-6 text-blue-400" />
//                 </div>
//                 <div>
//                   <div className="font-semibold text-white">Accredited Brokers</div>
//                   <div className="text-sm text-gray-400">Fully Licensed</div>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3 group">
//                 <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center group-hover:bg-green-600/30 transition-colors duration-300">
//                   <Clock className="w-6 h-6 text-green-400" />
//                 </div>
//                 <div>
//                   <div className="font-semibold text-white">Fast Pre-Approval</div>
//                   <div className="text-sm text-gray-400">Quick Decisions</div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex space-x-4">
//               <a href="#" className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
//                 <Facebook className="w-6 h-6" />
//               </a>
//               <a href="#" className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-400 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
//                 <Twitter className="w-6 h-6" />
//               </a>
//               <a href="#" className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
//                 <Linkedin className="w-6 h-6" />
//               </a>
//               <a href="#" className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-pink-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
//                 <Instagram className="w-6 h-6" />
//               </a>
//             </div>
//           </div>

//           {/* Home Loans */}
//           <div>
//             <h3 className="text-xl font-bold mb-8 flex items-center">
//               <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-green-400 rounded-full mr-3"></div>
//               Home Loans
//             </h3>
//             <ul className="space-y-4">
//               {homeLoans.map((link, index) => (
//                 <li key={index}>
//                   <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 transform inline-block relative group">
//                     {link}
//                     <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-green-400 transition-all duration-300 group-hover:w-full"></span>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Business Loans */}
//           <div>
//             <h3 className="text-xl font-bold mb-8 flex items-center">
//               <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mr-3"></div>
//               Business Loans
//             </h3>
//             <ul className="space-y-4">
//               {businessLoans.map((link, index) => (
//                 <li key={index}>
//                   <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 transform inline-block relative group">
//                     {link}
//                     <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Vehicle & Equipment */}
//           <div>
//             <h3 className="text-xl font-bold mb-8 flex items-center">
//               <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mr-3"></div>
//               Vehicle & Equipment
//             </h3>
//             <ul className="space-y-4">
//               {vehicleEquipment.map((link, index) => (
//                 <li key={index}>
//                   <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 transform inline-block relative group">
//                     {link}
//                     <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Contact Section - Modified to include the form */}
//         <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-3xl p-10 mb-16 border border-gray-700">
//           <div className="grid lg:grid-cols-2 gap-12">
//             {/* Contact Info on the left */}
//             <div>
//               <h3 className="text-3xl font-bold mb-8 flex items-center">
//                 <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-green-400 rounded-full mr-4"></div>
//                 Get in Touch
//               </h3>
              
//               <div className="space-y-6">
//                 <div className="flex items-center space-x-4 group">
//                   <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
//                     <Phone className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <p className="font-bold text-xl text-white">9370439566</p>
//                     <p className="text-gray-400">Call us today for expert advice</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center space-x-4 group">
//                   <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
//                     <Mail className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <p className="font-bold text-xl text-white">info@Nexusfinance.com.au</p>
//                     <p className="text-gray-400">Email us anytime - we'll respond quickly</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center space-x-4 group">
//                   <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
//                     <MapPin className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <p className="font-bold text-xl text-white">Melbourne Office</p>
//                     <p className="text-gray-400">Melbourne, VIC, </p>
//                     <p className="text-gray-400">Servicing all of </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-4 group">
//                   <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
//                     <Calendar className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <p className="font-bold text-xl text-white">Book a Consultation</p>
//                     <p className="text-gray-400">Available via website - Free consultation</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <ContactForm />
//             </div>
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
//           <div className="text-center group">
//             <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-xl">
//               <Award className="w-10 h-10 text-white" />
//             </div>
//             <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">0+</div>
//             <div className="text-gray-400 font-medium">Lenders</div>
//           </div>
//           <div className="text-center group">
//             <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-xl">
//               <Users className="w-10 h-10 text-white" />
//             </div>
//             <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Expert</div>
//             <div className="text-gray-400 font-medium">Guidance</div>
//           </div>
//           <div className="text-center group">
//             <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-xl">
//               <Clock className="w-10 h-10 text-white" />
//             </div>
//             <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Fast</div>
//             <div className="text-gray-400 font-medium">Pre-Approval</div>
//           </div>
//           <div className="text-center group">
//             <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-xl">
//               <Shield className="w-10 h-10 text-white" />
//             </div>
//             <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Ethical</div>
//             <div className="text-gray-400 font-medium">Approach</div>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="border-t border-gray-700 pt-12">
//           <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
//             <div className="flex flex-wrap justify-center lg:justify-start gap-8">
//               {legalLinks.slice(0, 4).map((link, index) => (
//                 <a key={index} href="#" className="text-gray-400 hover:text-white text-sm transition-all duration-300 relative group">
//                   {link}
//                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-green-400 transition-all duration-300 group-hover:w-full"></span>
//                 </a>
//               ))}
//             </div>
//             <div className="text-center lg:text-right">
//               <p className="text-gray-400 text-sm mb-2">
//                 © 2025 Nexus Finance. All rights reserved.
//               </p>
//               <p className="text-gray-500 text-xs">
//                 n Credit Licence (ACL) and professional finance advisory services
//               </p>
//               <p className="text-gray-500 text-xs mt-1">
//                 Nexus Finance Pty Ltd - Melbourne, VIC, 
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
