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

    console.log("BREVO:", !!process.env.BREVO_API_KEY);
    console.log("FROM:", process.env.EMAIL_FROM);
    console.log(`[Email] Initiating request to Brevo for ${email}...`);
    const startTime = Date.now();

    const response = await axios.post("https://api.brevo.com/v3/smtp/email", payload, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      timeout: 15000,
    });

    console.log(`[Email] Success! Response time: ${Date.now() - startTime}ms. Message ID: ${response.data.messageId}`);

    return {
      success: true,
      messageId: response.data.messageId,
    };
  } catch (error) {
    console.error("Error sending email:", error.message);

    // IMPORTANT: throw instead of swallowing
    throw error;
  }
};

module.exports = sendEmail;