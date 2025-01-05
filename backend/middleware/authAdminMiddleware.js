const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const dotenv = require('dotenv');

dotenv.config();

// Middleware to authenticate admin based on JWT token
const authenticateAdmin = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Extract token

  if (!token) {
    return res.status(401).json({ error: 'Authorization token is missing or invalid.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token

    const admin = await Admin.findById(decoded.id);  // Find the admin in DB using the ID from the token
    if (!admin) {
      return res.status(401).json({ error: 'Admin not found.' });
    }

    // Check if the user is an admin
    if (!admin.isAdmin) {
      return res.status(403).json({ error: 'Access denied: Not an admin.' });
    }

    req.admin = admin;  // Attach the admin info to the request object
    next();  // Continue to the next route or middleware
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Invalid or expired token.' });  // Invalid token
  }
};

module.exports = authenticateAdmin;
