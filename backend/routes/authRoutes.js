const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { getAllUsers, deleteUserById, updateUser } = require('../controllers/user')
// Register Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);

// to get all user for adminpanel
router.get('/users', getAllUsers);
// to delete user by id from adminpanel
router.delete('/users/:userId', deleteUserById);

router.put('/users/:id', updateUser);

module.exports = router;
