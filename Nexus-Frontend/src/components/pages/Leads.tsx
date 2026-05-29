import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Eye, Edit, Phone, X, Trash2, ChevronDown, Archive, ArchiveRestore, Calendar, Mail } from 'lucide-react';
import * as XLSX from 'xlsx';
import { fetchAllLeads, createLead, fetchLeads, updateLead, deleteLead, fetchArchivedLeads, fetchUnarchivedLeads, archiveLead, unarchiveLead, fetchDraftLeads, Lead } from '../../services/api';
import { useThemeStore, themes } from '../../store/themeStore';
import { useTheme } from '../../contexts/ThemeContext'; // Import theme context

export default function Leads() {
  const navigate = useNavigate();
  const { themeColor } = useThemeStore();
  const { isDarkMode } = useTheme();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [newlyCreatedLeadIds, setNewlyCreatedLeadIds] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('newlyCreatedLeadIds');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState<string>('all');
  const [archiveFilter, setArchiveFilter] = useState<'all' | 'archived' | 'unarchived' | 'draft'>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [showEditLeadModal, setShowEditLeadModal] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [newLeadData, setNewLeadData] = useState({
    name: '',
    email: '',
    phone: '',
    source: 'Website' as Lead['source'],
    status: 'New' as Lead['status'],
    assignedRep: '',
    leadScore: 50,
    estimatedValue: undefined as number | undefined,
    lastContact: '',
    visitedPages: [] as string[],
    remarks: '',
    type: 'manual' as string,
  });
  const [editLeadData, setEditLeadData] = useState({
    name: '',
    email: '',
    phone: '',
    source: 'Website' as Lead['source'],
    status: 'New' as Lead['status'],
    assignedRep: '',
    leadScore: 50,
    estimatedValue: undefined as number | undefined,
    lastContact: '',
    visitedPages: [] as string[],
    remarks: '',
    type: 'manual' as string,
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    lastContact: '',
  });

  const [deleteConfirmLead, setDeleteConfirmLead] = useState<Lead | null>(null);
  const [showViewMoreModal, setShowViewMoreModal] = useState(false);
  const [viewMoreLead, setViewMoreLead] = useState<Lead | null>(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showCopySuccessPopup, setShowCopySuccessPopup] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [exportFilter, setExportFilter] = useState<'all' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'quarterly' | 'custom'>('all');
  const [showCustomDateModal, setShowCustomDateModal] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const loadLeads = async () => {
    try {
      let data: Lead[];
      if (archiveFilter === 'draft') {
        data = await fetchDraftLeads();
      } else if (archiveFilter === 'archived') {
        data = await fetchArchivedLeads();
      } else if (archiveFilter === 'unarchived') {
        data = await fetchUnarchivedLeads();
      } else {
        data = await fetchAllLeads();
      }
      // Sort leads by createdAt in descending order (latest first)
      const sortedData = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setLeads(sortedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, [archiveFilter]);

  const getFilteredLeadsForExport = (filter: 'all' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'quarterly' | 'custom' = exportFilter) => {
    const now = new Date();
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    switch (filter) {
      case 'daily':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        break;
      case 'weekly':
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        startDate = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate());
        endDate = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 7);
        break;
      case 'monthly':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        break;
      case 'yearly':
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear() + 1, 0, 1);
        break;
      case 'quarterly':
        const quarterStartMonth = Math.floor(now.getMonth() / 3) * 3;
        startDate = new Date(now.getFullYear(), quarterStartMonth, 1);
        endDate = new Date(now.getFullYear(), quarterStartMonth + 3, 1);
        break;
      case 'custom':
        if (customStartDate && customEndDate) {
          startDate = new Date(customStartDate);
          endDate = new Date(customEndDate);
          endDate.setDate(endDate.getDate() + 1); // Include the end date
        }
        break;
      default:
        return filteredLeads; // 'all' case
    }

    if (startDate && endDate) {
      return filteredLeads.filter(lead => {
        const leadDate = new Date(lead.createdAt);
        return leadDate >= startDate! && leadDate < endDate!;
      });
    }

    return filteredLeads;
  };

  const exportToExcel = (filter: 'all' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'quarterly' | 'custom' = exportFilter) => {
    const leadsToExport = getFilteredLeadsForExport(filter);

    // Map leads to Excel-friendly format
    const excelData = leadsToExport.map(lead => ({
      'Lead ID': lead.id,
      'Name': lead.name,
      'Email': lead.email,
      'Phone': lead.phone,
      'Source': lead.source,
      'Status': lead.status,
      'Estimated Value': lead.estimatedValue ? `$${lead.estimatedValue.toLocaleString()}` : 'N/A',
      'Form Type': lead.formType || 'N/A',
      'Created Date': new Date(lead.createdAt).toLocaleDateString(),
      'Last Contact': lead.lastContact ? new Date(lead.lastContact).toLocaleDateString() : 'Not contacted',
      'Visited Pages': lead.visitedPages.join(', ') || 'None',
      'Remarks': lead.remarks || 'No remarks',
    }));

    // Create worksheet
    let ws;
    if (excelData.length === 0) {
      // Include headers even when no data
      const headers = [['Lead ID', 'Name', 'Email', 'Phone', 'Source', 'Status', 'Estimated Value', 'Form Type', 'Created Date', 'Last Contact', 'Visited Pages', 'Remarks']];
      ws = XLSX.utils.aoa_to_sheet(headers);
    } else {
      ws = XLSX.utils.json_to_sheet(excelData);
    }

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Leads');

    // Generate filename with filter and current date
    const filterSuffix = filter === 'all' ? '' : `_${filter}`;
    const fileName = `leads_export${filterSuffix}_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Save file
    XLSX.writeFile(wb, fileName);

    // Close dropdown and modal if open
    setShowExportDropdown(false);
    setShowCustomDateModal(false);
  };

  const filteredLeads = leads.filter(lead => {

    const matchesSearch = (lead.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterValue === 'all' || lead.status === filterValue || lead.source === filterValue;
    const leadDate = new Date(lead.createdAt);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    if (end) end.setHours(23, 59, 59, 999);
    const matchesDate = !start || !end || (leadDate >= start && leadDate <= end);
    return matchesSearch && matchesFilter && matchesDate;
  });

  const statuses = ['all', 'New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Referred'];
  const sources = ['all', 'Website', 'Referral', 'Social Media', 'Email Campaign', 'Cold Call'];
  const filterOptions = ['all', ...statuses.slice(1), ...sources.slice(1)];

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = { name: '', email: '', phone: '', lastContact: '' };
    let isValid = true;

    if (!newLeadData.name.trim()) {
      errors.name = 'Name is required.';
      isValid = false;
    }
    if (!newLeadData.email) {
      errors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(newLeadData.email)) {
      errors.email = 'Email is invalid.';
      isValid = false;
    }
    if (!newLeadData.phone) {
      errors.phone = 'Phone is required.';
      isValid = false;
    } else if (!/^\d+$/.test(newLeadData.phone)) {
      errors.phone = 'Phone number must contain only digits.';
      isValid = false;
    }

    setFormErrors(errors);
    if (!isValid) return;

    setFormLoading(true);
    setFormError(null);
    try {
      const newLead = await createLead(newLeadData);
      setLeads(prev => [newLead, ...prev]);
      setNewlyCreatedLeadIds(prev => {
        const updated = new Set(prev).add(newLead.id);
        localStorage.setItem('newlyCreatedLeadIds', JSON.stringify([...updated]));
        return updated;
      });
      setShowNewLeadModal(false);
      setNewLeadData({
        name: '',
        email: '',
        phone: '',
        source: 'Website' as Lead['source'],
        status: 'New' as Lead['status'],
        assignedRep: '',
        leadScore: 50,
        estimatedValue: undefined as number | undefined,
        lastContact: '',
        visitedPages: [] as string[],
        remarks: '',
        type: 'manual' as string,
      });
      setFormErrors({ name: '', email: '', phone: '', lastContact: '' });
      // Reload leads to ensure all data is up to date
      await loadLeads();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to create lead');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead);
    setEditLeadData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      source: lead.source,
      status: lead.status,
      assignedRep: lead.assignedRep,
      leadScore: lead.leadScore,
      estimatedValue: lead.estimatedValue,
      lastContact: lead.lastContact || '',
      visitedPages: [...lead.visitedPages],
      remarks: lead.remarks,
      type: lead.type || 'manual',
    });
    setShowEditLeadModal(true);
  };

  const handleUpdateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLead) return;

    setFormLoading(true);
    setFormError(null);
    try {
      const updatedLead = await updateLead(editingLead.id, editLeadData);
      setLeads(prev => prev.map(lead => lead.id === editingLead.id ? updatedLead : lead));
      setShowEditLeadModal(false);
      setEditingLead(null);
      setSelectedLead(null);
      // Reload leads to ensure all data is up to date
      await loadLeads();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to update lead');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteLead = async () => {
    if (!deleteConfirmLead) return;

    try {
      await deleteLead(deleteConfirmLead.id);
      setLeads(prev => prev.filter(lead => lead.id !== deleteConfirmLead.id));
      setDeleteConfirmLead(null);
      setSelectedLead(null);
      // Reload leads to ensure all data is up to date
      await loadLeads();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete lead');
    }
  };

  const handleArchiveLead = async (leadToArchive: Lead) => {
    if (!leadToArchive) return;

    try {
      await archiveLead(leadToArchive.type, leadToArchive.id);
      setSelectedLead(null);
      // Reload leads to ensure all data is up to date
      await loadLeads();
    } catch (err) {
      setError(err instanceof Error ? `Failed to archive lead: ${err.message}` : 'Failed to archive lead');
    }
  };

  const handleUnarchiveLead = async (leadToUnarchive: Lead) => {
    if (!leadToUnarchive) return;

    try {
      await unarchiveLead(leadToUnarchive.type, leadToUnarchive.id);
      setSelectedLead(null);
      // Reload leads to ensure all data is up to date
      await loadLeads();
    } catch (err) {
      setError(err instanceof Error ? `Failed to unarchive lead: ${err.message}` : 'Failed to unarchive lead');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Leads Management</h1>
          <p className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Manage and track all your leads in one place</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <button
              onClick={() => setShowExportDropdown(!showExportDropdown)}
              className="px-6 py-2.5 rounded-lg text-white font-medium hover:opacity-90 transition-opacity shadow-sm bg-green-600 hover:bg-green-700 flex items-center"
            >
              Export to Excel
              <ChevronDown className="ml-2 w-4 h-4" />
            </button>
            {showExportDropdown && (
              <div className={`absolute right-0 mt-2 w-48 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg shadow-lg z-10`}>
                {[
                  { value: 'all', label: 'All' },
                  { value: 'daily', label: 'Daily' },
                  { value: 'weekly', label: 'Weekly' },
                  { value: 'monthly', label: 'Monthly' },
                  { value: 'yearly', label: 'Yearly' },
                  { value: 'quarterly', label: 'Quarterly' },
                  { value: 'custom', label: 'Custom' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setShowExportDropdown(false);
                      if (option.value === 'custom') {
                        setShowCustomDateModal(true);
                      } else {
                        exportToExcel(option.value as any);
                      }
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900'}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => setShowNewLeadModal(true)}
            className="px-6 py-2.5 rounded-lg text-white font-medium hover:opacity-90 transition-opacity shadow-sm"
            style={{ backgroundColor: themes[themeColor] }}
          >
            + New Lead
          </button>
        </div>
      </div>

      <div className={`rounded-xl p-6 shadow-sm border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none"
              style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
            />
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className={`pl-9 pr-8 py-2.5 border rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none appearance-none ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
              >
                {filterOptions.map(option => (
                  <option key={option} value={option}>
                    {option === 'all' ? 'All Status & Sources' : option}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={archiveFilter}
                onChange={(e) => setArchiveFilter(e.target.value as 'all' | 'archived' | 'unarchived' | 'draft')}
                className={`pl-9 pr-8 py-2.5 border rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none appearance-none ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
              >
                <option value="all">All Leads</option>
                <option value="unarchived">Active Leads</option>
                <option value="archived">Archived Leads</option>
                <option value="draft">Draft Leads</option>
              </select>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Start Date"
                  className={`pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="End Date"
                  className={`pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading leads...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No leads found matching your criteria.
            </div>
          ) : (
            <table className="w-full">
              <thead className={`border-y ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Lead</th>
                  <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Contact</th>
                  <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Source</th>
                  <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Form Type</th>
                  <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Type</th>
                  <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Status</th>
                  <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {filteredLeads.map((lead, index) => (
                  <tr key={`${lead.id}-${lead.source}-${lead.createdAt}-${index}`} className={`transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm" style={{ backgroundColor: themes[themeColor] }}>
                          {(lead.name && lead.name.trim() ? lead.name.trim().split(' ').map(n => n[0]).join('') : 'U')}
                        </div>
                        <div className="ml-3">
                          <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{lead.name}</div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{lead.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{lead.email}</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{lead.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {lead.formType || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {lead.type || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isDarkMode ? (
                          lead.status === 'New' ? 'bg-gray-700 text-gray-200' :
                            lead.status === 'Contacted' ? 'bg-blue-900 text-blue-200' :
                              lead.status === 'Qualified' ? 'bg-yellow-900 text-yellow-200' :
                                lead.status === 'Proposal' ? 'bg-purple-900 text-purple-200' :
                                  lead.status === 'Negotiation' ? 'bg-orange-900 text-orange-200' :
                                    lead.status === 'Referred' ? 'bg-purple-900 text-purple-200' :
                                      'bg-red-900 text-red-200'
                        ) : (
                          lead.status === 'New' ? 'bg-gray-100 text-gray-800' :
                            lead.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                              lead.status === 'Qualified' ? 'bg-yellow-100 text-yellow-800' :
                                lead.status === 'Proposal' ? 'bg-purple-100 text-purple-800' :
                                  lead.status === 'Negotiation' ? 'bg-orange-100 text-orange-800' :
                                    lead.status === 'Referred' ? 'bg-purple-100 text-purple-800' :
                                      'bg-red-100 text-red-800'
                        )
                        }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="p-1.5 text-gray-600 hover:text-white hover:bg-blue-500 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {newlyCreatedLeadIds.has(lead.id) ? (
                          <button
                            onClick={() => handleEditLead(lead)}
                            className="p-1.5 text-gray-600 hover:text-white hover:bg-green-500 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setShowEditPopup(true)}
                            className="p-1.5 text-gray-400 cursor-not-allowed rounded-lg"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => window.location.href = `tel:${lead.phone}`}
                          className="p-1.5 text-gray-600 hover:text-white hover:bg-orange-500 rounded-lg transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate('/Nexus-admin/email-templates', { state: { lead } })}
                          className="p-1.5 text-gray-600 hover:text-white hover:bg-purple-500 rounded-lg transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                        {newlyCreatedLeadIds.has(lead.id) ? (
                          <button
                            onClick={() => setDeleteConfirmLead(lead)}
                            className="p-1.5 text-gray-600 hover:text-white hover:bg-red-500 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setShowDeletePopup(true)}
                            className="p-1.5 text-gray-400 cursor-not-allowed rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                        {lead.isArchived ? (
                          <button
                            onClick={() => handleUnarchiveLead(lead)}
                            className="p-1.5 text-gray-600 hover:text-white hover:bg-yellow-500 rounded-lg transition-colors"
                          >
                            <ArchiveRestore className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleArchiveLead(lead)}
                            className="p-1.5 text-gray-600 hover:text-white hover:bg-yellow-500 rounded-lg transition-colors"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`sticky top-0 border-b px-6 py-4 flex items-center justify-between ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Lead Details</h2>
              <button onClick={() => setSelectedLead(null)} className={`text-gray-400 hover:text-gray-600 ${isDarkMode ? 'hover:text-gray-300' : ''}`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: themes[themeColor] }}>
                    {(selectedLead.name || 'Unknown').split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-4">
                    <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedLead.name}</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{selectedLead.email}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{selectedLead.phone}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold" style={{ color: themes[themeColor] }}>{selectedLead.leadScore}</div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Lead Score</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`text-xs font-semibold uppercase ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Source</label>
                  <p className={`mt-1 text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedLead.source}</p>
                </div>
                <div>
                  <label className={`text-xs font-semibold uppercase ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Form Type</label>
                  <p className={`mt-1 text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedLead.formType || 'N/A'}</p>
                </div>
                <div>
                  <label className={`text-xs font-semibold uppercase ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Status</label>
                  <p className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isDarkMode ? (
                        selectedLead.status === 'New' ? 'bg-gray-700 text-gray-200' :
                          selectedLead.status === 'Contacted' ? 'bg-blue-900 text-blue-200' :
                            selectedLead.status === 'Qualified' ? 'bg-yellow-900 text-yellow-200' :
                              selectedLead.status === 'Proposal' ? 'bg-purple-900 text-purple-200' :
                                selectedLead.status === 'Negotiation' ? 'bg-orange-900 text-orange-200' :
                                  selectedLead.status === 'Referred' ? 'bg-purple-900 text-purple-200' :
                                    'bg-red-900 text-red-200'
                      ) : (
                        selectedLead.status === 'New' ? 'bg-gray-100 text-gray-800' :
                          selectedLead.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                            selectedLead.status === 'Qualified' ? 'bg-yellow-100 text-yellow-800' :
                              selectedLead.status === 'Proposal' ? 'bg-purple-100 text-purple-800' :
                                selectedLead.status === 'Negotiation' ? 'bg-orange-100 text-orange-800' :
                                  selectedLead.status === 'Referred' ? 'bg-purple-100 text-purple-800' :
                                    'bg-red-100 text-red-800'
                      )
                      }`}>
                      {selectedLead.status}
                    </span>
                  </p>
                </div>
                <div>
                  <label className={`text-xs font-semibold uppercase ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Type</label>
                  <p className={`mt-1 text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedLead.type || 'N/A'}</p>
                </div>
                <div>
                  <label className={`text-xs font-semibold uppercase ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Estimated Value</label>
                  <p className={`mt-1 text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    ${selectedLead.estimatedValue?.toLocaleString() || 'N/A'}
                  </p>
                </div>
                <div>
                  <label className={`text-xs font-semibold uppercase ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Created</label>
                  <p className={`mt-1 text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {new Date(selectedLead.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className={`text-xs font-semibold uppercase ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Last Contact</label>
                  <p className={`mt-1 text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedLead.lastContact ? new Date(selectedLead.lastContact).toLocaleDateString() : 'Not contacted'}
                  </p>
                </div>
              </div>

              <div>
                <label className={`text-xs font-semibold uppercase ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Visited Pages</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedLead.visitedPages.map((page, index) => (
                    <span key={index} className={`px-3 py-1 rounded-full text-xs ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
                      {page}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className={`text-xs font-semibold uppercase ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Remarks</label>
                <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                  {selectedLead.remarks}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setViewMoreLead(selectedLead);
                    setShowViewMoreModal(true);
                  }}
                  className="flex-1 px-4 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  View More
                </button>
                {newlyCreatedLeadIds.has(selectedLead.id) ? (
                  <button
                    onClick={() => handleEditLead(selectedLead)}
                    className="flex-1 px-4 py-2.5 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: themes[themeColor] }}
                  >
                    Edit Lead
                  </button>
                ) : (
                  <button
                    onClick={() => setShowEditPopup(true)}
                    className="flex-1 px-4 py-2.5 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed"
                  >
                    Edit Lead
                  </button>
                )}
                {newlyCreatedLeadIds.has(selectedLead.id) ? (
                  <button
                    onClick={() => setDeleteConfirmLead(selectedLead)}
                    className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                  >
                    Delete Lead
                  </button>
                ) : (
                  <button
                    onClick={() => setShowDeletePopup(true)}
                    className="flex-1 px-4 py-2.5 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed"
                  >
                    Delete Lead
                  </button>
                )}
                {selectedLead.isArchived ? (
                  <button
                    onClick={() => handleUnarchiveLead(selectedLead)}
                    className="flex-1 px-4 py-2.5 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors"
                  >
                    Unarchive Lead
                  </button>
                ) : (
                  <button
                    onClick={() => handleArchiveLead(selectedLead)}
                    className="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                  >
                    Archive Lead
                  </button>
                )}
                <button className={`flex-1 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-colors ${isDarkMode ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' : 'bg-gray-200 text-gray-700'}`}>
                  Schedule Follow-Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditLeadModal && editingLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`sticky top-0 border-b px-6 py-4 flex items-center justify-between ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Edit Lead</h2>
              <button onClick={() => setShowEditLeadModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateLead} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={editLeadData.name}
                    onChange={(e) => setEditLeadData({ ...editLeadData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none"
                    style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={editLeadData.email}
                    onChange={(e) => setEditLeadData({ ...editLeadData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none"
                    style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={editLeadData.phone}
                    onChange={(e) => setEditLeadData({ ...editLeadData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none"
                    style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                  <select
                    value={editLeadData.source}
                    onChange={(e) => setEditLeadData({ ...editLeadData, source: e.target.value as Lead['source'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none"
                    style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                  >
                    {sources.map(source => (
                      <option key={source} value={source}>
                        {source === 'all' ? 'Select Source' : source}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={editLeadData.status}
                    onChange={(e) => setEditLeadData({ ...editLeadData, status: e.target.value as Lead['status'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none"
                    style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                  >
                    {statuses
                      .filter(status => status !== 'all' && status !== 'Closed Won' && status !== 'Closed Lost')
                      .map(status => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Rep</label>
                  <input
                    type="text"
                    value={editLeadData.assignedRep}
                    onChange={(e) => setEditLeadData({ ...editLeadData, assignedRep: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none"
                    style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lead Score</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editLeadData.leadScore}
                    onChange={(e) => setEditLeadData({ ...editLeadData, leadScore: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none"
                    style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Value</label>
                  <input
                    type="number"
                    min="0"
                    value={editLeadData.estimatedValue || ''}
                    onChange={(e) => setEditLeadData({ ...editLeadData, estimatedValue: e.target.value ? parseFloat(e.target.value) : undefined })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none"
                    style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Contact</label>
                  <input
                    type="date"
                    value={editLeadData.lastContact}
                    onChange={(e) => setEditLeadData({ ...editLeadData, lastContact: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none"
                    style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visited Pages</label>
                  <input
                    type="text"
                    placeholder="Comma separated (e.g., home,contact)"
                    value={editLeadData.visitedPages.join(',')}
                    onChange={(e) => setEditLeadData({ ...editLeadData, visitedPages: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none"
                    style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea
                  value={editLeadData.remarks}
                  onChange={(e) => setEditLeadData({ ...editLeadData, remarks: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none"
                  style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                />
              </div>

              {formError && (
                <div className="text-red-600 text-sm">{formError}</div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 px-4 py-2.5 rounded-lg text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                  style={{ backgroundColor: themes[themeColor] }}
                >
                  {formLoading ? 'Updating...' : 'Update Lead'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditLeadModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showNewLeadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`sticky top-0 border-b px-6 py-4 flex items-center justify-between ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Create New Lead</h2>
              <button onClick={() => setShowNewLeadModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={newLeadData.name}
                    onChange={(e) => {
                      setNewLeadData({ ...newLeadData, name: e.target.value });
                      if (e.target.value.trim()) setFormErrors({ ...formErrors, name: '' });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none"
                    style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                  />
                  {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={newLeadData.email}
                    onChange={(e) => {
                      const email = e.target.value;
                      setNewLeadData({ ...newLeadData, email });
                      if (email && /\S+@\S+\.\S+/.test(email)) {
                        setFormErrors({ ...formErrors, email: '' });
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none"
                    style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                  />
                  {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={newLeadData.phone}
                    onChange={(e) => {
                      const phone = e.target.value;
                      setNewLeadData({ ...newLeadData, phone });
                      if (phone && /^\d+$/.test(phone)) {
                        setFormErrors({ ...formErrors, phone: '' });
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none"
                    style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                  />
                  {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                  <select
                    value={newLeadData.source}
                    onChange={(e) => setNewLeadData({ ...newLeadData, source: e.target.value as Lead['source'] })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                  >
                    {sources
                      .filter(s => s !== 'all')
                      .map(source => (
                        <option key={source} value={source}>
                          {source}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={newLeadData.status}
                    onChange={(e) => setNewLeadData({ ...newLeadData, status: e.target.value as Lead['status'] })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                  >
                    {statuses
                      .filter(status => status !== 'all' && status !== 'Closed Won' && status !== 'Closed Lost')
                      .map(status => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Rep</label>
                  <input
                    type="text"
                    value={newLeadData.assignedRep}
                    onChange={(e) => setNewLeadData({ ...newLeadData, assignedRep: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none"
                    style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lead Score</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newLeadData.leadScore}
                    onChange={(e) => setNewLeadData({ ...newLeadData, leadScore: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none"
                    style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Value</label>
                  <input
                    type="number"
                    min="0"
                    value={newLeadData.estimatedValue || ''}
                    onChange={(e) => setNewLeadData({ ...newLeadData, estimatedValue: e.target.value ? parseFloat(e.target.value) : undefined })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none"
                    style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Contact</label>
                  <input
                    type="date"
                    value={newLeadData.lastContact}
                    onChange={(e) => {
                      setNewLeadData({ ...newLeadData, lastContact: e.target.value });
                      if (e.target.value) setFormErrors({ ...formErrors, lastContact: '' });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none"
                    style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                  />
                  {formErrors.lastContact && <p className="text-red-500 text-xs mt-1">{formErrors.lastContact}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visited Pages</label>
                  <input
                    type="text"
                    placeholder="Comma separated (e.g., home,contact)"
                    value={newLeadData.visitedPages.join(',')}
                    onChange={(e) => setNewLeadData({ ...newLeadData, visitedPages: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none"
                    style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea
                  value={newLeadData.remarks}
                  onChange={(e) => setNewLeadData({ ...newLeadData, remarks: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none"
                  style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                />
              </div>

              {formError && (
                <div className="text-red-600 text-sm">{formError}</div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 px-4 py-2.5 rounded-lg text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                  style={{ backgroundColor: themes[themeColor] }}
                >
                  {formLoading ? 'Creating...' : 'Create Lead'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewLeadModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      {showViewMoreModal && viewMoreLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className={`sticky top-0 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} px-6 py-4 flex items-center justify-between`}>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Lead Details - Email Format</h2>
              <button onClick={() => setShowViewMoreModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg mb-4`}>
                <pre className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} whitespace-pre-wrap font-mono`}>
                  {`Lead ID: ${viewMoreLead.id}
Name: ${viewMoreLead.name}
Email: ${viewMoreLead.email}
Phone: ${viewMoreLead.phone}
Source: ${viewMoreLead.source}
Status: ${viewMoreLead.status}
Assigned Rep: ${viewMoreLead.assignedRep}
Lead Score: ${viewMoreLead.leadScore}
Estimated Value: $${viewMoreLead.estimatedValue?.toLocaleString() || 'N/A'}
Form Type: ${viewMoreLead.formType || 'N/A'}
Created: ${new Date(viewMoreLead.createdAt).toLocaleDateString()}
Last Contact: ${viewMoreLead.lastContact ? new Date(viewMoreLead.lastContact).toLocaleDateString() : 'Not contacted'}
Visited Pages: ${viewMoreLead.visitedPages.join(', ') || 'None'}
Remarks: ${viewMoreLead.remarks || 'No remarks'}`}
                </pre>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(`Lead ID: ${viewMoreLead.id}
Name: ${viewMoreLead.name}
Email: ${viewMoreLead.email}
Phone: ${viewMoreLead.phone}
Source: ${viewMoreLead.source}
Status: ${viewMoreLead.status}
Assigned Rep: ${viewMoreLead.assignedRep}
Lead Score: ${viewMoreLead.leadScore}
Estimated Value: $${viewMoreLead.estimatedValue?.toLocaleString() || 'N/A'}
Form Type: ${viewMoreLead.formType || 'N/A'}
Created: ${new Date(viewMoreLead.createdAt).toLocaleDateString()}
Last Contact: ${viewMoreLead.lastContact ? new Date(viewMoreLead.lastContact).toLocaleDateString() : 'Not contacted'}
Visited Pages: ${viewMoreLead.visitedPages.join(', ') || 'None'}
Remarks: ${viewMoreLead.remarks || 'No remarks'}`);
                      setShowCopySuccessPopup(true);
                    } catch (err) {
                      console.error('Failed to copy to clipboard:', err);
                    }
                  }}
                  className="flex-1 px-4 py-2.5 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  Copy to Clipboard
                </button>
                <button
                  onClick={() => setShowViewMoreModal(false)}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-colors ${isDarkMode ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' : 'bg-gray-200 text-gray-700'}`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteConfirmLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-xl max-w-md w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Delete Lead</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Are you sure you want to delete this lead?</p>
                </div>
              </div>

              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg mb-6`}>
                <div className="text-sm">
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{deleteConfirmLead.name}</p>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{deleteConfirmLead.email}</p>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{deleteConfirmLead.phone}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleDeleteLead}
                  className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteConfirmLead(null)}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-colors ${isDarkMode ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' : 'bg-gray-200 text-gray-700'}`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-xl max-w-md w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                  <X className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Cannot Delete Lead</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>You cannot delete leads submitted from the website.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeletePopup(false)}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-colors ${isDarkMode ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' : 'bg-gray-200 text-gray-700'}`}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-xl max-w-md w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                  <X className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Cannot Edit Lead</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>You cannot edit leads submitted from the website.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowEditPopup(false)}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-colors ${isDarkMode ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' : 'bg-gray-200 text-gray-700'}`}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCopySuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-xl max-w-md w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Success!</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Lead details have been copied to clipboard.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCopySuccessPopup(false)}
                  className="flex-1 px-4 py-2.5 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCustomDateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-xl max-w-md w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Custom Date Range</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Select start and end dates for export</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Start Date</label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none"
                    style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>End Date</label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none"
                    style={{ '--tw-ring-color': themes[themeColor] } as React.CSSProperties}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    if (customStartDate && customEndDate) {
                      exportToExcel();
                    }
                  }}
                  disabled={!customStartDate || !customEndDate}
                  className="flex-1 px-4 py-2.5 rounded-lg text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                  style={{ backgroundColor: themes[themeColor] }}
                >
                  Export
                </button>
                <button
                  onClick={() => setShowCustomDateModal(false)}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-colors ${isDarkMode ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' : 'bg-gray-200 text-gray-700'}`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
