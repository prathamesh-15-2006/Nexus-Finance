import { LogOut, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore, themes } from '../../store/themeStore';
import { useTheme } from '../../contexts/ThemeContext'; // Import theme context

export default function Profile() {
  const { user, logout } = useAuthStore();
  const { themeColor } = useThemeStore();
  const { isDarkMode } = useTheme(); // Use theme context for dark mode

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleLogout = () => {
    logout();
    // Redirect to login will be handled by ProtectedRoute
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Profile</h1>
        <p className={`text-gray-600 mt-1 ${isDarkMode ? 'text-gray-400' : ''}`}>View your account information</p>
      </div>

      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border`}>
        <div className="p-6">
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <div className={`w-24 h-24 rounded-full overflow-hidden border-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                {user?.avatar ? (
                  <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white font-semibold text-2xl" style={{ backgroundColor: themes[themeColor] }}>
                    {user ? getInitials(user.name) : 'U'}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user?.name || 'User'}</h2>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user?.email || 'user@example.com'}</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className={`w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Administrator</span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
