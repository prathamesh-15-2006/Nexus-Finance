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

    console.log("Sending email via Brevo to:", email);

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000), // 15s hard timeout (IMPORTANT FIX)
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        `Brevo API error (${response.status}): ${data.message || response.statusText}`
      );
    }

    console.log("Email sent successfully. Message ID:", data.messageId);

    return {
      success: true,
      messageId: data.messageId,
    };
  } catch (error) {
    console.error("Error sending email:", error.message);

    // IMPORTANT: throw instead of swallowing
    throw error;
  }
};

module.exports = sendEmail;