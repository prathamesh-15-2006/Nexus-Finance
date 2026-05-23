const mongoose = require('mongoose');

const draftLeadSchema = new mongoose.Schema({
  loan_type: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  contact_number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  unique_id: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['draft', 'confirmed', 'expired'],
    default: 'draft',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 604800, // Expire after 7 days (optional, for automatic cleanup)
  },
});

module.exports = mongoose.model('DraftLead', draftLeadSchema);
