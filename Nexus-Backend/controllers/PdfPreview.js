const PdfPreview = require('../models/PdfPreview');
const sendEmail = require('../utils/sendEmail');
// dotenv already loaded in app.js

// PDF Preview form submission handler
const submitPdfPreviewForm = async (req, res) => {
  try {
    const {
      fullName,
      contactNumber,
      email,
      message,
      hidden_field, // Honeypot field
    } = req.body;

    // Check honeypot field for spam
    if (hidden_field) {
      return res.status(400).json({ message: 'Spam detected' });
    }

    // Validate required fields
    if (!fullName || !contactNumber || !email || !message) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate phone number (basic check for digits and length)
    const phoneRegex = /^\+?\d{8,15}$/;
    if (!phoneRegex.test(contactNumber)) {
      return res.status(400).json({ message: 'Invalid phone number format' });
    }

    // Email content for admin
    const adminSubject = `New PDF Preview Request from ${fullName}`;
    const adminMessage = `
      <h2>New PDF Preview Request</h2>
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Contact Number:</strong> ${contactNumber}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    // Send email to admin
    const adminEmailResult = await sendEmail({
      email: "prathamesh@nexusfinance.com.au",
      subject: adminSubject,
      message: adminMessage,
      sender: "prathamesh@nexusfinance.com.au",
    });

    if (!adminEmailResult.success) {
      throw new Error('Failed to send admin email');
    }

    // Send confirmation email to submitter
    const confirmationSubject = 'Thank you for your PDF preview request';
    const confirmationMessage = `
      <h2>Thank you for your request!</h2>
      <p>Dear ${fullName},</p>
      <p>We have received your PDF preview request and will get back to you soon.</p>
      <p><strong>Your Details:</strong></p>
      <ul>
        <li>Full Name: ${fullName}</li>
        <li>Contact Number: ${contactNumber}</li>
        <li>Email: ${email}</li>
      </ul>
      <p>Best regards,<br>nexus Admin Team</p>
    `;

    const confirmationEmailResult = await sendEmail({
      email: email,
      subject: confirmationSubject,
      message: confirmationMessage,
    });

    if (!confirmationEmailResult.success) {
      throw new Error('Failed to send confirmation email');
    }

    // Save to database
    const newPdfPreview = new PdfPreview({
      fullName,
      contactNumber,
      email,
      message,
    });
    await newPdfPreview.save();

    res.status(200).json({ message: 'Request sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    console.error('BREVO_API_KEY:', process.env.BREVO_API_KEY ? 'Set' : 'Not set');
    console.error('EMAIL_FROM:', process.env.EMAIL_FROM);
    console.error('RECIPIENT_EMAIL:', process.env.RECIPIENT_EMAIL);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAllPdfPreviews = async (req, res) => {
  try {
    const pdfPreviews = await PdfPreview.find().sort({ submittedAt: -1 });
    res.status(200).json(pdfPreviews);
  } catch (error) {
    console.error('Error fetching PDF previews:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  submitPdfPreviewForm,
  getAllPdfPreviews,
};
