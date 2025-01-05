const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { DB_URI } = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminauthRoutes = require('./routes/adminauth');
const authenticateAdmin = require('./middleware/authAdminMiddleware');
const adminAuthRouter = require('./routes/adminauth');
const path = require('path');
const app = express();

dotenv.config();
// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());  // Enable Cross-Origin Resource Sharing

// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

// Routes
app.use('/api', authRoutes); // Use /api prefix for all authentication routes


// Use product routes
app.use('/api', productRoutes);

app.use('/api', orderRoutes);

app.use('/admin', adminauthRoutes);

// Protected admin route using JWT middleware
app.get('/api/adminpanel', authenticateAdmin, (req, res) => {
  res.status(200).json({ message: 'Welcome to the Admin Dashboard!', admin: req.admin });
});

app.use('/api/admin', adminAuthRouter);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "An unexpected error occurred. Please try again later." });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
