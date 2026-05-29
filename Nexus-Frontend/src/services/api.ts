import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// Debug log: Check the browser console to verify what URL was injected at build time!
console.log('[API Config] Loaded Backend URL:', backendUrl);

// Initialize the centralized Axios instance
const api = axios.create({
  // Uses GitHub Action env var in production, falls back to local proxy in dev
  baseURL: backendUrl,
  timeout: 15000, 
});

// Request interceptor to automatically attach JWT token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for global 401 handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized access - token expired.');
      // Optional: Add logic to force user logout if token expires
      // localStorage.removeItem('token');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// --- Interfaces ---

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: 'Website' | 'Referral' | 'Social Media' | 'Email Campaign' | 'Cold Call';
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Referred';
  assignedRep: string;
  leadScore: number;
  createdAt: string;
  lastContact?: string;
  visitedPages: string[];
  remarks: string;
  estimatedValue?: number;
  formType?: string;
  type: string;
  isArchived?: boolean;
}

export interface ThemeOption {
  name: string;
  color: string;
  description: string;
}

export interface Settings {
  themeColor: string;
  settings: {
    notification: boolean;
    language: string;
  };
  themeOptions: ThemeOption[];
}

export interface AdminProfile {
  name: string;
  email: string;
  avatar?: string;
}

