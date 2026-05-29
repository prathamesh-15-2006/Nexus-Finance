const Lead = require('../models/leads');
const Contact = require('../models/Contact');
const LoanApplication = require('../models/LoanApplication');
const PdfPreview = require('../models/PdfPreview');
const ClientDeal = require('../models/ClientDeal');
const PartnerApplication = require('../models/PartnerApplication');
const CustomEmailTemplate = require('../models/CustomEmailTemplate');
const sendEmail = require('../utils/sendEmail');
const emailTemplatesList = require('../emailTemplates');

// Predefined plain-text templates used by sendEmailTemplate()
const emailTemplates = {
  contact: {
    subject: "Thank You for Contacting nexus Finance",
    body: `Dear {name},

Thank you for visiting our website and reaching out to nexus Finance. We appreciate your interest in our financial services.

We have received your inquiry and our team will get back to you within 24 hours with more information about our loan products and how we can assist you.

If you have any urgent questions, please feel free to call us at your convenience.

Best regards,
nexus Finance Team
Phone: {phone}
Email: info@Nexusfinance.com.au`
  },
  partner: {
    subject: "Thank You for Your Interest in Partnering with nexus Finance",
    body: String.raw`Dear {name},

Thank you for your interest in partnering with nexus Finance. We value potential partnerships and believe in building strong relationships in the financial services industry.

Our partnership team will review your inquiry and contact you shortly to discuss potential collaboration opportunities.

We look forward to exploring how we can work together.

Best regards,
nexus Finance Partnership Team
Phone: {phone}
Email: partnerships@nexusfinance.com.au`
  },
  pdf: {
    subject: "Your Requested PDF - nexus Finance Information",
    body: `Dear {name},

Thank you for your interest in nexus Finance. As requested, please find attached the PDF document containing detailed information about our loan products and services.

If you have any questions about the information provided or would like to discuss your specific financial needs, please don't hesitate to contact us.

We're here to help you find the right financing solution for your requirements.

Best regards,
nexus Finance Team
Phone: {phone}
Email: info@Nexusfinance.com.au`
  },
  loan: {
    subject: "Thank You for Your Loan Application Inquiry - nexus Finance",
    body: `Dear {name},

Thank you for your interest in our loan products at nexus Finance. We understand that finding the right financing solution is important for your business or personal needs.

Our loan specialists will review your inquiry and contact you within 24 hours to discuss your options and guide you through the application process.

We offer competitive rates and flexible terms to suit your requirements.

Best regards,
nexus Finance Loan Team
Phone: loans@nexusfinance.com.au`
  },
  followup: {
    subject: "Follow-Up on Your Recent Inquiry - nexus Finance",
    body: `Dear {name},

I hope this email finds you well. I'm following up on your recent inquiry about our financial services.

We wanted to ensure you received all the information you requested and to see if you have any additional questions about our loan products.

Our team is ready to assist you with personalized advice based on your specific needs.

Please let us know how we can be of further assistance.

Best regards,
nexus Finance Team
Phone: {phone}
Email: info@Nexusfinance.com.au`
  },
  welcome: {
    subject: "Welcome to nexus Finance - Your Trusted Financial Partner",
    body: `Dear {name},

Welcome to nexus Finance! Thank you for choosing us as your financial services partner.

We're committed to providing you with exceptional service and helping you achieve your financial goals. Whether you're looking for business loans, personal finance, or investment opportunities, our experienced team is here to support you.

Feel free to reach out to us anytime with your questions or requirements.

Best regards,
nexus Finance Team
Phone: {phone}
Email: info@Nexusfinance.com.au`
  }
};

const getModelByType = (type) => {
  switch (type) {
    case 'contact':
      return Contact;
    case 'loan-application':
      return LoanApplication;
    case 'pdf-preview':
      return PdfPreview;
    case 'lead':
      return Lead;
    case 'client-deal':
      return ClientDeal;
    case 'partner-application':
      return PartnerApplication;
    default:
      return null;
  }
};

