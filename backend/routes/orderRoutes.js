const express = require('express');
const multer = require('multer');
const path = require('path');
const Order = require('../models/order');
const Product = require('../models/Product');
const authenticateUser = require('../middleware/auth');
const authenticateAdmin = require('../middleware/authAdminMiddleware');
const router = express.Router();
// Set up Multer to store uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Store files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Unique file name based on timestamp
  },
});

const upload = multer({ storage });
// POST: Place a new order
router.post('/orders', authenticateUser, upload.single('image'), async (req, res) => {
  const { userId, name, phoneNumber, products, shippingAddress, paymentMethod, totalAmount } = req.body;
  const imagePath = req.file ? req.file.path : null;

  // Validate required fields
  if (!userId || !name || !phoneNumber || !products || !shippingAddress || !paymentMethod || !totalAmount) {
    return res.status(400).json({ error: 'Invalid input. Please check the provided data.' });
  }

  // Check if all products exist and validate stock
  try {
    const productIds = products.map(item => item.productId);
    const dbProducts = await Product.find({ '_id': { $in: productIds } });

    if (dbProducts.length !== products.length) {
      return res.status(404).json({ error: 'One or more products could not be found.' });
    }

    // Check if there is enough stock for each product
    for (const item of products) {
      const product = dbProducts.find(p => p._id.toString() === item.productId);
      if (product.stock < item.quantity) {
        return res.status(409).json({ error: `Insufficient stock for ${product.name}.` });
      }
    }

    // Create a new order
    const newOrder = new Order({
      userId,
      name,
      phoneNumber,
      image: imagePath, 
      products,
      shippingAddress,
      paymentMethod,
      totalAmount,
      status: 'pending',
      orderDate: new Date()
    });

    // Save the order in the database
    await newOrder.save();

    // Reduce the stock for each ordered product
    for (const item of products) {
      const product = dbProducts.find(p => p._id.toString() === item.productId);
      product.stock -= item.quantity;
      await product.save();
    }

    return res.status(201).json({
      orderId: newOrder._id,
      status: newOrder.status,
      message: 'Order placed successfully.'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
  }
});



// GET: Get a list of orders (or specific order) for a user
router.get('/orders', authenticateUser, async (req, res) => {
    const { userId } = req.query;

    // Ensure the userId matches the authenticated user
    if (req.user._id.toString() !== userId) {
      return res.status(401).json({ error: 'Unauthorized access to this user\'s orders.' });
    }

    try {
      // Fetch orders for the given user
      const orders = await Order.find({ userId })
        .skip(Number(req.query.page - 1) * Number(req.query.limit))
        .limit(Number(req.query.limit));

      const totalOrders = await Order.countDocuments({ userId });

      return res.status(200).json({
        orders,
        total: totalOrders,
        page: req.query.page || 1,
        limit: req.query.limit || 10
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
    }
  });


module.exports = router;