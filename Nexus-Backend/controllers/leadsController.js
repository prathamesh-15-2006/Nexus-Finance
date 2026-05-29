const Contact = require('../models/Contact');
const LoanApplication = require('../models/LoanApplication');
const PdfPreview = require('../models/PdfPreview');
const Lead = require('../models/leads');
const ClientDeal = require('../models/ClientDeal');
const PartnerApplication = require('../models/PartnerApplication');
const DraftLead = require('../models/DraftLead');

const getModelByType = (type) => {
  switch (type) {
    case 'contact':
      return Contact;
    case 'loan-application':
      return LoanApplication;
    case 'pdf-preview':
      return PdfPreview;
    case 'lead':
      return Lead;
    case 'client-deal':
      return ClientDeal;
    case 'partner-application':
      return PartnerApplication;
    case 'draft-lead':
      return DraftLead;
    default:
      return null;
  }
};

/**
 * A generic function to fetch and combine leads from all sources based on a query.
 * @param {object} query - The MongoDB query object (e.g., for archived status).
 * @returns {Promise<Array>} - A promise that resolves to a sorted array of all leads.
 */
const fetchAndCombineLeads = async (query) => {
  try {
    const sources = [
      { model: Contact, type: 'contact', dateKey: 'submittedAt' },
      { model: LoanApplication, type: 'loan-application', dateKey: 'submittedAt' },
      { model: PdfPreview, type: 'pdf-preview', dateKey: 'submittedAt' },
      { model: Lead, type: 'lead', dateKey: 'submittedAt' },
      { model: ClientDeal, type: 'client-deal', dateKey: 'submittedAt' },
      { model: PartnerApplication, type: 'partner-application', dateKey: 'appliedAt' },
      { model: DraftLead, type: 'draft-lead', dateKey: 'createdAt' },
    ];

    const promises = sources.map(source =>
      source.model.find(query).sort({ [source.dateKey]: -1 }).lean()
        .then(docs => docs.map(doc => ({ ...doc, type: source.type })))
    );

    const results = await Promise.all(promises);
    const combinedLeads = results.flat();

    combinedLeads.sort((a, b) => {
      const dateA = new Date(a.submittedAt || a.appliedAt || a.createdAt || 0);
      const dateB = new Date(b.submittedAt || b.appliedAt || b.createdAt || 0);
      return dateB - dateA;
    });

    return combinedLeads;
  } catch (error) {
    // Re-throw the error to be caught by the calling controller function
    throw error;
  }
};

const getAllLeads = async (req, res) => {
  try {
    const showArchived = req.query.archived === 'true';
    const query = showArchived ? { isArchived: true } : { isArchived: { $ne: true } };
    const allLeads = await fetchAndCombineLeads(query);

    res.status(200).json({
      totalLeads: allLeads.length,
      leads: allLeads,
    });
  } catch (error) {
    console.error('Error fetching all leads:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const archiveLead = async (req, res) => {
  const { type, id } = req.params;
  const Model = getModelByType(type);

  if (!Model) {
    return res.status(400).json({ message: 'Invalid lead type' });
  }

  try {
    const lead = await Model.findByIdAndUpdate(id, { isArchived: true }, { new: true });

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.status(200).json({ message: 'Lead archived successfully', lead });
  } catch (error) {
    console.error(`Error archiving lead:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const unarchiveLead = async (req, res) => {
  const { type, id } = req.params;
  const Model = getModelByType(type);

  if (!Model) {
    return res.status(400).json({ message: 'Invalid lead type' });
  }

  try {
    const lead = await Model.findByIdAndUpdate(id, { isArchived: false }, { new: true });

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.status(200).json({ message: 'Lead unarchived successfully', lead });
  } catch (error) {
    console.error(`Error unarchiving lead:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getArchivedLeads = async (req, res) => {
  try {
    const query = { isArchived: true };
    const allLeads = await fetchAndCombineLeads(query);

    res.status(200).json({
      totalLeads: allLeads.length,
      leads: allLeads,
    });
  } catch (error) {
    console.error('Error fetching archived leads:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getUnarchivedLeads = async (req, res) => {
  try {
    const query = { isArchived: { $ne: true } };
    const allLeads = await fetchAndCombineLeads(query);

    res.status(200).json({
      totalLeads: allLeads.length,
      leads: allLeads,
    });
  } catch (error) {
    console.error('Error fetching unarchived leads:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllLeads,
  archiveLead,
  unarchiveLead,
  getArchivedLeads,
  getUnarchivedLeads,
};
