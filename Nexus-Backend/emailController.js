const sendEmail = require('./utils/sendEmail');

const handleEmailRequest = async (req, res) => {
  console.log(`\n--- [API] New Email Request ---`);
  console.log(`[API] Origin: ${req.headers.origin}`);
  console.log(`[API] Payload Received:`, req.body);

  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    console.warn(`[API] Missing required fields`);
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    console.log(`[API] Invoking sendEmail utility...`);
    
    await sendEmail(to, subject, html);
    
    console.log(`[API] sendEmail utility completed successfully. Returning 200 OK.`);
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error(`[API] Controller caught an error:`, error.message);
    return res.status(500).json({ success: false, error: 'Failed to process email request' });
  }
};

module.exports = { handleEmailRequest };