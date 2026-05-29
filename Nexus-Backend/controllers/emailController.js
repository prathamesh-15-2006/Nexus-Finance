const CustomEmailTemplate = require('../models/CustomEmailTemplate');
const emailTemplatesList = require('../routes/emailTemplates');
const sendEmail = require('../utils/sendEmail');

// --- Predefined template sending (automated) ---
// NOTE: routes/emailRoutes.js expects these handlers to exist.
const sendEmailTemplate = async (req, res) => {
  try {
    const { templateId, toEmail, dynamicValues } = req.body;

    if (!templateId || !toEmail) {
      return res.status(400).json({
        message: 'Template ID and To Email are required',
        success: false
      });
    }

    const template = emailTemplatesList.find(t => t.id === Number(templateId));
    if (!template) {
      return res.status(404).json({
        message: 'Template not found',
        success: false
      });
    }

    const values = {
      name: 'Valued Customer',
      message: '',
      actionLink: 'https://www.nexusfinance.com.au/',
      ...dynamicValues
    };

    let htmlContent = template.html;
    Object.keys(values).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      htmlContent = htmlContent.replace(regex, values[key] || '');
    });

    const emailResult = await sendEmail({
      email: toEmail,
      subject: template.subject,
      message: htmlContent,
      sender: process.env.EMAIL_FROM || 'info@Nexusfinance.com.au'
    });

    return res.status(200).json({
      message: 'Email sent successfully',
      success: true,
      messageId: emailResult.messageId
    });
  } catch (error) {
    console.error('Error sending email template:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
      error: error.message
    });
  }
};

