const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');
// dotenv already loaded in app.js

// Contact form submission handler
const submitContactForm = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      trading_name,
      credit_rating,
      loan_type,
      business_trading_time,
      loan_amount,
      message,
      hidden_field, // Honeypot field
    } = req.body;

    // Check honeypot field for spam
    if (hidden_field) {
      return res.status(400).json({ message: 'Spam detected' });
    }

    // Validate required fields
    if (!name || !email || !phone || !credit_rating || !loan_type || !business_trading_time || !loan_amount || !message) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate loan amount
    if (loan_amount <= 0) {
      return res.status(400).json({ message: 'Loan amount must be greater than zero' });
    }

    // Validate phone number (basic check for digits and length)
    const phoneRegex = /^\+?\d{8,15}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number format' });
    }

    // Email content for admin
    const adminSubject = `New Contact Form Submission from ${name}`;
    const adminMessage = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Trading Name:</strong> ${trading_name || 'N/A'}</p>
      <p><strong>Credit Rating:</strong> ${credit_rating}</p>
      <p><strong>Type of Loan:</strong> ${loan_type}</p>
      <p><strong>Business Trading Time:</strong> ${business_trading_time}</p>
      <p><strong>Loan Amount:</strong> $${loan_amount}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    // Send email to admin
    const adminEmailResult = await sendEmail({
      email: "prathameshkate7717@gmail.com",
      subject: adminSubject,
      message: adminMessage,
      sender: "prathameshkate7717@gmail.com",
    });

    if (!adminEmailResult.success) {
      throw new Error('Failed to send admin email');
    }

    // Send confirmation email to submitter
    const confirmationSubject = 'Thank you for your contact form submission';
    const confirmationMessage = `
      <h2>Thank you for contacting us!</h2>
      <p>Dear ${name},</p>
      <p>We have received your message and will get back to you soon.</p>
      <p><strong>Your Details:</strong></p>
      <ul>
        <li>Name: ${name}</li>
        <li>Email: ${email}</li>
        <li>Phone: ${phone}</li>
        <li>Loan Amount: $${loan_amount}</li>
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
    const newContact = new Contact({
      name,
      email,
      phone,
      trading_name,
      credit_rating,
      loan_type,
      business_trading_time,
      loan_amount,
      message,
    });
    await newContact.save();

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    console.error('RECIPIENT_EMAIL:', process.env.RECIPIENT_EMAIL);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 }).maxTimeMS(30000); // Sort by newest first, set timeout to 30 seconds
    res.status(200).json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  submitContactForm,
  getContacts,
};