export interface CustomTemplate {
  _id: string;
  title: string;
  subject: string;
  icon: string;
  color: string;
  content: string;
  customStyles: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateSettingsRequest {
  themeColor: string;
  settings: {
    notification: boolean;
    language: string;
  };
}

export interface UpdateSettingsResponse {
  message: string;
  themeColor: string;
  settings: {
    notification: boolean;
    language: string;
  };
}

// --- Mappers ---

const mapPdfLead = (data: any): Lead => ({
  id: data._id || `pdf-${Date.now()}`,
  name: data.fullName || 'Unknown',
  email: data.email || '',
  phone: data.contactNumber || '',
  source: 'Website' as const,
  status: 'New' as const,
  assignedRep: 'Unassigned',
  leadScore: 60,
  createdAt: data.submittedAt || new Date().toISOString(),
  visitedPages: [],
  remarks: data.message || 'PDF form lead',
  estimatedValue: undefined,
  formType: 'PDF Preview',
  type: 'pdf-preview',
  isArchived: data.isArchived || false,
});

const mapLoanLead = (data: any): Lead => ({
  id: data._id || `loan-${Date.now()}`,
  name: data.full_name || 'Unknown',
  email: data.email || '',
  phone: data.contact_number || '',
  source: 'Website' as const,
  status: 'Qualified' as const,
  assignedRep: 'Unassigned',
  leadScore: 75,
  createdAt: data.submittedAt || new Date().toISOString(),
  visitedPages: [],
  remarks: data.notes || `Loan Type: ${data.loan_type}, Amount: $${data.loan_amount}, Term: ${data.loan_term} months`,
  estimatedValue: data.loan_amount,
  formType: 'Loan Application',
  type: 'loan-application',
  isArchived: data.isArchived || false,
});

const mapContactLead = (data: any): Lead => ({
  id: data._id || `contact-${Date.now()}`,
  name: data.name || 'Unknown',
  email: data.email || '',
  phone: data.phone || '',
  source: 'Website' as const,
  status: 'New' as const,
  assignedRep: 'Unassigned',
  leadScore: 50,
  createdAt: data.submittedAt || new Date().toISOString(),
  visitedPages: [],
  remarks: data.message || `Business: ${data.trading_name}, Loan Type: ${data.loan_type}`,
  estimatedValue: data.loan_amount,
  formType: 'Contact Form',
  type: 'contact',
  isArchived: data.isArchived || false,
});

const mapDealLead = (data: any): Lead => ({
  id: data._id || `deal-${Date.now()}`,
  name: `${data.firstName || 'Unknown'} ${data.lastName || ''}`.trim() || 'Unknown',
  email: data.email || '',
  phone: data.contactNo || '',
  source: 'Referral' as const,
  status: (data.status === 'new' ? 'New' : data.status) as Lead['status'],
  assignedRep: 'Unassigned',
  leadScore: 70,
  createdAt: data.submittedAt || new Date().toISOString(),
  visitedPages: [],
  remarks: `Client: ${data.clientFirstName || ''} ${data.clientLastName || ''}, Revenue: $${data.clientRevenue || 'N/A'}, Industry: ${data.clientIndustry || 'N/A'}`,
  estimatedValue: data.loanAmount,
  formType: 'Deal Form',
  type: 'deal',
  isArchived: data.isArchived || false,
});

const mapPartnerLead = (data: any): Lead => ({
  id: data._id || `partner-${Date.now()}`,
  name: `${data.firstName || 'Unknown'} ${data.lastName || ''}`.trim() || 'Unknown',
  email: data.email || '',
  phone: data.contactNo || '',
  source: 'Referral' as const,
  status: (data.status === 'new' ? 'New' : data.status) as Lead['status'],
  assignedRep: 'Unassigned',
  leadScore: 65,
  createdAt: data.appliedAt || new Date().toISOString(),
  visitedPages: [],
  remarks: `Business: ${data.businessName || 'N/A'}, Profession: ${data.profession || 'N/A'}, ABN: ${data.businessAbn || 'N/A'}`,
  estimatedValue: undefined,
  formType: 'Partner Form',
  type: 'partner',
  isArchived: data.isArchived || false,
});

// --- Lead Functions ---

export const fetchDeals = async (): Promise<Lead[]> => {
  try {
    const { data } = await api.get('/api/deals');
    const deals = data.data || [];
    return Array.isArray(deals) ? deals.map(mapDealLead) : [];
  } catch (error) {
    throw new Error('Failed to fetch deal leads');
  }
};

export const fetchPartners = async (): Promise<Lead[]> => {
  try {
    const { data } = await api.get('/api/partners');
    const partners = data.data || [];
    return Array.isArray(partners) ? partners.map(mapPartnerLead) : [];
  } catch (error) {
    throw new Error('Failed to fetch partner leads');
  }
};

export const fetchPdfLeads = async (): Promise<Lead[]> => {
  try {
    const { data } = await api.get('/api/pdf-preview/');
    return Array.isArray(data) ? data.map(mapPdfLead) : [];
  } catch (error) {
    throw new Error('Failed to fetch PDF leads');
  }
};

export const fetchLoanLeads = async (): Promise<Lead[]> => {
  try {
    const { data } = await api.get('/api/loan-application');
    const loanApplications = data.loanApplications || [];
    return Array.isArray(loanApplications) ? loanApplications.map(mapLoanLead) : [];
  } catch (error) {
    throw new Error('Failed to fetch loan leads');
  }
};

export const fetchContactLeads = async (): Promise<Lead[]> => {
  try {
    const { data } = await api.get('/api/contact');
    const contacts = data.contacts || [];
    return Array.isArray(contacts) ? contacts.map(mapContactLead) : [];
  } catch (error) {
    throw new Error('Failed to fetch contact leads');
  }
};

export const fetchLeads = async (): Promise<Lead[]> => {
  try {
    const { data } = await api.get('/api/leads');
    const leads = data.leads || [];
    return Array.isArray(leads) ? leads.map((item: any) => {
      if (item.type === 'pdf-preview') return mapPdfLead(item);
      if (item.type === 'loan-application') return mapLoanLead(item);
      
      return {
        id: item._id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        source: item.source,
        status: item.status,
        assignedRep: item.assignedRep,
        leadScore: item.leadScore,
        createdAt: item.createdAt,
        lastContact: item.lastContact,
        visitedPages: item.visitedPages || [],
        remarks: item.remarks,
        estimatedValue: item.estimatedValue,
        formType: 'Manual Lead',
        type: item.type || 'manual',
        isArchived: item.isArchived || false,
      };
    }) : [];
  } catch (error) {
    throw new Error('Failed to fetch leads');
  }
};

export const fetchAllLeads = async (): Promise<Lead[]> => {
  try {
    const [pdfLeads, loanLeads, contactLeads, leads, dealLeads, partnerLeads, draftLeads] = await Promise.all([
      fetchPdfLeads(),
      fetchLoanLeads(),
      fetchContactLeads(),
      fetchLeads(),
      fetchDeals(),
      fetchPartners(),
      fetchDraftLeads(),
    ]);
    const allLeads = [...pdfLeads, ...loanLeads, ...contactLeads, ...leads, ...dealLeads, ...partnerLeads, ...draftLeads];
    
    // Remove duplicates based on id
    return allLeads.filter((lead, index, self) =>
      index === self.findIndex(l => l.id === lead.id)
    );
  } catch (error) {
    throw new Error('Failed to fetch leads from APIs');
  }
};

export const createLead = async (leadData: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> => {
  try {
    const { data } = await api.post('/api/lead', leadData);
    return {
      id: data._id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      source: data.source,
      status: data.status,
      assignedRep: data.assignedRep,
      leadScore: data.leadScore,
      createdAt: data.createdAt,
      lastContact: data.lastContact,
      visitedPages: data.visitedPages,
      remarks: data.remarks,
      estimatedValue: data.estimatedValue,
      type: data.type || 'manual',
    };
  } catch (error) {
    throw new Error('Failed to create lead');
  }
};

export const updateLead = async (id: string, leadData: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> => {
  try {
    const { data } = await api.put(`/api/leads/${id}`, leadData);
    return {
      id: data._id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      source: data.source,
      status: data.status,
      assignedRep: data.assignedRep,
      leadScore: data.leadScore,
      createdAt: data.createdAt,
      lastContact: data.lastContact,
      visitedPages: data.visitedPages,
      remarks: data.remarks,
      estimatedValue: data.estimatedValue,
      type: data.type || 'manual',
    };
  } catch (error) {
    throw new Error('Failed to update lead');
  }
};

export const deleteLead = async (id: string): Promise<void> => {
  try {
    await api.delete(`/api/leads/${id}`);
  } catch (error) {
    throw new Error('Failed to delete lead');
  }
};

export const archiveLead = async (type: string, id: string): Promise<void> => {
  try {
    await api.patch(`/api/leads/${type}/${id}/archive`);
  } catch (error) {
    throw new Error('Failed to archive lead');
  }
};

export const unarchiveLead = async (type: string, id: string): Promise<void> => {
  try {
    await api.patch(`/api/leads/${type}/${id}/unarchive`);
  } catch (error) {
    throw new Error('Failed to unarchive lead');
  }
};

export const fetchArchivedLeads = async (): Promise<Lead[]> => {
  try {
    const { data } = await api.get('/api/leads/archived');
    const leads = data.leads || [];
    return Array.isArray(leads) ? leads.map((item: any) => {
      if (item.type === 'pdf-preview') return mapPdfLead(item);
      if (item.type === 'loan-application') return mapLoanLead(item);
      
      return {
        id: item._id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        source: item.source,
        status: item.status,
        assignedRep: item.assignedRep,
        leadScore: item.leadScore,
        createdAt: item.createdAt,
        lastContact: item.lastContact,
        visitedPages: item.visitedPages || [],
        remarks: item.remarks,
        estimatedValue: item.estimatedValue,
        formType: 'Manual Lead',
        type: item.type || 'manual',
        isArchived: item.isArchived || false,
      };
    }) : [];
  } catch (error) {
    throw new Error('Failed to fetch archived leads');
  }
};

export const fetchUnarchivedLeads = async (): Promise<Lead[]> => {
  const allLeads = await fetchAllLeads();
  return allLeads.filter(lead => lead.isArchived !== true);
};

export const fetchDraftLeads = async (): Promise<Lead[]> => {
  try {
    const { data } = await api.get('/api/loan-application/draft-leads');
    const draftLeads = data.draftLeads || [];
    return Array.isArray(draftLeads) ? draftLeads.map(mapLoanLead) : [];
  } catch (error) {
    throw new Error('Failed to fetch draft leads');
  }
};

export const createDraftLead = async (draftData: {
  loan_type: string;
  full_name: string;
  contact_number: string;
  email: string;
  hidden_field: string;
}): Promise<any> => {
  try {
    const { data } = await api.post('/api/loan-application/draft', draftData);
    return data;
  } catch (error) {
    throw new Error('Failed to create draft lead');
  }
};

export const submitLoanApplication = async (applicationData: any): Promise<any> => {
  try {
    const { data } = await api.post('/api/loan-application/submit', applicationData);
    return data;
  } catch (error) {
    throw new Error('Failed to submit loan application');
  }
};

// --- Settings & Admin Functions ---

export const fetchSettings = async (): Promise<Settings> => {
  try {
    const { data } = await api.get('/api/settings');
    return data;
  } catch (error) {
    throw new Error('Failed to fetch settings');
  }
};

export const updateSettings = async (settings: UpdateSettingsRequest): Promise<UpdateSettingsResponse> => {
  try {
    const { data } = await api.put('/api/settings', settings);
    return data;
  } catch (error) {
    throw new Error('Failed to update settings');
  }
};

export const loginAdmin = async (credentials: {email: string, password: string}) => {
  try {
    const { data } = await api.post('/api/admin/login', credentials);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Invalid email or password.');
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const { data } = await api.post('/api/admin/forgotpassword', { email });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'An error occurred while processing your request.');
  }
};

export const resetPassword = async (token: string, passwords: { password: string; confirmPassword: string }) => {
  try {
    const { data } = await api.post(`/api/admin/resetpassword/${token}`, passwords);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'An error occurred while resetting your password.');
  }
};

export const updateProfilePic = async (token: string, file: File): Promise<{ message: string; admin: any }> => {
  if (!file || !(file instanceof File)) {
    throw new Error('Invalid file provided');
  }

  const formData = new FormData();
  formData.append('profilePic', file);

  try {
    // Note: Axios automatically sets the multipart/form-data content-type for FormData payloads
    const { data } = await api.put('/api/admin/update-profile-pic', formData);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update profile picture');
  }
};

export const fetchAdminProfile = async (): Promise<AdminProfile> => {
  try {
    const { data } = await api.get('/api/admin/profile');
    return {
      name: data.admin?.username || data.name || '',
      email: data.admin?.email || data.email || '',
      avatar: data.admin?.profilePic || data.profilePic || data.avatar,
    };
  } catch (error) {
    throw new Error('Failed to fetch admin profile');
  }
};

// --- Analytics Functions ---

export const fetchTotalVisitors = async (): Promise<number> => {
  try {
    const { data } = await api.get('/api/admin/analytics/total-visitors');
    return data.totalVisitors || 0;
  } catch (error) {
    throw new Error('Failed to fetch total visitors');
  }
};

export const fetchDailyVisitors = async (): Promise<number> => {
  try {
    const { data } = await api.get('/api/admin/analytics/daily-visitors');
    return data.dailyVisitors || 0;
  } catch (error) {
    throw new Error('Failed to fetch daily visitors');
  }
};

export const fetchWeeklyVisitors = async (): Promise<number> => {
  try {
    const { data } = await api.get('/api/admin/analytics/weekly-visitors');
    return data.weeklyVisitors || 0;
  } catch (error) {
    throw new Error('Failed to fetch weekly visitors');
  }
};

export const fetchMonthlyVisitors = async (): Promise<number> => {
  try {
    const { data } = await api.get('/api/admin/analytics/monthly-visitors');
    return data.monthlyVisitors || 0;
  } catch (error) {
    throw new Error('Failed to fetch monthly visitors');
  }
};

export const fetchYearlyVisitors = async (): Promise<number> => {
  try {
    const { data } = await api.get('/api/admin/analytics/yearly-visitors');
    return data.yearlyVisitors || 0;
  } catch (error) {
    throw new Error('Failed to fetch yearly visitors');
  }
};

// --- Email & Custom Template Functions ---

export const sendEmail = async (leadId: string, leadType: string, templateKey: string): Promise<any> => {
  try {
    const { data } = await api.post('/api/emails/send', { leadId, type: leadType, templateKey });
    return data;
  } catch (error) {
    throw new Error('Failed to send email');
  }
};

export const createCustomTemplate = async (templateData: Omit<CustomTemplate, '_id' | 'createdBy' | 'createdAt' | 'updatedAt'>): Promise<CustomTemplate> => {
  try {
    const { data } = await api.post('/api/templates', templateData);
    return data.data;
  } catch (error) {
    throw new Error('Failed to create custom template');
  }
};

export const getAllCustomTemplates = async (): Promise<CustomTemplate[]> => {
  try {
    const { data } = await api.get('/api/templates/custom');
    return data.data;
  } catch (error) {
    throw new Error('Failed to fetch custom templates');
  }
};

export const getCustomTemplate = async (id: string): Promise<CustomTemplate> => {
  try {
    const { data } = await api.get(`/api/templates/custom/${id}`);
    return data.data;
  } catch (error) {
    throw new Error('Failed to fetch custom template');
  }
};

export const updateCustomTemplate = async (id: string, templateData: Partial<Omit<CustomTemplate, '_id' | 'createdBy' | 'createdAt' | 'updatedAt'>>): Promise<CustomTemplate> => {
  try {
    const { data } = await api.put(`/api/templates/${id}`, templateData);
    return data.data;
  } catch (error) {
    throw new Error('Failed to update custom template');
  }
};

export const deleteCustomTemplate = async (id: string): Promise<void> => {
  try {
    await api.delete(`/api/templates/${id}`);
  } catch (error) {
    throw new Error('Failed to delete custom template');
  }
};

export const sendManualEmail = async (payload: {
  templateId: string;
  toEmail: string;
  subject?: string;
  dynamicValues?: Record<string, any>;
  isCustom?: boolean;
}): Promise<any> => {
  try {
    const { data } = await api.post('/api/emails/manual-send', payload);
    return data;
  } catch (error) {
    throw new Error('Failed to send manual email');
  }
};

export const submitContactForm = async (contactData: any): Promise<any> => {
  try {
    const { data } = await api.post('/api/contact', contactData);
    return data;
  } catch (error) {
    throw new Error('Failed to submit contact form');
  }
};

export const submitPartnerApplication = async (partnerData: any): Promise<any> => {
  try {
    const { data } = await api.post('/api/partners/apply', partnerData);
    return data;
  } catch (error) {
    throw new Error('Failed to submit partner application');
  }
};

export const submitClientDeal = async (dealData: any): Promise<any> => {
  try {
    const { data } = await api.post('/api/deals', dealData);
    return data;
  } catch (error) {
    throw new Error('Failed to submit client deal');
  }
};

export const submitPdfPreviewForm = async (formData: any): Promise<any> => {
  try {
    const { data } = await api.post('/api/pdf-preview/submit', formData);
    return data;
  } catch (error) {
    throw new Error('Failed to submit PDF preview form');
  }
};

export default api;
