// routes/orderRoutes.js
const express = require('express');
const Order = require('../models/allorder'); // Import the Order model
const router = express.Router();

// Route to fetch all orders
router.get('/customerorders', async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find();

    // If no orders are found, return a 404 response
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No customer orders found' });
    }

    // Return the orders with a 200 status
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err });
  }
});

module.exports = router;