const sendEmailTemplate = async (req, res) => {
  try {
    const { leadId, type, templateKey } = req.body;

    if (!leadId || !type || !templateKey) {
      return res.status(400).json({ message: 'leadId, type, and templateKey are required' });
    }

    const Model = getModelByType(type);
    if (!Model) {
      return res.status(400).json({ message: 'Invalid lead type' });
    }

    const lead = await Model.findById(leadId);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    let template;
    let isCustomTemplate = false;

    // Check if it's a custom template
    if (templateKey.startsWith('custom-')) {
      const templateId = templateKey.replace('custom-', '');
      template = await CustomEmailTemplate.findOne({
        _id: templateId,
        userId: req.admin.id,
        isActive: true
      });

      if (!template) {
        return res.status(404).json({ message: 'Template not found' });
      }
      isCustomTemplate = true;
    } else {
      // Handle predefined templates
      template = emailTemplates[templateKey];
      if (!template) {
        return res.status(400).json({ message: 'Invalid template key' });
      }
    }

    const replacePlaceholders = (text) => {
      return text
        .replace(/{name}/g, lead.name || '')
        .replace(/{phone}/g, lead.phone || '')
        .replace(/{email}/g, lead.email || '');
    };

    const subject = replacePlaceholders(isCustomTemplate ? template.subject : template.subject);
    const body = replacePlaceholders(isCustomTemplate ? template.content : template.body);

    const emailResult = await sendEmail({
      email: lead.email,
      subject,
      message: body,
      sender: process.env.EMAIL_FROM
    });

    if (emailResult.success) {
      res.status(200).json({ message: 'Email sent successfully' });
    } else {
      res.status(500).json({ message: 'Failed to send email' });
    }
  } catch (error) {
    console.error('Error sending email template:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getLeadDetails = async (req, res) => {
  try {
    const { id, type } = req.params;

    const Model = getModelByType(type);
    if (!Model) {
      return res.status(400).json({ message: 'Invalid lead type' });
    }

    const lead = await Model.findById(id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.status(200).json({ lead });
  } catch (error) {
    console.error('Error fetching lead details:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAvailableTemplates = (req, res) => {
  try {
    // Return templates structure for Admin UI (Step 3)
    const templates = emailTemplatesList.map(t => ({
      id: t.id,
      name: t.name,
      subject: t.subject,
      // We can send the HTML if the frontend wants to render a preview, 
      // or the frontend can keep a simplified version. 
      // Sending it allows the backend to be the true source.
      preview: t.html 
    }));
    res.status(200).json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const sendManualEmail = async (req, res) => {
  try {
    console.log('Manual email request received:', req.body);
    // Step 5: Frontend sends DATA only
    const { templateId, toEmail, subject, dynamicValues, isCustom } = req.body;

    if (!templateId || !toEmail) {
      console.warn('Missing templateId or toEmail');
      return res.status(400).json({ message: 'Template ID and To Email are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(toEmail)) {
      console.warn('Invalid email format:', toEmail);
      return res.status(400).json({ message: 'Invalid email address format' });
    }

    let htmlContent;

    if (isCustom) {
      // First try database-based custom templates
      const customTemplate = await CustomEmailTemplate.findOne({
        _id: templateId,
        userId: req.admin.id,
        isActive: true
      });

      if (customTemplate) {
        htmlContent = customTemplate.content;
        // Use the template's subject if not provided
        if (!subject) {
          subject = customTemplate.subject;
        }
      } else {
        // Fallback to file-based templates
        const fs = require('fs');
        const path = require('path');
        const templatePath = path.join(__dirname, '..', 'templates', `${templateId}.html`);

        if (!fs.existsSync(templatePath)) {
          return res.status(404).json({ message: 'Custom template not found' });
        }

        htmlContent = fs.readFileSync(templatePath, 'utf8');
      }
    } else {
      // Step 6: Backend Fetches Correct Template
      const template = emailTemplatesList.find(t => t.id === Number(templateId));
      if (!template) {
        console.warn(`Template with ID ${templateId} not found`);
        return res.status(404).json({ message: 'Template not found' });
      }

      htmlContent = template.html;
    }

    // Step 7: Backend Injects Dynamic Values
    // Default values to prevent broken placeholders
    const values = {
      name: 'Valued Customer',
      message: '',
      actionLink: 'https://www.nexusfinance.com.au/',
      ...dynamicValues // Overwrite with received data
    };

    // Replace {{key}} with value
    Object.keys(values).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      htmlContent = htmlContent.replace(regex, values[key] || '');
    });

    console.log(`Sending email to ${toEmail} with subject: ${subject || 'Custom Email'}`);

    // Step 8: Backend Sends Email via Brevo
    const emailResult = await sendEmail({
      email: toEmail,
      subject: subject || 'Custom Email', // Use provided subject or default
      message: htmlContent,
      sender: process.env.EMAIL_FROM || 'info@Nexusfinance.com.au'
    });

    if (emailResult && emailResult.success) {
      // Step 9: Save Email History (Recommended - Logic to be added if Log model exists)
      res.status(200).json({ message: 'Email sent successfully' });
    } else {
      console.error('Email sending failed:', emailResult);
      res.status(500).json({ message: 'An error occurred while sending the email', success: false });
    }
  } catch (error) {
    console.error('Error sending manual email:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  sendEmailTemplate,
  getLeadDetails,
  getAvailableTemplates,
  sendManualEmail
};
