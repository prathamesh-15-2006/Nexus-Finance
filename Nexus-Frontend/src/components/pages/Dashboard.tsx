import { TrendingUp, Users, Target, DollarSign } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchAllLeads, Lead } from '../../services/api';
import { useThemeStore, themes } from '../../store/themeStore';
import { useTheme } from '../../contexts/ThemeContext'; // Import theme context
import { useState, useEffect, useMemo } from 'react';

export default function Dashboard() {
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
        console.error('Failed to load leads for dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    loadLeads();
  }, []);

  const monthlyLeadsData = useMemo(() => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const last12Months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      return {
        month: monthNames[date.getMonth()],
        year: date.getFullYear(),
        leads: 0,
        conversions: 0,
      };
    }).reverse();

    leads.forEach((lead) => {
      const createdDate = new Date(lead.createdAt);
      const monthKey = `${createdDate.getFullYear()}-${createdDate.getMonth()}`;
      const monthData = last12Months.find(m => `${m.year}-${monthNames.indexOf(m.month)}` === monthKey);
      if (monthData) {
        monthData.leads += 1;
        if (lead.status === 'Referred') {
          monthData.conversions += 1;
        }
      }
    });

    return last12Months;
  }, [leads]);

  const leadsBySourceData = useMemo(() => {
    const sourceColors: Record<string, string> = {
      'Website': '#3b82f6',
      'Referral': '#10b981',
      'Social Media': '#f59e0b',
      'Email Campaign': '#8b5cf6',
      'Cold Call': '#ef4444',
    };

    const sourceCounts: Record<string, number> = {};
    leads.forEach((lead) => {
      sourceCounts[lead.source] = (sourceCounts[lead.source] || 0) + 1;
    });

    return Object.entries(sourceCounts).map(([name, value]) => ({
      name,
      value,
      color: sourceColors[name] || '#6b7280',
    }));
  }, [leads]);

  const newLeadsThisWeek = leads.filter((lead: Lead) => {
    const createdDate = new Date(lead.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return createdDate >= weekAgo;
  }).length;

  const closedWonLeads = leads.filter((lead: Lead) => lead.status === 'Referred').length;
  const conversionRate = leads.length > 0 ? ((closedWonLeads / leads.length) * 100).toFixed(1) : '0.0';

  const totalValue = leads
    .filter((lead: Lead) => lead.status === 'Referred')
    .reduce((sum: number, lead: Lead) => sum + (lead.estimatedValue || 0), 0);

  const recentLeads = [...leads]
    .sort((a: Lead, b: Lead) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const stats = [
    {
      name: 'Total Leads',
      value: leads.length,
      icon: Users,
      color: themes[themeColor],
      change: '+12.5%',
    },
    {
      name: ' This Week',
      value: newLeadsThisWeek,
      icon: TrendingUp,
      color: '#10b981',
      change: '+8.2%',
    },
    {
      name: 'Conversion Rate',
      value: `${conversionRate}%`,
      icon: Target,
      color: '#f59e0b',
      change: '+3.1%',
    },
    {
      name: 'Revenue (Won)',
      value: `$${(totalValue / 1000).toFixed(0)}K`,
      icon: DollarSign,
      color: '#8b5cf6',
      change: '+15.3%',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Dashboard Overview</h1>
        <p className={`text-gray-600 mt-1 ${isDarkMode ? 'text-gray-400' : ''}`}>Welcome back! Here's what's happening with your leads.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.name}</p>
                <p className={`text-3xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                <p className="text-sm text-green-600 font-medium mt-2">{stat.change}</p>
              </div>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 shadow-sm border`}>
          <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Leads vs Conversions Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyLeadsData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#f0f0f0"} />
              <XAxis dataKey="month" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} fontSize={12} />
              <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? '#374151' : '#fff',
                  border: `1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  color: isDarkMode ? '#f9fafb' : '#111827'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="leads" stroke={themes[themeColor]} strokeWidth={2} name="Total Leads" />
              <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} name="Conversions" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 shadow-sm border`}>
          <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Leads by Source</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leadsBySourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {leadsBySourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border overflow-hidden`}>
        <div className={`p-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
          <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Recent Leads</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Name</th>
                <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Email</th>
                <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Source</th>
                <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Status</th>
                <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Score</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {recentLeads.map((lead) => (
                <tr key={lead.id} className={`transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{lead.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{lead.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      lead.status === 'New' ? (isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800') :
                      lead.status === 'Contacted' ? (isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800') :
                      lead.status === 'Qualified' ? (isDarkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800') :
                      lead.status === 'Referred' ? (isDarkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800') :
                      (isDarkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800')
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-semibold" style={{ color: themes[themeColor] }}>{lead.leadScore}</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
