const axios = require('axios');

/**
 * Sends an email via Brevo using Axios with exponential backoff retries.
 */
const sendEmail = async (to, subject, htmlContent) => {
  const url = 'https://api.brevo.com/v3/smtp/email';
  const payload = {
    sender: { email: process.env.EMAIL_FROM, name: 'Nexus Finance' },
    to: [{ email: to }],
    subject: subject,
    htmlContent: htmlContent,
  };

  const MAX_RETRIES = 3;
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      attempt++;
      console.log(`[Email] Attempt ${attempt}: Initiating request to Brevo for ${to}...`);
      const startTime = Date.now();
      
      const response = await axios.post(url, payload, {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        // STRICT timeout: forces an error if Brevo hangs longer than 8 seconds
        timeout: 8000, 
      });

      console.log(`[Email] Success! Response time: ${Date.now() - startTime}ms. MessageId: ${response.data.messageId}`);
      return response.data;

    } catch (error) {
      console.error(`[Email] Attempt ${attempt} failed:`, {
        message: error.message,
        status: error.response?.status,
        code: error.code // Will log 'ECONNABORTED' if it times out
      });

      if (attempt === MAX_RETRIES) {
        throw new Error(`[Email] Fatal: Failed to send email after ${MAX_RETRIES} attempts.`);
      }

      const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s...
      console.log(`[Email] Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

module.exports = sendEmail;