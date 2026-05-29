// LoginForm.tsx (Updated)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useTheme } from '../../contexts/ThemeContext'; // Import theme context
import { useAuthStore } from '../../store/authStore'; // Import auth store
import { loginAdmin, forgotPassword, fetchAdminProfile } from '../../services/api';
import { LogIn, Mail, X, Eye, EyeOff } from 'lucide-react';
import logo from '../../asset/logo/Nexus-logo.png'; // Import the logo

export default function Login() {
  const navigate = useNavigate(); // Initialize navigate hook
  const login = useAuthStore((state) => state.login); // Get the login function
  const { isDarkMode } = useTheme(); // Use theme context for dark mode
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // State for login error
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  // State for Forgot Password Modal
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  const primaryColor = '#2563eb'; // Default primary color

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous error

    try {
      const data = await loginAdmin({ email, password });
      console.log('Login successful!');
      // Store the authentication token
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // Fetch admin profile to get avatar
      let avatar = undefined;
      try {
        const profile = await fetchAdminProfile();
        avatar = profile.avatar;
      } catch (profileError) {
        console.warn('Failed to fetch admin profile:', profileError);
        // Continue with login even if profile fetch fails
      }
      // Update auth state with user data including avatar
      login({
        name: data.user?.name || 'Admin User',
        email: data.user?.email || email,
        avatar: avatar,
      });

      // Redirect to admin dashboard route configured in App.jsx
      navigate('/Nexus-admin');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsForgotModalOpen(true);
    // Reset states when opening
    setError('');
    setForgotError('');
    setForgotSuccess('');
    setForgotEmail('');
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotError('');
    setForgotSuccess('');

    try {
      const response = await forgotPassword(forgotEmail);
      setForgotSuccess(response.message || 'If an account with that email exists, a password reset link has been sent.');
    } catch (err: any) {
      setForgotError(err.message || 'An unexpected error occurred.');
    } finally {
      setForgotLoading(false);
    }
  };
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="w-full max-w-md">
        <div className={`p-8 border rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>

          {/* Logo/Header Section */}
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="CRM Pro Logo" className="w-16 h-16 mb-4" />
            <h2 className={`text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Sign in to CRM Pro
            </h2>
            <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Enter your credentials to continue
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Error Message */}
            {error && (
              <div className={`p-3 text-sm font-medium rounded-md border ${isDarkMode ? 'text-red-400 bg-red-900 border-red-800' : 'text-red-700 bg-red-100 border-red-200'}`}>
                {error}
              </div>
            )}

            {/* Email Input */}
            <div>
              <label htmlFor="email" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
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
                className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'border-gray-300'}`}
                style={{
                  '--tw-ring-color': primaryColor,
                  '--tw-ring-offset-color': isDarkMode ? '#374151' : '#fff'
                } as React.CSSProperties}
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm pr-10 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'border-gray-300'}`}
                  style={{
                    '--tw-ring-color': primaryColor,
                    '--tw-ring-offset-color': isDarkMode ? '#374151' : '#fff'
                  } as React.CSSProperties}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <div className="text-sm">
                  <a href="#" onClick={handleForgotPasswordClick} className={`font-medium hover:underline`} style={{ color: primaryColor }}>
                    Forgot password?
                  </a>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white transition duration-150 ease-in-out hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white"
                style={{ backgroundColor: primaryColor, '--tw-ring-color': primaryColor } as React.CSSProperties}
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign in
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer Link */}
         
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-xl shadow-lg w-full max-w-md p-8 relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <button
              onClick={() => setIsForgotModalOpen(false)}
              className={`absolute top-4 right-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-800'}`}
            >
              <X size={24} />
            </button>

            <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Reset Password</h3>
            <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Enter your email address and we'll send you a link to reset your password.</p>

            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              {forgotError && (
                <div className={`p-3 text-sm font-medium rounded-md border ${isDarkMode ? 'text-red-400 bg-red-900 border-red-800' : 'text-red-700 bg-red-100 border-red-200'}`}>
                  {forgotError}
                </div>
              )}
              {forgotSuccess && (
                <div className={`p-3 text-sm font-medium rounded-md border ${isDarkMode ? 'text-green-400 bg-green-900 border-green-800' : 'text-green-700 bg-green-100 border-green-200'}`}>
                  {forgotSuccess}
                </div>
              )}

              {!forgotSuccess && (
                <>
                  <div>
                    <label htmlFor="forgot-email" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email address
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      </span>
                      <input
                        id="forgot-email"
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        required
                        className={`appearance-none block w-full px-3 py-2 pl-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'border-gray-300'}`}
                        style={{ '--tw-ring-color': primaryColor, '--tw-ring-offset-color': isDarkMode ? '#374151' : '#fff' } as React.CSSProperties}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={forgotLoading}
                      className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white transition duration-150 ease-in-out hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white"
                      style={{ backgroundColor: primaryColor, '--tw-ring-color': primaryColor } as React.CSSProperties}
                    >
                      {forgotLoading ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        'Send Reset Link'
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}