const mongoose = require('mongoose');

const customEmailTemplateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [255, 'Title cannot be more than 255 characters'],
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [255, 'Subject cannot be more than 255 characters'],
  },
  icon: {
    type: String,
    default: '📧',
  },
  color: {
    type: String,
    default: 'from-blue-500 to-blue-600',
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
  },
  customStyles: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true, // This will add createdAt and updatedAt fields
});

module.exports = mongoose.model('CustomEmailTemplate', customEmailTemplateSchema);