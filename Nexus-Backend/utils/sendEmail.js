const axios = require('axios');

const sendEmail = async ({ email, subject, message, sender }) => {
  try {
    console.log('=== EMAIL DEBUG START ===');
    console.log('Recipient:', email);
    console.log('Subject:', subject);
    console.log('BREVO_API_KEY exists:', !!process.env.BREVO_API_KEY);
    console.log('EMAIL_FROM:', process.env.EMAIL_FROM);

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

    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'api-key': process.env.BREVO_API_KEY,
        },
      }
    );

    console.log('EMAIL SUCCESS:', response.data);

    return {
      success: true,
      messageId: response.data.messageId,
    };
  } catch (error) {
    console.error('=== EMAIL ERROR ===');

    if (error.response) {
      console.error('STATUS:', error.response.status);
      console.error('DATA:', error.response.data);
    }

    console.error('MESSAGE:', error.message);

    throw error;
  }
};

module.exports = sendEmail;