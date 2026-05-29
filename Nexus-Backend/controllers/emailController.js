const sendManualEmail = async (req, res) => {
  try {
    console.log('Manual email request received:', req.body);

    const { templateId, toEmail, subject, dynamicValues, isCustom } = req.body;

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

    if (isCustom) {
      const customTemplate = await CustomEmailTemplate.findOne({
        _id: templateId,
        userId: req.admin.id,
        isActive: true
      });

      if (customTemplate) {
        htmlContent = customTemplate.content;
      } else {
        return res.status(404).json({
          message: 'Custom template not found',
          success: false
        });
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

    // 🔥 FIX: Hard timeout protection
    const emailResult = await Promise.race([
      sendEmail({
        email: toEmail,
        subject: subject || 'Custom Email',
        message: htmlContent,
        sender: process.env.EMAIL_FROM || 'info@Nexusfinance.com.au'
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Email API timeout (controller safeguard)")), 20000)
      )
    ]);

    return res.status(200).json({
      message: 'Email sent successfully',
      success: true,
      messageId: emailResult.messageId
    });

  } catch (error) {
    console.error('Error sending manual email:', error.message);

    return res.status(500).json({
      message: 'Failed to send email',
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  sendManualEmail
};