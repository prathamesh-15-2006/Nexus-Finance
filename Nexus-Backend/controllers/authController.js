// controllers/authController.js

const sendEmail = require("../utils/sendEmail");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// =============================
// Generate JWT Token
// =============================
const generateToken = (id) => {
  if (!JWT_SECRET) {
    throw new Error("❌ JWT_SECRET is missing in environment variables");
  }

  return jwt.sign({ id, role: "admin" }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

// =============================
// Create Password Reset Token
// =============================
const createPasswordResetToken = (admin) => {
  const resetToken = jwt.sign({ id: admin._id }, JWT_SECRET, {
    expiresIn: "15m",
  });

  admin.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  admin.passwordResetExpires = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

// =============================
// Admin Signup
// =============================
exports.adminSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check existing admin by email
    const existingAdminByEmail = await Admin.findOne({
      email: normalizedEmail,
    });

    if (existingAdminByEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

   

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin
    const admin = await Admin.create({
      username: normalizedUsername,
      email: normalizedEmail,
      password: hashedPassword,
    });

    // Response without password
    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
    });

  } catch (err) {
    console.error("Signup Error:", err);

    // Handle MongoDB duplicate key errors
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
      });
    }

    res.status(500).json({
      message: "Server error during signup",
    });
  }
};
// =============================
// Admin Login
// =============================
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid password" });

    const token = generateToken(admin._id);

    res.json({
      message: "Login successful",
      token,
      admin,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// =============================
// Forgot Password
// =============================
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ message: "Email is required" });

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin)
      return res.status(404).json({ message: "Admin not found" });

    const resetToken = createPasswordResetToken(admin);
    await admin.save({ validateBeforeSave: false });

    const resetURL = `https://nexus-finance-935e5.web.app/reset-password/${resetToken}`;

    const message = `
      <h2>Password Reset</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetURL}">${resetURL}</a>
      <p>This link is valid for 15 minutes.</p>
    `;

    const emailResult = await sendEmail({
      email: admin.email,
      subject: "Password Reset Request",
      message,
    });

    if (!emailResult.success) {
      return res.status(500).json({
        message: "Email sending failed. Try again later.",
      });
    }

    res.json({ message: "Password reset email sent successfully" });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// =============================
// Show Reset Form
// =============================
exports.showResetForm = async (req, res) => {
  res.send(`
    <html>
      <body style="font-family: Arial; padding: 40px;">
        <h2>Reset Password</h2>
        <form method="POST">
          <input 
            type="password" 
            name="password" 
            placeholder="Enter new password" 
            required 
            style="padding:10px; width:250px;"
          />
          <br/><br/>
          <button type="submit" style="padding:10px 20px;">
            Reset Password
          </button>
        </form>
      </body>
    </html>
  `);
};

// =============================
// Reset Password
// =============================
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, JWT_SECRET);

    const admin = await Admin.findById(decoded.id);
    if (!admin)
      return res.status(404).json({ message: "Invalid token" });

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);

    admin.passwordResetToken = undefined;
    admin.passwordResetExpires = undefined;

    await admin.save();

    res.json({ message: "Password reset successful!" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(400).json({
      message: "Invalid or expired token",
      error: err.message,
    });
  }
};

// =============================
// Get Profile
// =============================
exports.getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json({ admin });
  } catch (err) {
    console.error("Get Profile Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// =============================
// Update Profile Picture
// =============================
exports.updateProfilePic = async (req, res) => {
  try {
    console.log('req.file:', req.file); // Debug log
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    admin.profilePic = req.file.path; // Assuming Cloudinary returns the path
    console.log('Setting profilePic to:', req.file.path); // Debug log
    await admin.save();
    console.log('Saved admin:', admin); // Debug log

    // Fetch updated admin without password
    const updatedAdmin = await Admin.findById(req.admin.id).select('-password');
    res.json({ message: "Profile picture updated successfully", admin: updatedAdmin });
  } catch (err) {
    console.error("Update Profile Pic Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
