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

    const emailResult = await Promise.race([
      sendEmail({
        email: toEmail,
        subject: subject || 'Custom Email',
        message: htmlContent,
        sender: process.env.EMAIL_FROM || 'info@Nexusfinance.com.au'
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Email timeout (controller guard)')), 20000)
      )
    ]);

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

module.exports = {
  sendEmailTemplate,
  getLeadDetails,
  getAvailableTemplates,
  sendManualEmail
};

