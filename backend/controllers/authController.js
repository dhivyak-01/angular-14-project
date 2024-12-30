const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const User = require('../models/user');
const { JWT_SECRET, JWT_EXPIRATION } = require('../config/config');

// Register a new user
const registerUser = async (req, res) => {
  const { username, password, email, firstName, lastName, phoneNumber, dateOfBirth } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: "Invalid input. Please check the provided data." });
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(409).json({ error: "Username or email already exists." });
  }

  const usernamePattern = /^[a-zA-Z0-9]{4,20}$/;
  if (!usernamePattern.test(username)) {
    return res.status(400).json({ error: "Username must be alphanumeric and between 4 to 20 characters." });
  }

  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordPattern.test(password)) {
    return res.status(400).json({ error: "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character." });
  }

  const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  if (phoneNumber && !/^\d{3}-\d{3}-\d{4}$/.test(phoneNumber)) {
    return res.status(400).json({ error: "Invalid phone number format. Use 123-456-7890." });
  }

  if (dateOfBirth && !moment(dateOfBirth, 'YYYY-MM-DD', true).isValid()) {
    return res.status(400).json({ error: "Invalid date of birth format. Use YYYY-MM-DD." });
  }
  
  if (dateOfBirth && moment().diff(moment(dateOfBirth), 'years') < 13) {
    return res.status(400).json({ error: "User must be at least 13 years old." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth,
    });

    await newUser.save();

    return res.status(201).json({
      userId: newUser._id,
      message: "User registered successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An unexpected error occurred. Please try again later." });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // const token = jwt.sign(
    //   { userId: user._id, role: user.role },
    //   JWT_SECRET,
    //   { expiresIn: JWT_EXPIRATION }
    // );

    const token = jwt.sign(
        { userId: user._id, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRATION }
      );

    return res.status(200).json({
      token,
      expiresIn: 3600, // 1 hour in seconds
      userId: user._id,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An unexpected error occurred. Please try again later." });
  }
};

module.exports = { registerUser, loginUser };
