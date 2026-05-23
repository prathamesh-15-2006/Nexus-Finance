const express = require('express');
const router = express.Router();
const { submitClientDeal, getAllClientDeals } = require('../controllers/clientDealController');

// POST request to submit a new deal
// The full path will be /api/deals
router.post('/', submitClientDeal);

// GET request to fetch all client deals
router.get('/', getAllClientDeals);

module.exports = router;
