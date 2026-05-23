const express = require('express');
const router = express.Router();
const customEmailTemplateController = require('../controllers/customEmailTemplateController');
const authMiddleware = require('../middlewares/authMiddleware');

// Get all custom templates
router.get('/', authMiddleware, customEmailTemplateController.getCustomTemplates);

// Get a specific custom template
router.get('/:id', authMiddleware, customEmailTemplateController.getCustomTemplate);

// Create a new custom template
router.post('/', authMiddleware, customEmailTemplateController.createCustomTemplate);

// Update a custom template
router.put('/:id', authMiddleware, customEmailTemplateController.updateCustomTemplate);

// Delete a custom template
router.delete('/:id', authMiddleware, customEmailTemplateController.deleteCustomTemplate);

// Get template statistics
router.get('/stats/overview', authMiddleware, customEmailTemplateController.getTemplateStats);

module.exports = router;
