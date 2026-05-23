const express = require('express');
const { createDraftLead, submitLoanApplication, getLoanApplications, getDraftLeads, deleteDraftLead } = require('../controllers/Loan-Application');

const router = express.Router();

// Get all loan applications route (root)
router.get('/', getLoanApplications);

// Create draft lead route
router.post('/draft', createDraftLead);

// Loan Application form submission route
router.post('/submit', submitLoanApplication);

// Get all loan applications route
router.get('/loan-applications', getLoanApplications);

// Get all draft leads route (admin)
router.get('/draft-leads', getDraftLeads);

// Delete draft lead route (admin)
router.delete('/draft-leads/:id', deleteDraftLead);

module.exports = router;
