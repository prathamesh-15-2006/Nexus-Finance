const Lead = require('../models/leads');

// Create a new lead
const createLead = async (req, res) => {
  try {
    // Ensure new leads have consistent fields with other lead types
    const lead = new Lead({
      ...req.body,
      isArchived: false,
      status: 'New', // Ensure a default status that matches the schema enum
      submittedAt: new Date(), // Add a consistent timestamp
    });
    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a lead
const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        // Explicitly prevent isArchived from being changed by this function
        isArchived: undefined,
      },
      { new: true, runValidators: true }
    );
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a lead
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createLead, updateLead, deleteLead };
