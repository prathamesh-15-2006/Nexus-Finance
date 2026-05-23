const CustomEmailTemplate = require('../models/CustomEmailTemplate');

// Get all custom templates for the authenticated user
const getCustomTemplates = async (req, res) => {
  try {
    const templates = await CustomEmailTemplate.find({
      userId: req.admin.id,
      isActive: true
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: templates,
      count: templates.length
    });
  } catch (error) {
    console.error('Error fetching custom templates:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch custom templates',
      error: error.message
    });
  }
};

// Get a specific custom template
const getCustomTemplate = async (req, res) => {
  try {
    const template = await CustomEmailTemplate.findOne({
      _id: req.params.id,
      userId: req.admin.id,
      isActive: true
    });

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Custom template not found'
      });
    }

    res.status(200).json({
      success: true,
      data: template
    });
  } catch (error) {
    console.error('Error fetching custom template:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch custom template',
      error: error.message
    });
  }
};

// Create a new custom template
const createCustomTemplate = async (req, res) => {
  try {
    const { title, subject, icon, color, content, customStyles } = req.body;

    // Validation
    if (!title || !subject || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title, subject, and content are required'
      });
    }

    // Trim and validate input lengths
    const trimmedTitle = title.trim();
    const trimmedSubject = subject.trim();
    const trimmedContent = content.trim();

    if (trimmedTitle.length === 0 || trimmedSubject.length === 0 || trimmedContent.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Title, subject, and content cannot be empty'
      });
    }

    if (trimmedTitle.length > 255 || trimmedSubject.length > 255) {
      return res.status(400).json({
        success: false,
        message: 'Title and subject must be less than 255 characters'
      });
    }

    const newTemplate = new CustomEmailTemplate({
      userId: req.admin.id,
      title: trimmedTitle,
      subject: trimmedSubject,
      icon: icon || '📧',
      color: color || 'from-blue-500 to-blue-600',
      content: trimmedContent,
      customStyles: customStyles || ''
    });

    const savedTemplate = await newTemplate.save();

    res.status(201).json({
      success: true,
      data: savedTemplate,
      message: 'Custom template created successfully'
    });
  } catch (error) {
    console.error('Error creating custom template:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create custom template',
      error: error.message
    });
  }
};

// Update a custom template
const updateCustomTemplate = async (req, res) => {
  try {
    const { title, subject, icon, color, content, customStyles } = req.body;

    // Find the template first to ensure it exists and belongs to the user
    const existingTemplate = await CustomEmailTemplate.findOne({
      _id: req.params.id,
      userId: req.admin.id,
      isActive: true
    });

    if (!existingTemplate) {
      return res.status(404).json({
        success: false,
        message: 'Custom template not found'
      });
    }

    // Prepare update data
    const updateData = {};

    if (title !== undefined) {
      const trimmedTitle = title.trim();
      if (trimmedTitle.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Title cannot be empty'
        });
      }
      if (trimmedTitle.length > 255) {
        return res.status(400).json({
          success: false,
          message: 'Title must be less than 255 characters'
        });
      }
      updateData.title = trimmedTitle;
    }

    if (subject !== undefined) {
      const trimmedSubject = subject.trim();
      if (trimmedSubject.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Subject cannot be empty'
        });
      }
      if (trimmedSubject.length > 255) {
        return res.status(400).json({
          success: false,
          message: 'Subject must be less than 255 characters'
        });
      }
      updateData.subject = trimmedSubject;
    }

    if (content !== undefined) {
      const trimmedContent = content.trim();
      if (trimmedContent.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Content cannot be empty'
        });
      }
      updateData.content = trimmedContent;
    }

    if (icon !== undefined) updateData.icon = icon;
    if (color !== undefined) updateData.color = color;
    if (customStyles !== undefined) updateData.customStyles = customStyles;

    updateData.updatedAt = new Date();

    const updatedTemplate = await CustomEmailTemplate.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedTemplate,
      message: 'Custom template updated successfully'
    });
  } catch (error) {
    console.error('Error updating custom template:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update custom template',
      error: error.message
    });
  }
};

// Delete (soft delete) a custom template
const deleteCustomTemplate = async (req, res) => {
  try {
    const template = await CustomEmailTemplate.findOne({
      _id: req.params.id,
      userId: req.admin.id,
      isActive: true
    });

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Custom template not found'
      });
    }

    // Soft delete by setting isActive to false
    await CustomEmailTemplate.findByIdAndUpdate(req.params.id, {
      isActive: false,
      updatedAt: new Date()
    });

    res.status(200).json({
      success: true,
      message: 'Custom template deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting custom template:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete custom template',
      error: error.message
    });
  }
};

// Get template statistics for the user
const getTemplateStats = async (req, res) => {
  try {
    const stats = await CustomEmailTemplate.aggregate([
      {
        $match: {
          userId: req.admin.id,
          isActive: true
        }
      },
      {
        $group: {
          _id: null,
          totalTemplates: { $sum: 1 },
          recentTemplates: {
            $sum: {
              $cond: [
                { $gte: ['$createdAt', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)] },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    const result = stats[0] || { totalTemplates: 0, recentTemplates: 0 };

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching template stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch template statistics',
      error: error.message
    });
  }
};

module.exports = {
  getCustomTemplates,
  getCustomTemplate,
  createCustomTemplate,
  updateCustomTemplate,
  deleteCustomTemplate,
  getTemplateStats
};
