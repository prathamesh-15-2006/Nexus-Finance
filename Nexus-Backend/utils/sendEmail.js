const axios = require('axios');

/**
 * Sends an email via Brevo using Axios with exponential backoff retries and timeout.
 */
const sendEmail = async ({ email, subject, message, sender }) => {
  try {
    console.log('=== EMAIL DEBUG START ===');
    console.log('Recipient:', email);
    console.log('Subject:', subject);
    console.log('BREVO_API_KEY exists:', !!process.env.BREVO_API_KEY);
    console.log('EMAIL_FROM:', process.env.EMAIL_FROM);

    const url = 'https://api.brevo.com/v3/smtp/email';
    const payload = {
      sender: {
        email: sender || process.env.EMAIL_FROM,
        name: 'Nexus Finance'
      },
      to: [
        {
          email: email,
        },
      ],
      subject,
      htmlContent: message,
    };

    const MAX_RETRIES = 3;
    let attempt = 0;

    while (attempt < MAX_RETRIES) {
      try {
        attempt++;
        console.log(`[Email] Attempt ${attempt}: Initiating request to Brevo for ${email}...`);
        const startTime = Date.now();

        const response = await axios.post(url, payload, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'api-key': process.env.BREVO_API_KEY,
          },
          // STRICT timeout: forces an error if Brevo hangs longer than 8 seconds
          timeout: 8000,
        });

        console.log(`[Email] Success! Response time: ${Date.now() - startTime}ms. MessageId: ${response.data.messageId}`);

        return {
          success: true,
          messageId: response.data.messageId,
        };

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
  } catch (outerError) {
    console.error('=== EMAIL FATAL ERROR ===');
    console.error('MESSAGE:', outerError.message);
    throw outerError;
  }
};

module.exports = sendEmail;