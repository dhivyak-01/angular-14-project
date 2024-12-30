const express = require('express');
const Product = require('../models/Product');
const authenticateUser = require('../middleware/auth');  // Authentication middleware
const router = express.Router();

// POST: Add a new product
router.post('/products', authenticateUser, async (req, res) => {
  const { name, category, price, description, stock, image } = req.body;

  try {
    // Create a new product document
    const newProduct = new Product({
      name,
      category,
      price,
      description,
      stock,
      image
    });

    // Save the product to the database
    await newProduct.save();
    return res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create product. Please try again later.' });
  }
});

// GET: Get all products with pagination, sorting, and filtering
router.get('/products', async (req, res) => {
  const { page = 1, limit = 10, sortBy = 'name', sortOrder = 'asc', priceMin, priceMax } = req.query;

  try {
    const filter = {};

    // Add price range filter if provided
    if (priceMin && priceMax) {
      filter.price = { $gte: priceMin, $lte: priceMax };
    }

    // Sort order and pagination
    const sortOptions = {
      [sortBy]: sortOrder === 'asc' ? 1 : -1
    };

    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalProducts = await Product.countDocuments(filter);

    return res.status(200).json({
      products,
      total: totalProducts,
      page,
      limit: Number(limit)
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch products. Please try again later.' });
  }
});

module.exports = router;
