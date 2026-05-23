import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeStore, themes } from '../../store/themeStore'; 
import { LockOpen } from 'lucide-react'; // Icon for reset password

export default function ResetPassword() {
  const navigate = useNavigate();
  const { themeColor } = useThemeStore(); 
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const primaryColor = themes[themeColor];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); // Clear previous message
    setIsSuccess(false);

    // Simulate API call for sending reset link
    setTimeout(() => {
      // In a real application, you'd send the email here.
      if (email) {
        setIsSuccess(true);
        setMessage(`Password reset link sent to ${email}. Please check your inbox.`);
        // Optionally, redirect after a few seconds
        // setTimeout(() => navigate('/login'), 5000);
      } else {
        setIsSuccess(false);
        setMessage('Please enter a valid email address.');
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 border border-gray-200 rounded-xl shadow-lg">
          
          {/* Logo/Header Section - Uses Theme Color */}
          <div className="flex flex-col items-center mb-6">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-2xl mb-3" 
              style={{ backgroundColor: primaryColor }}
            >
              Z
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">
              Reset Your Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email address to receive a password reset link.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Status Message (Success/Error) */}
            {message && (
              <div 
                className={`p-3 text-sm font-medium rounded-md border ${isSuccess ? 'text-green-700 bg-green-100 border-green-200' : 'text-red-700 bg-red-100 border-red-200'}`}
              >
                {message}
              </div>
            )}
            
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm"
                style={{ 
                  '--tw-ring-color': primaryColor, // Custom ring color for focus
                  '--tw-ring-offset-color': '#fff'
                }}
                disabled={loading || isSuccess} // Disable after submission or while loading
              />
            </div>

            {/* Submit Button - Uses Theme Color */}
            <div>
              <button
                type="submit"
                disabled={loading || isSuccess}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white transition duration-150 ease-in-out hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white"
                style={{ backgroundColor: primaryColor, '--tw-ring-color': primaryColor }}
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <LockOpen className="w-5 h-5 mr-2" />
                    Send Reset Link
                  </>
                )}
              </button>
            </div>
          </form>
          
          {/* Footer Link: Back to Login */}
          <div className="mt-6 text-center">
            <a 
              href="#" 
              onClick={() => navigate('/login')} // Use navigate to go back to the login route
              className="font-medium text-sm hover:underline" 
              style={{ color: primaryColor }}
            >
              ← Back to Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}