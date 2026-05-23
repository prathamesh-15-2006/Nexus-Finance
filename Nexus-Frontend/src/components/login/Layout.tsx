import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, TrendingUp, UserSquare2, Settings, Menu, X, Mail } from 'lucide-react';
import { useThemeStore, themes } from '../../store/themeStore';
import { useTheme } from '../../contexts/ThemeContext'; // Import theme context
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import logo from '../../asset/logo/Nexus-logo.png'; // Import the logo
import RefreshWarningModal from '../RefreshWarningModal';
import { useRefreshWarning } from '../../hooks/useRefreshWarning';

const navItems = [
  { name: 'Dashboard', path: '', icon: LayoutDashboard },
  { name: 'Leads', path: 'leads', icon: Users },
  { name: 'Analytics', path: 'analytics', icon: TrendingUp },
  { name: 'Sales Team', path: 'team', icon: UserSquare2 },
  { name: 'Email Templates', path: 'sales-email-templates', icon: Mail },
  { name: 'Settings', path: 'settings', icon: Settings },
];

export default function Layout() {
  const { themeColor } = useThemeStore();
  const { isDarkMode } = useTheme(); // Use theme context for dark mode
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuthStore();
  const { showWarning, confirmAction, cancelAction } = useRefreshWarning();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className={`flex items-center justify-between h-16 px-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
          <NavLink to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Logo" className="w-12 h-12 rounded-lg" />
            <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>CRM Pro</span>
          </NavLink>
          <button onClick={() => setSidebarOpen(false)} className={`lg:hidden ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === ''}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'text-white shadow-sm'
                    : isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                }`
              }
              style={({ isActive }) => isActive ? { backgroundColor: themes[themeColor] } : {}}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b h-16 flex items-center justify-between px-6`}>
          <button onClick={() => setSidebarOpen(true)} className={`lg:hidden ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex-1" />
          <NavLink to="profile" className={`flex items-center space-x-4 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} rounded-lg px-3 py-2 transition-colors`}>
            <div className="text-right hidden sm:block">
              <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user?.name || 'Admin User'}</p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user?.email || 'admin@example.com'}</p>
            </div>
            <div className={`w-10 h-10 rounded-full overflow-hidden border-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-semibold" style={{ backgroundColor: themes[themeColor] }}>
                  {user ? getInitials(user.name) : 'AU'}
                </div>
              )}
            </div>
          </NavLink>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <RefreshWarningModal
        isOpen={showWarning}
        onClose={cancelAction}
        onConfirm={confirmAction}
        title="Confirm Refresh/Close"
        message="You may have unsaved changes. Are you sure you want to refresh or close this tab?"
      />
    </div>
  );
}
