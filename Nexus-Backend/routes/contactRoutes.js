const express = require('express');
const { submitContactForm, getContacts } = require('../controllers/contactController');

const router = express.Router();

// POST /api/contact - Contact form submission route
router.post('/', submitContactForm);

// Get all contacts route
router.get('/', getContacts);

module.exports = router;
