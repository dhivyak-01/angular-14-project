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

// Route to delete an order by ID
router.delete('/customerorders/:id', async (req, res) => {
  const { id } = req.params;  // Get the order ID from the URL parameters

  try {
    // Attempt to find and delete the order by its ID
    const result = await Order.findByIdAndDelete(id);

    // If no order is found with the given ID, return a 404 response
    if (!result) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Return a success message if the order is successfully deleted
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    // Return an error response if there is a problem with deletion
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
});

module.exports = router;
