// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middlewares/authMiddleware');
const { upload } = require('../utils/cloudinary');

console.log('Admin routes file loaded');

// Test route
router.get('/test', (req, res) => res.send('Admin routes working'));

// 1. Create Demo Admin
router.post('/signup', authController.adminSignup);

// 2. Login
router.post('/login', authController.adminLogin);

// 3. Forgot Password
router.post('/forgotpassword', authController.forgotPassword);

// 4. Reset Password
// Show reset password form
router.get('/resetpassword/:token', authController.showResetForm);

// Handle new password submit
router.post('/resetpassword/:token', authController.resetPassword);

// 5. Get Profile
router.get('/profile', authMiddleware, authController.getProfile);

// 6. Update Profile Picture
router.put('/update-profile-pic', authMiddleware, upload.single('profilePic'), authController.updateProfilePic);

// 7. Get Total Visitors from Google Analytics
router.get('/analytics/total-visitors', authMiddleware, analyticsController.getTotalVisitors);

// 8. Get Daily Visitors
router.get('/analytics/daily-visitors', authMiddleware, analyticsController.getDailyVisitors);

// 9. Get Weekly Visitors
router.get('/analytics/weekly-visitors', authMiddleware, analyticsController.getWeeklyVisitors);

// 10. Get Monthly Visitors
router.get('/analytics/monthly-visitors', authMiddleware, analyticsController.getMonthlyVisitors);

// 11. Get Yearly Visitors
router.get('/analytics/yearly-visitors', authMiddleware, analyticsController.getYearlyVisitors);

module.exports = router;
