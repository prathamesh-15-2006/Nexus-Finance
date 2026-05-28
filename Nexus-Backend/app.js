const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const adminRoutes = require('./routes/adminRoutes');
const emailRoutes = require('./routes/emailRoutes');
const customEmailTemplateRoutes = require('./routes/customEmailTemplateRoutes');
const clientDealRoutes = require('./routes/clientDealRoutes');
const contactRoutes = require('./routes/contactRoutes');
const leadsRoutes = require('./routes/leadsRoutes');
const loanApplicationRoutes = require('./routes/loanApplicationRoutes');
const partnerRoutes = require('./routes/partnerRoutes');
const pdfPreviewRoutes = require('./routes/pdfPreviewRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

// Import database connection
const connectDB = require('./config/database');

// Create Express app
const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Connect to database
connectDB();

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/templates', customEmailTemplateRoutes);

app.use('/api/deals', clientDealRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/loan-application', loanApplicationRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/pdf-preview', pdfPreviewRoutes);
app.use('/api/settings', settingsRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
