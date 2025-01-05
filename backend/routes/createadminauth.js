const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Admin = require('../models/admin'); // Make sure the path to your Admin model is correct
const router = express.Router();

// Route to create a new admin
router.post('/api/admin/create', async (req, res) => {
  const { username, password } = req.body;

  // Validate the input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    // Check if the admin already exists with the given username
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists with that username.' });
    }

    // Hash the password using bcrypt
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log('Hashed password:', hashedPassword); 
    // Create a new admin object
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
      isAdmin: true, // Ensure that this is an admin
    });

    // Save the new admin to the database
    await newAdmin.save();

    return res.status(201).json({ message: 'New admin created successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
  }
});




// Export the router
module.exports = router;
