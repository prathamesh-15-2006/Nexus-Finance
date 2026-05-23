import { Mail, Phone, TrendingUp, CheckCircle, Clock, Users, Target } from 'lucide-react';
import { fetchAllLeads, Lead } from '../../services/api';
import { useThemeStore, themes } from '../../store/themeStore';
import { useTheme } from '../../contexts/ThemeContext'; // Import theme context
import { useState, useEffect } from 'react';

export default function SalesTeam() {
  const { themeColor } = useThemeStore();
  const { isDarkMode } = useTheme(); // Use theme context for dark mode
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const data = await fetchAllLeads();
        setLeads(data);
      } catch (error) {
        console.error('Failed to load leads for sales team:', error);
      } finally {
        setLoading(false);
      }
    };
    loadLeads();
  }, []);

  const getRepLeads = (repName: string) => {
    return leads.filter((lead: Lead) => lead.assignedRep === repName);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sales Team</h1>
        <p className={`text-gray-600 mt-1 ${isDarkMode ? 'text-gray-400' : ''}`}>Manage your sales team and track their performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className={`col-span-full text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Loading sales team data...</div>
        ) : (
          // Since we removed mock sales reps, we'll show a message or calculate from leads
          <div className={`col-span-full text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Sales team data will be integrated from API in future updates.
          </div>
        )}
      </div>

      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border overflow-hidden`}>
        <div className={`p-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
          <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Team Performance Details</h2>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Loading team performance data...</div>
          ) : (
            <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Team performance data will be integrated from API in future updates.
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className={`col-span-full text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Loading team statistics...</div>
        ) : (
          <>
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 shadow-sm border`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total Leads</h3>
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <div>
                <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{leads.length}</p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>From all sources</p>
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 shadow-sm border`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Active Leads</h3>
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div>
                <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {leads.filter((lead: Lead) => !['Referred', 'Closed Lost'].includes(lead.status)).length}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Currently in pipeline</p>
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 shadow-sm border`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Conversion Rate</h3>
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Target className="w-4 h-4 text-purple-600" />
                </div>
              </div>
              <div>
                <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {leads.length > 0 ? ((leads.filter((lead: Lead) => lead.status === 'Referred').length / leads.length) * 100).toFixed(1) : '0.0'}%
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Overall success rate</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
