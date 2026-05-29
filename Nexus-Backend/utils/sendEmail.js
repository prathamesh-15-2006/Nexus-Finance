const axios = require('axios');

const sendEmail = async ({ email, subject, message, sender }) => {
  try {
    if (!process.env.BREVO_API_KEY || !process.env.EMAIL_FROM) {
      throw new Error(
        "Email credentials not configured. Please set BREVO_API_KEY and EMAIL_FROM in environment variables."
      );
    }

    const payload = {
      sender: {
        email: sender || process.env.EMAIL_FROM,
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

        const response = await axios.post("https://api.brevo.com/v3/smtp/email", payload, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "api-key": process.env.BREVO_API_KEY,
          },
          // Strict 6-second timeout to prevent the connection from hanging forever
          timeout: 6000,
        });

        console.log(`[Email] Success! Response time: ${Date.now() - startTime}ms. Message ID: ${response.data.messageId}`);

        return {
          success: true,
          messageId: response.data.messageId,
        };
      } catch (error) {
        console.error(`[Email] Attempt ${attempt} failed:`, {
          message: error.message,
          status: error.response?.status,
          code: error.code, // Will log 'ECONNABORTED' if it times out
        });

        if (attempt === MAX_RETRIES) {
          throw new Error(`[Email] Fatal: Failed to send email after ${MAX_RETRIES} attempts.`);
        }

        const delay = Math.pow(2, attempt) * 1000; // 2s, 4s...
        console.log(`[Email] Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  } catch (error) {
    console.error("Error sending email:", error.message);

    // IMPORTANT: throw instead of swallowing
    throw error;
  }
};

module.exports = sendEmail;