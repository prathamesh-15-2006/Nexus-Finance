import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, Send, Copy, ArrowLeft, Plus, Save, Edit, Trash2 } from 'lucide-react';
import { useThemeStore, themes } from '../../store/themeStore';
import { useTheme } from '../../contexts/ThemeContext';
import { sendEmail, createCustomTemplate, getAllCustomTemplates, updateCustomTemplate, deleteCustomTemplate } from '../../services/api';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  formType?: string;
  type?: string;
  remarks?: string;
}

const emailTemplates = {
  contact: {
    subject: "Thank You for Contacting Nexusce",
    body: `Dear {name},

Thank you for visiting our website and reaching out to Nexusce. We appreciate your interest in our financial services.

We have received your inquiry and our team will get back to you within 24 hours with more information about our loan products and how we can assist you.

If you have any urgent questions, please feel free to call us at your convenience.

Best regards,
Nexusce Team
Phone: {phone}
Email: info@Nexuse.com.au`
  },
  partner: {
    subject: "Thank You for Your Interest in Partnering with Nexusce",
    body: `Dear {name},

Thank you for your interest in partnering with Nexusce. We value potential partnerships and believe in building strong relationships in the financial services industry.

Our partnership team will review your inquiry and contact you shortly to discuss potential collaboration opportunities.

We look forward to exploring how we can work together.

Best regards,
Nexusce Partnership Team
Phone: {phone}
Email: partnerships@Nexuse.com.au`
  },
  pdf: {
    subject: "Your Requested PDF - Nexusce Information",
    body: `Dear {name},

Thank you for your interest in Nexusce. As requested, please find attached the PDF document containing detailed information about our loan products and services.

If you have any questions about the information provided or would like to discuss your specific financial needs, please don't hesitate to contact us.

We're here to help you find the right financing solution for your requirements.

Best regards,
Nexusce Team
Phone: {phone}
Email: info@Nexuse.com.au`
  },
  loan: {
    subject: "Thank You for Your Loan Application Inquiry - Nexusce",
    body: `Dear {name},

Thank you for your interest in our loan products at Nexusce. We understand that finding the right financing solution is important for your business or personal needs.

Our loan specialists will review your inquiry and contact you within 24 hours to discuss your options and guide you through the application process.

We offer competitive rates and flexible terms to suit your requirements.

Best regards,
Nexusce Loan Team
Phone: {phone}
Email: loans@Nexuse.com.au`
  },
  followup: {
    subject: "Follow-Up on Your Recent Inquiry - Nexusce",
    body: `Dear {name},

I hope this email finds you well. I'm following up on your recent inquiry about our financial services.

We wanted to ensure you received all the information you requested and to see if you have any additional questions about our loan products.

Our team is ready to assist you with personalized advice based on your specific needs.

Please let us know how we can be of further assistance.

Best regards,
Nexusce Team
Phone: {phone}
Email: info@Nexuse.com.au`
  },
  welcome: {
    subject: "Welcome to Nexusce - Your Trusted Financial Partner",
    body: `Dear {name},

Welcome to Nexusce! Thank you for choosing us as your financial services partner.

We're committed to providing you with exceptional service and helping you achieve your financial goals. Whether you're looking for business loans, personal finance, or investment opportunities, our experienced team is here to support you.

Feel free to reach out to us anytime with your questions or requirements.

Best regards,
Nexusce Team
Phone: {phone}
Email: info@Nexuse.com.au`
  }
};

interface CustomTemplate {
  _id: string;
  title: string;
  subject: string;
  icon: string;
  color: string;
  content: string;
  customStyles: string;
  createdAt: string;
  updatedAt: string;
}

