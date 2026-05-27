const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  trading_name: {
    type: String,
    default: null,
  },
  credit_rating: {
    type: String,
    required: true,
  },
  loan_type: {
    type: String,
    required: true,
  },
  business_trading_time: {
    type: String,
    required: true,
  },
  loan_amount: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['new', 'contacted'],
    default: 'new',
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

// Add descending index on submittedAt for efficient sorting
contactSchema.index({ submittedAt: -1 });

module.exports = mongoose.model('Contact', contactSchema);
