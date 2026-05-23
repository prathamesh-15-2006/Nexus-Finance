const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');
const authMiddleware = require('../middlewares/authMiddleware');

// Existing template sending (automated)
router.post('/send-template', authMiddleware, emailController.sendEmailTemplate);
router.get('/lead-details/:type/:id', authMiddleware, emailController.getLeadDetails);

// Manual email sending (Admin UI)
router.get('/templates', authMiddleware, emailController.getAvailableTemplates);
router.post('/manual-send', authMiddleware, emailController.sendManualEmail);

module.exports = router;