export default function EmailTemplates() {
  const { themeColor } = useThemeStore();
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const lead = location.state?.lead as Lead;
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [customTemplates, setCustomTemplates] = useState<CustomTemplate[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    title: '',
    subject: '',
    icon: '📧',
    color: 'from-blue-500 to-blue-600',
    content: '',
    customStyles: ''
  });
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    message: string;
    title?: string;
    isConfirmation?: boolean;
    onConfirm?: () => void;
  }>({ isOpen: false, message: '' });

  useEffect(() => {
    fetchCustomTemplates();
  }, []);

  const fetchCustomTemplates = async () => {
    try {
      const templates = await getAllCustomTemplates();
      setCustomTemplates(templates);
    } catch (error) {
      console.error('Error fetching custom templates:', error);
    }
  };

  const handleCreateTemplate = async () => {
    try {
      await createCustomTemplate(newTemplate);
      setShowCreateModal(false);
      setNewTemplate({
        title: '',
        subject: '',
        icon: '📧',
        color: 'from-blue-500 to-blue-600',
        content: '',
        customStyles: ''
      });
      fetchCustomTemplates();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    setDialog({
      isOpen: true,
      message: 'Are you sure you want to delete this template?',
      title: 'Confirm Deletion',
      isConfirmation: true,
      onConfirm: async () => {
        try {
          await deleteCustomTemplate(id);
          fetchCustomTemplates();
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 2000);
        } catch (error) {
          console.error('Error deleting template:', error);
        }
      },
    });
  };

  if (!lead) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Email Templates</h1>
        </div>
        <div className={`rounded-xl p-6 shadow-sm border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <p className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>No lead data available. Please select a lead from the Leads page.</p>
        </div>
      </div>
    );
  }

  const replacePlaceholders = (text: string) => {
    return text
      .replace(/{name}/g, lead.name)
      .replace(/{phone}/g, lead.phone)
      .replace(/{email}/g, lead.email);
  };

  const handleSendEmail = async (templateKey: string) => {
    try {
      await sendEmail(lead.id, lead.type || 'lead', templateKey);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleCopyTemplate = (templateKey: string) => {
    const template = emailTemplates[templateKey as keyof typeof emailTemplates];
    const subject = replacePlaceholders(template.subject);
    const body = replacePlaceholders(template.body);

    const fullEmail = `Subject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(fullEmail);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Email Templates</h1>
          <p className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Send personalized emails to {lead.name}</p>
        </div>
      </div>

      <div className={`rounded-xl p-6 shadow-sm border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="mb-6">
          <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Lead Information</h2>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Name:</span>
                <span className={`ml-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{lead.name}</span>
              </div>
              <div>
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Email:</span>
                <span className={`ml-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{lead.email}</span>
              </div>
              <div>
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Phone:</span>
                <span className={`ml-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{lead.phone}</span>
              </div>
              <div>
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Source:</span>
                <span className={`ml-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{lead.source}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Predefined Templates */}
        <div className="mb-8">
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Predefined Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(emailTemplates).map(([key, template]) => (
              <div key={key} className={`rounded-lg border p-4 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`font-semibold capitalize ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {key.replace(/([A-Z])/g, ' $1').trim()} Template
                  </h3>
                  <Mail className="w-5 h-5 text-gray-500" />
                </div>

                <div className={`text-sm mb-4 p-3 rounded ${isDarkMode ? 'bg-gray-600' : 'bg-gray-50'}`}>
                  <div className={`font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Subject: {replacePlaceholders(template.subject)}
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} whitespace-pre-line`}>
                    {replacePlaceholders(template.body).substring(0, 150)}...
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleSendEmail(key)}
                    className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                  <button
                    onClick={() => handleCopyTemplate(key)}
                    className="px-3 py-2 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-1"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Templates */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Custom Templates</h3>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Template
            </button>
          </div>

          {customTemplates.length === 0 ? (
            <div className={`text-center py-8 rounded-lg border-2 border-dashed ${isDarkMode ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500'}`}>
              <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No custom templates yet</p>
              <p className="text-sm mb-4">Create your first custom email template to get started</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Create Your First Template
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customTemplates.map((template) => (
                <div key={template._id} className={`rounded-lg border p-4 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{template.icon}</span>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {template.title}
                      </h3>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleDeleteTemplate(template._id)}
                        className="p-1 text-red-500 hover:text-red-700 rounded transition-colors"
                        title="Delete template"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className={`text-sm mb-4 p-3 rounded ${isDarkMode ? 'bg-gray-600' : 'bg-gray-50'}`}>
                    <div className={`font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Subject: {replacePlaceholders(template.subject)}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} whitespace-pre-line`}>
                      {replacePlaceholders(template.content).replace(/<[^>]*>/g, '').substring(0, 150)}...
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSendEmail(`custom-${template._id}`)}
                      className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
                    >
                      <Send className="w-4 h-4" />
                      Send
                    </button>
                    <button
                      onClick={() => {
                        const subject = replacePlaceholders(template.subject);
                        const body = replacePlaceholders(template.content);
                        const fullEmail = `Subject: ${subject}\n\n${body}`;
                        navigator.clipboard.writeText(fullEmail);
                        setShowSuccess(true);
                        setTimeout(() => setShowSuccess(false), 2000);
                      }}
                      className="px-3 py-2 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-1"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          Email sent successfully!
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Create Custom Template</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Template Title
                </label>
                <input
                  type="text"
                  value={newTemplate.title}
                  onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                  placeholder="Enter template title"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Subject
                </label>
                <input
                  type="text"
                  value={newTemplate.subject}
                  onChange={(e) => setNewTemplate({ ...newTemplate, subject: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                  placeholder="Enter email subject"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Icon
                </label>
                <input
                  type="text"
                  value={newTemplate.icon}
                  onChange={(e) => setNewTemplate({ ...newTemplate, icon: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                  placeholder="Enter an emoji or icon"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Color Theme
                </label>
                <select
                  value={newTemplate.color}
                  onChange={(e) => setNewTemplate({ ...newTemplate, color: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="from-blue-500 to-blue-600">Blue</option>
                  <option value="from-green-500 to-green-600">Green</option>
                  <option value="from-purple-500 to-purple-600">Purple</option>
                  <option value="from-red-500 to-red-600">Red</option>
                  <option value="from-orange-500 to-orange-600">Orange</option>
                  <option value="from-pink-500 to-pink-600">Pink</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Content (HTML)
                </label>
                <textarea
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                  rows={10}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                  placeholder="Enter HTML email content. Use {name}, {email}, {phone} as placeholders."
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Custom Styles (CSS)
                </label>
                <textarea
                  value={newTemplate.customStyles}
                  onChange={(e) => setNewTemplate({ ...newTemplate, customStyles: e.target.value })}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                  placeholder="Enter custom CSS styles (optional)"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTemplate}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Template
              </button>
            </div>
          </div>
        </div>
      )}

      {dialog.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg shadow-xl max-w-md w-full mx-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            {dialog.title && (
              <h3 className="text-lg font-semibold mb-4">{dialog.title}</h3>
            )}
            <p className="mb-6">{dialog.message}</p>
            <div className="flex justify-end gap-4">
              {dialog.isConfirmation && (
                <button
                  onClick={() => setDialog({ isOpen: false, message: '' })}
                  className={`px-4 py-2 rounded hover:bg-gray-300 ${isDarkMode ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' : 'bg-gray-200 text-gray-700'}`}
                >
                  Cancel
                </button>
              )}
              <button
                onClick={() => {
                  if (dialog.onConfirm) {
                    dialog.onConfirm();
                  }
                  setDialog({ isOpen: false, message: '' });
                }}
                className={`px-4 py-2 text-white rounded ${dialog.isConfirmation ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {dialog.isConfirmation ? 'Delete' : 'OK'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
