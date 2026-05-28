// API base URL: uses environment variable for flexibility across environments
// In development, use local backend on port 5000; in production, use the configured URL
const API_BASE_URL = 
  import.meta.env.MODE === 'development' 
    ? 'http://localhost:5000/api'
    : `${import.meta.env.VITE_API_URL}/api`;


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

export const fetchDeals = async (): Promise<Lead[]> => {
  const response = await fetch(`${API_BASE_URL}/deals`);
  if (!response.ok) throw new Error('Failed to fetch deal leads');
  const data = await response.json();
  const deals = data.data || [];
  return Array.isArray(deals) ? deals.map(mapDealLead) : [];
};

export const fetchPartners = async (): Promise<Lead[]> => {
  const response = await fetch(`${API_BASE_URL}/partners`);
  if (!response.ok) throw new Error('Failed to fetch partner leads');
  const data = await response.json();
  const partners = data.data || [];
  return Array.isArray(partners) ? partners.map(mapPartnerLead) : [];
};

export const fetchPdfLeads = async (): Promise<Lead[]> => {
  const response = await fetch(`${API_BASE_URL}/pdf-preview/`);
  if (!response.ok) throw new Error('Failed to fetch PDF leads');
  const data = await response.json();
  return Array.isArray(data) ? data.map(mapPdfLead) : [];
};

export const fetchLoanLeads = async (): Promise<Lead[]> => {
  const response = await fetch(`${API_BASE_URL}/loan-application`);
  if (!response.ok) throw new Error('Failed to fetch loan leads');
  const data = await response.json();
  const loanApplications = data.loanApplications || [];
  return Array.isArray(loanApplications) ? loanApplications.map(mapLoanLead) : [];
};

export const fetchContactLeads = async (): Promise<Lead[]> => {
  const response = await fetch(`${API_BASE_URL}/contact`);
  if (!response.ok) throw new Error('Failed to fetch contact leads');
  const data = await response.json();
  const contacts = data.contacts || [];
  return Array.isArray(contacts) ? contacts.map(mapContactLead) : [];
};

export const fetchLeads = async (): Promise<Lead[]> => {
  const response = await fetch(`${API_BASE_URL}/leads`);
  if (!response.ok) throw new Error('Failed to fetch leads');
  const data = await response.json();
  const leads = data.leads || [];
  return Array.isArray(leads) ? leads.map((item: any) => {
    if (item.type === 'pdf-preview') {
      return mapPdfLead(item);
    } else if (item.type === 'loan-application') {
      return mapLoanLead(item);
    } else {
      // Default to lead type (excluding contact leads which are fetched separately)
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
    }
  }) : [];
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
    const uniqueLeads = allLeads.filter((lead, index, self) =>
      index === self.findIndex(l => l.id === lead.id)
    );
    return uniqueLeads;
  } catch (error) {
    throw new Error('Failed to fetch leads from APIs');
  }
};

export const createLead = async (leadData: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> => {
  const response = await fetch(`${API_BASE_URL}/lead`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(leadData),
  });
  if (!response.ok) throw new Error('Failed to create lead');
  const data = await response.json();
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
};

export const updateLead = async (id: string, leadData: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> => {
  const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(leadData),
  });
  if (!response.ok) throw new Error('Failed to update lead');
  const data = await response.json();
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
};

export const deleteLead = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete lead');
};



export const archiveLead = async (type: string, id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/leads/${type}/${id}/archive`, {
    method: 'PATCH',
  });
  if (!response.ok) throw new Error('Failed to archive lead');
};

export const unarchiveLead = async (type: string, id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/leads/${type}/${id}/unarchive`, {
    method: 'PATCH',
  });
  if (!response.ok) throw new Error('Failed to unarchive lead');
};

export const fetchSettings = async (): Promise<Settings> => {
  const response = await fetch(`${API_BASE_URL}/settings`);
  if (!response.ok) throw new Error('Failed to fetch settings');
  const data = await response.json();
  return data;
};

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

