const sendEmail = async ({ email, subject, message, sender }) => {
  try {
    if (!process.env.BREVO_API_KEY || !process.env.EMAIL_FROM) {
      throw new Error("Email credentials not configured. Please set BREVO_API_KEY and EMAIL_FROM in your environment variables.");
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

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Brevo API error: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log("Email sent successfully:", data.messageId);
    return { success: true, messageId: data.messageId };
  } catch (error) {
    console.error("Error sending email:", error.message);
    return { success: false, error: error.message };
  }
};

module.exports = sendEmail;
