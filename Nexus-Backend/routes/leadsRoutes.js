const express = require('express');
const { getAllLeads, archiveLead, unarchiveLead, getArchivedLeads, getUnarchivedLeads } = require('../controllers/leadsController');

const router = express.Router();

// GET all leads combined
router.get('/', getAllLeads);

// GET archived leads
router.get('/archived', getArchivedLeads);

// GET unarchived leads
router.get('/unarchived', getUnarchivedLeads);

// Archive a lead
router.patch('/:type/:id/archive', archiveLead);

// Unarchive a lead
router.patch('/:type/:id/unarchive', unarchiveLead);

module.exports = router;
