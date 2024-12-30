const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');

dotenv.config();

// Middleware to authenticate users based on JWT
const authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Remove 'Bearer ' from token
  
    if (!token) {
      return res.status(401).json({ error: 'Authorization token is missing or invalid.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token using the same secret used for signing
  
      const user = await User.findById(decoded.userId);  // Find the user associated with the token
  
      if (!user) {
        return res.status(401).json({ error: 'User not found.' });
      }
  
      req.user = user;  // Attach user info to request object
      next();  // Continue to the next middleware or route handler
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: 'Invalid or expired token.' });  // Invalid or expired token
    }
  };

module.exports = authenticateUser;