// --- Lead details helper ---
const getLeadDetails = async (req, res) => {
  try {
    const { type, id } = req.params;

    // Placeholder until you connect this to DB-backed lead models.
    return res.status(200).json({
      success: true,
      data: { type, id }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// --- Available predefined templates (GET) ---
const getAvailableTemplates = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: emailTemplatesList
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

const sendManualEmail = async (req, res) => {
  try {
    console.log('Manual email request received:', req.body);

    let { templateId, toEmail, subject, dynamicValues, isCustom } = req.body;

    if (dynamicValues == null || typeof dynamicValues !== 'object') {
      dynamicValues = {};
    }

    // Normalize custom flag coming from frontend (can be "false"/"true" or boolean)
    const customFlag = isCustom === true || isCustom === 'true';

    if (!templateId || !toEmail) {
      return res.status(400).json({
        message: 'Template ID and To Email are required',
        success: false
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(toEmail)) {
      return res.status(400).json({
        message: 'Invalid email address format',
        success: false
      });
    }

    let htmlContent;

    if (customFlag) {
      const customTemplate = await CustomEmailTemplate.findOne({
        _id: templateId,
        userId: req.admin.id,
        isActive: true
      });

      if (!customTemplate) {
        return res.status(404).json({
          message: 'Custom template not found',
          success: false
        });
      }

      htmlContent = customTemplate.content;

      if (!subject) {
        subject = customTemplate.subject;
      }
    } else {
      const template = emailTemplatesList.find(t => t.id === Number(templateId));

      if (!template) {
        return res.status(404).json({
          message: 'Template not found',
          success: false
        });
      }

      htmlContent = template.html;
    }

    const values = {
      name: 'Valued Customer',
      message: '',
      actionLink: 'https://www.nexusfinance.com.au/',
      ...dynamicValues
    };

    Object.keys(values).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      htmlContent = htmlContent.replace(regex, values[key] || '');
    });

    console.log(`Sending email to ${toEmail}`);

    const emailResult = await sendEmail({
      email: toEmail,
      subject: subject || 'Custom Email',
      message: htmlContent,
      sender: process.env.EMAIL_FROM || 'info@Nexusfinance.com.au'
    });

    if (emailResult?.success) {
      return res.status(200).json({
        message: 'Email sent successfully',
        success: true,
        messageId: emailResult.messageId
      });
    }

    return res.status(500).json({
      message: 'Failed to send email',
      success: false
    });
  } catch (error) {
    console.error('Error sending manual email:', error.message);

    return res.status(500).json({
      message: 'Server error',
      success: false,
      error: error.message
    });
  }
};

// --- Predefined Templates Map (Matches Frontend Key Signatures) ---
const predefinedTemplates = {
  contact: {
    subject: "Thank You for Contacting Nexus Finance",
    body: `Dear {name},

Thank you for visiting our website and reaching out to Nexus Finance. We appreciate your interest in our financial services.

We have received your inquiry and our team will get back to you within 24 hours with more information about our loan products and how we can assist you.

If you have any urgent questions, please feel free to call us at your convenience.

Best regards,
Nexus Finance Team
Phone: 9370439566
Email: enquiries@Nexusfinance.com.au`
  },
  partner: {
    subject: "Thank You for Your Interest in Partnering with Nexus Finance",
    body: `Dear {name},

Thank you for your interest in partnering with Nexus Finance. We value potential partnerships and believe in building strong relationships in the financial services industry.

Our partnership team will review your inquiry and contact you shortly to discuss potential collaboration opportunities.

We look forward to exploring how we can work together.

Best regards,
Nexus Finance Partnership Team
Phone: 9370439566
Email: partnerships@Nexusfinance.com.au`
  },
  pdf: {
    subject: "Your Requested PDF - Nexus Finance Information",
    body: `Dear {name},

Thank you for your interest in Nexus Finance. As requested, please find attached the PDF document containing detailed information about our loan products and services.

If you have any questions about the information provided or would like to discuss your specific financial needs, please don't hesitate to contact us.

We're here to help you find the right financing solution for your requirements.

Best regards,
Nexus Finance Team
Phone: 9370439566
Email: enquiries@Nexusfinance.com.au`
  },
  loan: {
    subject: "Thank You for Your Loan Application Inquiry - Nexus Finance",
    body: `Dear {name},

Thank you for your interest in our loan products at Nexus Finance. We understand that finding the right financing solution is important for your business or personal needs.

Our loan specialists will review your inquiry and contact you within 24 hours to discuss your options and guide you through the application process.

We offer competitive rates and flexible terms to suit your requirements.

Best regards,
Nexus Finance Loan Team
Phone: 9370439566
Email: loans@Nexusfinance.com.au`
  },
  followup: {
    subject: "Follow-Up on Your Recent Inquiry - Nexus Finance",
    body: `Dear {name},

I hope this email finds you well. I'm following up on your recent inquiry about our financial services.

We wanted to ensure you received all the information you requested and to see if you have any additional questions about our loan products.

Our team is ready to assist you with personalized advice based on your specific needs.

Please let us know how we can be of further assistance.

Best regards,
Nexus Finance Team
Phone: 9370439566
Email: enquiries@Nexusfinance.com.au`
  },
  welcome: {
    subject: "Welcome to Nexus Finance - Your Trusted Financial Partner",
    body: `Dear {name},

Welcome to Nexus Finance! Thank you for choosing us as your financial services partner.

We're committed to providing you with exceptional service and helping you achieve your financial goals. Whether you're looking for business loans, personal finance, or investment opportunities, our experienced team is here to support you.

Feel free to reach out to us anytime with your questions or requirements.

Best regards,
Nexus Finance Team
Phone: 9370439566
Email: enquiries@Nexusfinance.com.au`
  }
};

// --- Premium HTML Container Wrapper ---
const wrapInHtml = (subject, body, name) => `
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc; }
  .container { max-width: 600px; margin: 30px auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); background-color: #ffffff; }
  .header { background: linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%); padding: 40px 30px; text-align: center; color: white; }
  .header h1 { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
  .content { padding: 40px 30px; }
  .content p { margin: 0 0 20px 0; font-size: 16px; color: #334155; }
  .content p:last-child { margin-bottom: 0; }
  .footer { background-color: #f8fafc; padding: 30px 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
  .footer p { margin: 0 0 8px 0; }
  .footer p:last-child { margin-bottom: 0; }
  .button { display: inline-block; background: linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%); color: white !important; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; margin: 20px 0; text-align: center; }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${subject}</h1>
    </div>
    <div class="content">
      ${body.split('\\n\\n').map(p => `<p>${p.replace(/\\n/g, '<br>')}</p>`).join('')}
      <div style="text-align: center;">
        <a href="https://nexus-finance-935e5.web.app" class="button">Visit Nexus Finance</a>
      </div>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Nexus Finance. All rights reserved.</p>
      <p>Parramatta, NSW & Adelaide, SA</p>
      <p><a href="mailto:enquiries@Nexusfinance.com.au" style="color: #4f46e5; text-decoration: none; font-weight: 600;">enquiries@Nexusfinance.com.au</a> | Phone: 9370439566</p>
    </div>
  </div>
</body>
</html>
`;

// --- Centralized Send Email Endpoint handler ---
const sendEmailFromTemplatesPage = async (req, res) => {
  try {
    const { leadId, type, templateKey } = req.body;

    if (!leadId || !templateKey) {
      return res.status(400).json({
        success: false,
        message: 'Lead ID and Template Key are required'
      });
    }

    // 1. Fetch Lead from Lead Model
    const Lead = require('../models/leads');
    const lead = await Lead.findById(leadId);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    let subject = '';
    let htmlContent = '';

    // 2. Fetch Custom or Predefined Template
    if (templateKey.startsWith('custom-')) {
      const customTemplateId = templateKey.replace('custom-', '');
      const customTemplate = await CustomEmailTemplate.findOne({
        _id: customTemplateId,
        userId: req.admin.id,
        isActive: true
      });

      if (!customTemplate) {
        return res.status(404).json({
          success: false,
          message: 'Custom template not found'
        });
      }

      subject = customTemplate.subject;
      htmlContent = customTemplate.content;
    } else {
      const template = predefinedTemplates[templateKey];
      if (!template) {
        return res.status(404).json({
          success: false,
          message: `Predefined template '${templateKey}' not found`
        });
      }

      subject = template.subject;
      htmlContent = wrapInHtml(template.subject, template.body, lead.name);
    }

    // 3. Replace Placeholder Fields ({name}, {phone}, {email})
    const replacePlaceholders = (text) => {
      if (!text) return '';
      return text
        .replace(/{name}/g, lead.name || 'Valued Customer')
        .replace(/{phone}/g, lead.phone || '')
        .replace(/{email}/g, lead.email || '');
    };

    subject = replacePlaceholders(subject);
    htmlContent = replacePlaceholders(htmlContent);

    // 4. Dispatch Email using robust sendEmail
    const emailResult = await sendEmail({
      email: lead.email,
      subject: subject,
      message: htmlContent,
      sender: process.env.EMAIL_FROM || 'info@Nexusfinance.com.au'
    });

    if (emailResult?.success) {
      return res.status(200).json({
        success: true,
        message: 'Email sent successfully',
        messageId: emailResult.messageId
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to send email'
    });
  } catch (error) {
    console.error('Error sending template email:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  sendEmailTemplate,
  getLeadDetails,
  getAvailableTemplates,
  sendManualEmail,
  sendEmailFromTemplatesPage
};
