const createTemplate = (title, preHeader, color) => `
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
  .container { max-width: 600px; margin: 20px auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
  .header { background: linear-gradient(to right, ${color}); padding: 30px 20px; text-align: center; color: white; }
  .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
  .content { padding: 30px; background-color: #ffffff; }
  .message-box { background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; font-style: italic; color: #555; }
  .footer { background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
  .button { display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 20px; }
  .button:hover { background-color: #1d4ed8; }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${title}</h1>
    </div>
    <div class="content">
      <p>Dear {{name}},</p>
      <p>${preHeader}</p>
      
      <!-- Dynamic Message Injection -->
      <div class="message-box">
        {{message}}
      </div>

      <div style="text-align: center;">
        <a href="{{actionLink}}" class="button">Visit Our Website</a>
      </div>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} nexus Finance. </p>
      <p> | Parramatta, NSW & Adelaide, SA</p>
      <p><a href="mailto:info@Nexusfinance.com.au" style="color: #2563eb; text-decoration: none;">info@Nexusfinance.com.au</a></p>
    </div>
  </div>
</body>
</html>
`;

const emailTemplates = [
  {
    id: 1,
    name: 'Welcome Email',
    subject: 'Welcome to nexus Finance',
    html: createTemplate('Welcome to nexus Finance', 'We are excited to have you on board!', '#3b82f6, #4f46e5') // Blue
  },
  {
    id: 2,
    name: 'Follow-Up Email',
    subject: 'Following Up on Your Inquiry',
    html: createTemplate('Following Up', 'Thank you for your interest in our services.', '#10b981, #059669') // Green
  },
  {
    id: 3,
    name: 'Promotion Email',
    subject: 'Special Offer from nexus Finance',
    html: createTemplate('Special Offer', 'We have a special offer tailored just for you!', '#f97316, #ea580c') // Orange
  },
  {
    id: 4,
    name: 'Newsletter Email',
    subject: 'Latest Updates from nexus Finance',
    html: createTemplate('Latest Updates', 'Here are the latest updates from nexus Finance.', '#8b5cf6, #7c3aed') // Purple
  }
];

module.exports = emailTemplates;