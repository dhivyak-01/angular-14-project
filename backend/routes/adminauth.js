const express = require('express');
const { adminLogin } = require('../controllers/adminauth'); // Import adminLogin from the controller

const router = express.Router();

// Admin login route
router.post('/login', adminLogin);

module.exports = router;
