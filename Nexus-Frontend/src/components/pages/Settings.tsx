import { useEffect, useState } from 'react';
import { Palette, Check, Bell, Globe, Upload, User } from 'lucide-react';
import { useThemeStore, themes, ThemeColor } from '../../store/themeStore';
import { useAuthStore } from '../../store/authStore';
import { useTheme } from '../../contexts/ThemeContext'; // Import theme context
import { fetchSettings, updateSettings, updateProfilePic, fetchAdminProfile, ThemeOption } from '../../services/api';
import type { Settings } from '../../services/api';

export default function Settings() {
  const { themeColor, setThemeColor } = useThemeStore();
  const { isDarkMode } = useTheme(); // Use theme context for dark mode
  const { user, login } = useAuthStore();
  const [apiSettings, setApiSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [dialog, setDialog] = useState<{ isOpen: boolean; message: string; title?: string }>({ isOpen: false, message: '' });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await fetchSettings();
        setApiSettings(settings);
        // Override themeColor with API value
        if (settings.themeColor && settings.themeColor !== themeColor) {
          setThemeColor(settings.themeColor as ThemeColor);
        }

        // Fetch admin profile to get existing profile picture
        const profile = await fetchAdminProfile();
        if (profile.avatar && user) {
          login({ ...user, avatar: profile.avatar });
        }
      } catch (error) {
        console.error('Failed to fetch settings or profile:', error);
        // Fallback to local theme if API fails
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleThemeChange = async (newTheme: ThemeColor) => {
    setSaving(true);
    try {
      const updatedSettings = await updateSettings({
        themeColor: newTheme,
        settings: apiSettings?.settings || { notification: true, language: 'en' },
      });
      setApiSettings({
        ...updatedSettings,
        themeOptions: apiSettings?.themeOptions || themeOptions,
      });
      setThemeColor(newTheme);
    } catch (error) {
      console.error('Failed to update theme:', error);
      // Revert on error
      setThemeColor(themeColor);
    } finally {
      setSaving(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setUploadSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setDialog({ isOpen: true, message: 'Authentication required. Please log in again.', title: 'Authentication Error' });
        return;
      }
      console.log('Selected file:', selectedFile);
      console.log('Token:', token);
      const result = await updateProfilePic(token, selectedFile);

      // Fetch updated profile to get the latest profile picture URL
      const profile = await fetchAdminProfile();

      setUploadSuccess(true);
      setSelectedFile(null);
      setPreviewUrl(null);

      // Update auth store with new avatar URL from profile API
      if (profile.avatar && user) {
        login({ ...user, avatar: profile.avatar });
      }
    } catch (error) {
      console.error('Failed to upload profile picture:', error);
      setDialog({ isOpen: true, message: 'Failed to upload profile picture. Please try again.', title: 'Upload Failed' });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading settings...</div>
      </div>
    );
  }

  const themeOptions = apiSettings?.themeOptions || [
    { name: 'Blue', color: 'blue', description: 'Professional and trustworthy' },
    { name: 'Green', color: 'green', description: 'Fresh and natural' },
    { name: 'Orange', color: 'orange', description: 'Energetic and vibrant' },
    { name: 'Red', color: 'red', description: 'Bold and passionate' },
    { name: 'Teal', color: 'teal', description: 'Modern and balanced' },
    { name: 'Pink', color: 'pink', description: 'Creative and friendly' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
        <p className={`text-gray-600 mt-1 ${isDarkMode ? 'text-gray-400' : ''}`}>Customize your CRM experience</p>
      </div>

      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border`}>
        <div className={`p-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${themes[themeColor]}15` }}>
              <Palette className="w-5 h-5" style={{ color: themes[themeColor] }} />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Theme Customization</h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Choose your preferred color theme for the dashboard</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themeOptions.map((option) => (
              <button
                key={option.color}
                onClick={() => handleThemeChange(option.color as ThemeColor)}
                className={`relative p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                  themeColor === option.color
                    ? `${isDarkMode ? 'border-gray-600' : 'border-gray-900'} shadow-md`
                    : `${isDarkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'}`
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: themes[option.color as ThemeColor] }}
                  >
                    {themeColor === option.color && (
                      <Check className="w-6 h-6 text-white" />
                    )}
                  </div>
                  {themeColor === option.color && (
                    <div className={`px-2 py-1 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-900'} text-white text-xs font-medium rounded`}>
                      Active
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{option.name}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{option.description}</p>
                </div>

                <div className="mt-4 flex space-x-2">
                  <div className="flex-1 h-2 rounded" style={{ backgroundColor: themes[option.color as ThemeColor] }}></div>
                  <div className="flex-1 h-2 rounded" style={{ backgroundColor: themes[option.color as ThemeColor], opacity: 0.7 }}></div>
                  <div className="flex-1 h-2 rounded" style={{ backgroundColor: themes[option.color as ThemeColor], opacity: 0.4 }}></div>
                </div>
              </button>
            ))}
          </div>

          {saving && (
            <div className={`mt-6 p-4 ${isDarkMode ? 'bg-yellow-900 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border rounded-lg`}>
              <div className="flex items-start space-x-3">
                <div className={`w-5 h-5 rounded-full ${isDarkMode ? 'bg-yellow-700' : 'bg-yellow-500'} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Saving Theme...</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Updating your theme preference on the server.</p>
                </div>
              </div>
            </div>
          )}
          {!saving && (
            <div className={`mt-6 p-4 ${isDarkMode ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-200'} border rounded-lg`}>
              <div className="flex items-start space-x-3">
                <div className={`w-5 h-5 rounded-full ${isDarkMode ? 'bg-blue-700' : 'bg-blue-500'} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Check className="w-3 h-3 text-white" />
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Theme Saved Successfully</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Your theme preference is saved locally and synced with the server.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border`}>
        <div className={`p-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${themes[themeColor]}15` }}>
              <User className="w-5 h-5" style={{ color: themes[themeColor] }} />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Profile Picture</h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Update your profile picture</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <div className={`w-24 h-24 rounded-full overflow-hidden border-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : user?.avatar ? (
                  <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
                    <User className={`w-8 h-8 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <label htmlFor="profile-pic" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Choose a new profile picture
                </label>
                <input
                  id="profile-pic"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className={`block w-full text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold ${isDarkMode ? 'file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600' : 'file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'}`}
                />
                <p className={`mt-1 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>PNG, JPG, GIF up to 10MB</p>
              </div>

              {selectedFile && (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Picture
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                      setUploadSuccess(false);
                    }}
                    className={`inline-flex items-center px-4 py-2 border ${isDarkMode ? 'border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'} text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {uploadSuccess && (
                <div className={`p-4 ${isDarkMode ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-200'} border rounded-lg`}>
                  <div className="flex items-start space-x-3">
                    <Check className={`w-5 h-5 rounded-full ${isDarkMode ? 'bg-green-700' : 'bg-green-500'} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Check className="w-3 h-3 text-white" />
                    </Check>
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Profile picture updated successfully!</p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Your new profile picture has been saved.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border`}>
        <div className={`p-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
          <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Preview</h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>See how your theme looks across different components</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <button
              className="px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: themes[themeColor] }}
            >
              Primary Button
            </button>
            <button className={`px-4 py-2 border-2 rounded-lg font-medium transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`} style={{ borderColor: themes[themeColor], color: themes[themeColor] }}>
              Secondary Button
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ backgroundColor: themes[themeColor] }}>
                AB
              </div>
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>User Avatar</p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>With theme color</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Progress Example</span>
              <span className="text-sm font-semibold" style={{ color: themes[themeColor] }}>75%</span>
            </div>
            <div className={`w-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2`}>
              <div className="h-2 rounded-full transition-all" style={{ width: '75%', backgroundColor: themes[themeColor] }}></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border-2" style={{ borderColor: themes[themeColor], backgroundColor: `${themes[themeColor]}10` }}>
              <p className="text-2xl font-bold" style={{ color: themes[themeColor] }}>42</p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Total Items</p>
            </div>
            <div className={`p-4 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-lg border`}>
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>18</p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Completed</p>
            </div>
          </div>
        </div>
      </div>

      {apiSettings && (
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border`}>
          <div className={`p-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${themes[themeColor]}15` }}>
                <Bell className="w-5 h-5" style={{ color: themes[themeColor] }} />
              </div>
              <div>
                <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>General Settings</h2>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage your application preferences</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className={`w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Receive notifications for important updates</p>
                </div>
              </div>
              <div className={`w-11 h-6 rounded-full transition-colors ${apiSettings.settings.notification ? 'bg-green-500' : (isDarkMode ? 'bg-gray-600' : 'bg-gray-300')}`}>
                <div className={`w-5 h-5 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-full shadow-md transform transition-transform ${apiSettings.settings.notification ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe className={`w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Language</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Select your preferred language</p>
                </div>
              </div>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} uppercase`}>{apiSettings.settings.language}</span>
            </div>
          </div>
        </div>
      )}

      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border`}>
        <div className={`p-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
          <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About</h2>
        </div>
        <div className="p-6 space-y-3">
          <div className={`flex justify-between py-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-100'} border-b`}>
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Application Name</span>
            <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>CRM Pro</span>
          </div>
          <div className={`flex justify-between py-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-100'} border-b`}>
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Version</span>
            <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>1.0.0</span>
          </div>
          <div className={`flex justify-between py-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-100'} border-b`}>
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Theme System</span>
            <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>API + Local Storage</span>
          </div>
          <div className="flex justify-between py-2">
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Current Theme</span>
            <span className="text-sm font-medium capitalize" style={{ color: themes[themeColor] }}>{themeColor}</span>
          </div>
        </div>
      </div>

      {dialog.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg shadow-xl max-w-md w-full mx-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            {dialog.title && (
              <h3 className="text-lg font-semibold mb-4">{dialog.title}</h3>
            )}
            <p className="mb-6">{dialog.message}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setDialog({ isOpen: false, message: '' })}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
