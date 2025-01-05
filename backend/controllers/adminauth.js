const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');  // Assuming you have an Admin model
const { JWT_SECRET, JWT_EXPIRATION } = require('../config/config');

// Admin Login
const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  // Ensure both username and password are provided
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  try {
    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Compare provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { adminId: admin._id, username: admin.username, isAdmin: admin.isAdmin },
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRATION || '1h' }  // Default expiration of 1 hour
    );

    // Send response with token and other user info
    return res.status(200).json({
      token,
      expiresIn: 3600, // 1 hour in seconds
      adminId: admin._id,
      role: admin.isAdmin ? 'admin' : 'user',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An unexpected error occurred. Please try again later." });
  }
};

module.exports = { adminLogin };
