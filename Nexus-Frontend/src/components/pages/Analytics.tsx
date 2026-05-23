import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Target, Award, Eye } from 'lucide-react';
import { fetchAllLeads, fetchTotalVisitors, fetchDailyVisitors, fetchWeeklyVisitors, fetchMonthlyVisitors, fetchYearlyVisitors, Lead } from '../../services/api';
import { useThemeStore, themes } from '../../store/themeStore';
import { useTheme } from '../../contexts/ThemeContext'; // Import theme context
import { useState, useEffect, useMemo } from 'react';

export default function Analytics() {
  const { themeColor } = useThemeStore();
  const { isDarkMode } = useTheme(); // Use theme context for dark mode
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalVisitors, setTotalVisitors] = useState<number>(0);
  const [dailyVisitors, setDailyVisitors] = useState<number>(0);
  const [weeklyVisitors, setWeeklyVisitors] = useState<number>(0);
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(0);
  const [yearlyVisitors, setYearlyVisitors] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [leadsData, totalVisitorsData, dailyVisitorsData, weeklyVisitorsData, monthlyVisitorsData, yearlyVisitorsData] = await Promise.all([
          fetchAllLeads(),
          fetchTotalVisitors(),
          fetchDailyVisitors(),
          fetchWeeklyVisitors(),
          fetchMonthlyVisitors(),
          fetchYearlyVisitors()
        ]);
        setLeads(leadsData);
        setTotalVisitors(totalVisitorsData);
        setDailyVisitors(dailyVisitorsData);
        setWeeklyVisitors(weeklyVisitorsData);
        setMonthlyVisitors(monthlyVisitorsData);
        setYearlyVisitors(yearlyVisitorsData);
      } catch (error) {
        console.error('Failed to load analytics data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Calculate real-time data for charts
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

  const salesRepPerformanceData = useMemo(() => {
    const repStats: Record<string, { assigned: number; closed: number; pending: number }> = {};

    leads.forEach((lead) => {
      const rep = lead.assignedRep || 'Unassigned';
      if (!repStats[rep]) {
        repStats[rep] = { assigned: 0, closed: 0, pending: 0 };
      }
      repStats[rep].assigned += 1;
      if (lead.status === 'Referred') {
        repStats[rep].closed += 1;
      } else if (['Contacted', 'Qualified', 'Proposal', 'Negotiation'].includes(lead.status)) {
        repStats[rep].pending += 1;
      }
    });

    return Object.entries(repStats).map(([name, stats]) => ({
      name,
      assigned: stats.assigned,
      closed: stats.closed,
      pending: stats.pending,
    }));
  }, [leads]);

  const totalLeads = leads.length;
  const avgLeadScore = leads.length > 0 ? (leads.reduce((sum: number, lead: Lead) => sum + lead.leadScore, 0) / leads.length).toFixed(1) : '0.0';
  const closedWonCount = leads.filter((l: Lead) => l.status === 'Referred').length;
  const conversionRate = totalLeads > 0 ? ((closedWonCount / totalLeads) * 100).toFixed(1) : '0.0';

  // Calculate best source
  const bestSource = useMemo(() => {
    const sourceStats = leadsBySourceData.reduce((acc, source) => {
      acc[source.name] = source.value;
      return acc;
    }, {} as Record<string, number>);

    const total = Object.values(sourceStats).reduce((sum, count) => sum + count, 0);
    const best = Object.entries(sourceStats).reduce((best, [name, count]) => {
      return count > best.count ? { name, count } : best;
    }, { name: 'N/A', count: 0 });

    const percentage = total > 0 ? ((best.count / total) * 100).toFixed(0) : '0';
    return { name: best.name, percentage };
  }, [leadsBySourceData]);

  const insights = [
    {
      title: 'Total Visitors',
      value: totalVisitors,
      icon: Eye,
      color: '#3b82f6',
      trend: 'Website traffic',
    },
    {
      title: 'Daily Visitors',
      value: dailyVisitors,
      icon: Eye,
      color: '#8b5cf6',
      trend: 'Today\'s traffic',
    },
    {
      title: 'Weekly Visitors',
      value: weeklyVisitors,
      icon: Eye,
      color: '#10b981',
      trend: 'This week\'s traffic',
    },
    {
      title: 'Monthly Visitors',
      value: monthlyVisitors,
      icon: Eye,
      color: '#f59e0b',
      trend: 'This month\'s traffic',
    },
    {
      title: 'Yearly Visitors',
      value: yearlyVisitors,
      icon: Eye,
      color: '#ef4444',
      trend: 'This year\'s traffic',
    },
    {
      title: 'Total Leads',
      value: totalLeads,
      icon: Users,
      color: themes[themeColor],
      trend: '+12.5% from last month',
    },
    {
      title: 'Avg Lead Score',
      value: avgLeadScore,
      icon: Award,
      color: '#10b981',
      trend: '+5.3 points increase',
    },
    {
      title: 'Conversion Rate',
      value: `${conversionRate}%`,
      icon: Target,
      color: '#f59e0b',
      trend: '+3.1% improvement',
    },
    {
      title: 'Best Source',
      value: bestSource.name,
      icon: TrendingUp,
      color: '#8b5cf6',
      trend: `${bestSource.percentage}% of all leads`,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className={`mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Analytics & Reports</h1>
        <p className={`text-gray-600 mt-1 ${isDarkMode ? 'text-gray-400' : ''}`}>Comprehensive insights into your lead performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight) => {
          const IconComponent = insight.icon;
          return (
            <div key={insight.title} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 shadow-sm border`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${insight.color}15` }}>
                  <IconComponent className="w-6 h-6" style={{ color: insight.color }} />
                </div>
              </div>
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{insight.title}</p>
                <p className={`text-3xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{insight.value}</p>
                <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{insight.trend}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 shadow-sm border`}>
          <div className="mb-6">
            <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Monthly Leads Trend</h2>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Track lead generation over time</p>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={monthlyLeadsData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#f0f0f0"} />
              <XAxis dataKey="month" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} fontSize={12} />
              <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? '#374151' : '#fff',
                  border: `1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  color: isDarkMode ? '#f9fafb' : '#111827'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="leads" stroke={themes[themeColor]} strokeWidth={3} name="Total Leads" dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={3} name="Conversions" dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 shadow-sm border`}>
          <div className="mb-6">
            <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Leads by Source</h2>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Distribution of lead sources</p>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={leadsBySourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={110}
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

      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 shadow-sm border`}>
        <div className="mb-6">
          <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sales Rep Performance</h2>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Compare performance across your sales team</p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={salesRepPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#f0f0f0"} />
            <XAxis dataKey="name" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} fontSize={12} />
            <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? '#374151' : '#fff',
                border: `1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'}`,
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                color: isDarkMode ? '#f9fafb' : '#111827'
              }}
            />
            <Legend />
            <Bar dataKey="assigned" fill={themes[themeColor]} name="Assigned Leads" radius={[8, 8, 0, 0]} />
            <Bar dataKey="closed" fill="#10b981" name="Closed Deals" radius={[8, 8, 0, 0]} />
            <Bar dataKey="pending" fill="#f59e0b" name="Pending Follow-ups" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 shadow-sm border`}>
          <div className="mb-4">
            <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Lead Status Breakdown</h2>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Current status distribution</p>
          </div>
          <div className="space-y-3">
            {['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'].map(status => {
              const count = leads.filter((l: Lead) => l.status === status).length;
              const percentage = totalLeads > 0 ? ((count / totalLeads) * 100).toFixed(0) : '0';
              return (
                <div key={status}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{status}</span>
                    <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{count} ({percentage}%)</span>
                  </div>
                  <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor:
                          status === 'Closed Won' ? '#10b981' :
                          status === 'Closed Lost' ? '#ef4444' :
                          themes[themeColor]
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 shadow-sm border`}>
          <div className="mb-4">
            <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Key Insights</h2>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>AI-powered recommendations</p>
          </div>
          <div className="space-y-4">
            <div className={`p-4 ${isDarkMode ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-200'} rounded-lg border`}>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div className="ml-3">
                  <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>High Lead Quality</h3>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Website leads show 23% higher conversion rate. Focus marketing efforts here.</p>
                </div>
              </div>
            </div>

            <div className={`p-4 ${isDarkMode ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-200'} rounded-lg border`}>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div className="ml-3">
                  <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Top Performer</h3>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Emma Rodriguez has the highest success rate at 76.2%. Share best practices with team.</p>
                </div>
              </div>
            </div>

            <div className={`p-4 ${isDarkMode ? 'bg-yellow-900 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} rounded-lg border`}>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div className="ml-3">
                  <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Follow-up Opportunity</h3>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>22 leads pending follow-up. Immediate action can improve conversion by 15%.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