export const updateSettings = async (settings: UpdateSettingsRequest): Promise<UpdateSettingsResponse> => {
  const response = await fetch(`${API_BASE_URL}/settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settings),
  });
  if (!response.ok) throw new Error('Failed to update settings');
  const data = await response.json();
  return data;
};

export const loginAdmin = async (credentials: {email: string, password: string}) => {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Invalid email or password.' }));
    throw new Error(errorData.message || 'Invalid email or password.');
  }

  const data = await response.json();
  return data;
};

export const forgotPassword = async (email: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/forgotpassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to send password reset email.' }));
    throw new Error(errorData.message || 'An error occurred while processing your request.');
  }

  return response.json();
};

export const resetPassword = async (token: string, passwords: { password: string; confirmPassword: string }) => {
  const response = await fetch(`${API_BASE_URL}/admin/resetpassword/${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(passwords),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to reset password. The link may be invalid or expired.' }));
    throw new Error(errorData.message || 'An error occurred while resetting your password.');
  }

  const data = await response.json();
  return data;
};

export interface AdminProfile {
  name: string;
  email: string;
  avatar?: string;
}

export const updateProfilePic = async (token: string, file: File): Promise<{ message: string; admin: any }> => {
  if (!file || !(file instanceof File)) {
    throw new Error('Invalid file provided');
  }

  const formData = new FormData();
  formData.append('profilePic', file);

  const response = await fetch(`${API_BASE_URL}/admin/update-profile-pic`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to update profile picture' }));
    throw new Error(errorData.message || 'Failed to update profile picture');
  }

  const data = await response.json();
  return data;
};

export const fetchAdminProfile = async (): Promise<AdminProfile> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token provided');
  }

  const response = await fetch(`${API_BASE_URL}/admin/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch admin profile');
  const data = await response.json();
  return {
    name: data.admin?.username || data.name || '',
    email: data.admin?.email || data.email || '',
    avatar: data.admin?.profilePic || data.profilePic || data.avatar,
  };
};

export const fetchArchivedLeads = async (): Promise<Lead[]> => {
  const response = await fetch(`${API_BASE_URL}/leads/archived`);
  if (!response.ok) throw new Error('Failed to fetch archived leads');
  const data = await response.json();
  const leads = data.leads || [];
  return Array.isArray(leads) ? leads.map((item: any) => {
    if (item.type === 'pdf-preview') {
      return mapPdfLead(item);
    } else if (item.type === 'loan-application') {
      return mapLoanLead(item);
    } else {
      // Default to lead type (excluding contact leads which are fetched separately)
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
    }
  }) : [];
};

export const fetchUnarchivedLeads = async (): Promise<Lead[]> => {
  const allLeads = await fetchAllLeads();
  return allLeads.filter(lead => lead.isArchived !== true);
};

export const fetchDraftLeads = async (): Promise<Lead[]> => {
  const response = await fetch(`${API_BASE_URL}/loan-application/draft-leads`);
  if (!response.ok) throw new Error('Failed to fetch draft leads');
  const data = await response.json();
  const draftLeads = data.draftLeads || [];
  return Array.isArray(draftLeads) ? draftLeads.map(mapLoanLead) : [];
};

export const createDraftLead = async (draftData: {
  loan_type: string;
  full_name: string;
  contact_number: string;
  email: string;
  hidden_field: string;
}): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/loan-application/draft`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(draftData),
  });
  if (!response.ok) throw new Error('Failed to create draft lead');
  const data = await response.json();
  return data;
};

export const submitLoanApplication = async (applicationData: any): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/loan-application/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(applicationData),
  });
  if (!response.ok) throw new Error('Failed to submit loan application');
  const data = await response.json();
  return data;
};

export const fetchTotalVisitors = async (): Promise<number> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token provided');
  }

  const response = await fetch(`${API_BASE_URL}/admin/analytics/total-visitors`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch total visitors');
  const data = await response.json();
  return data.totalVisitors || 0;
};

export const fetchDailyVisitors = async (): Promise<number> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token provided');
  }

  const response = await fetch(`${API_BASE_URL}/admin/analytics/daily-visitors`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch daily visitors');
  const data = await response.json();
  return data.dailyVisitors || 0;
};

export const fetchWeeklyVisitors = async (): Promise<number> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token provided');
  }

  const response = await fetch(`${API_BASE_URL}/admin/analytics/weekly-visitors`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch weekly visitors');
  const data = await response.json();
  return data.weeklyVisitors || 0;
};

export const fetchMonthlyVisitors = async (): Promise<number> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token provided');
  }

  const response = await fetch(`${API_BASE_URL}/admin/analytics/monthly-visitors`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch monthly visitors');
  const data = await response.json();
  return data.monthlyVisitors || 0;
};

export const fetchYearlyVisitors = async (): Promise<number> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token provided');
  }

  const response = await fetch(`${API_BASE_URL}/admin/analytics/yearly-visitors`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch yearly visitors');
  const data = await response.json();
  return data.yearlyVisitors || 0;
};

export const sendEmail = async (leadId: string, leadType: string, templateKey: string): Promise<any> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/emails/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ leadId, type: leadType, templateKey }),
  });
  if (!response.ok) throw new Error('Failed to send email');
  const data = await response.json();
  return data;
};

// Custom Template APIs
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

export const createCustomTemplate = async (templateData: Omit<CustomTemplate, '_id' | 'createdBy' | 'createdAt' | 'updatedAt'>): Promise<CustomTemplate> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/custom-templates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(templateData),
  });
  if (!response.ok) throw new Error('Failed to create custom template');
  const data = await response.json();
  return data;
};

export const getAllCustomTemplates = async (): Promise<CustomTemplate[]> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/custom-templates`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch custom templates');
  const data = await response.json();
  return data;
};

export const getCustomTemplate = async (id: string): Promise<CustomTemplate> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/custom-templates/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch custom template');
  const data = await response.json();
  return data;
};

export const updateCustomTemplate = async (id: string, templateData: Partial<Omit<CustomTemplate, '_id' | 'createdBy' | 'createdAt' | 'updatedAt'>>): Promise<CustomTemplate> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/custom-templates/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(templateData),
  });
  if (!response.ok) throw new Error('Failed to update custom template');
  const data = await response.json();
  return data;
};

export const deleteCustomTemplate = async (id: string): Promise<void> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/custom-templates/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to delete custom template');
};

export const sendManualEmail = async (templateId: string, recipientEmail: string, subject: string, content: string): Promise<any> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/emails/manual-send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ templateId, recipientEmail, subject, content }),
  });
  if (!response.ok) throw new Error('Failed to send manual email');
  const data = await response.json();
  return data;
};
