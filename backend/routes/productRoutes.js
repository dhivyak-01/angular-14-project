const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Store the files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  // Use a timestamp to prevent filename conflicts
  }
});

const upload = multer({ storage: storage });

// Route to handle product creation with file upload
router.post('/products', upload.single('image'), async (req, res) => {
  const { title, description, duration, lectures, price } = req.body;
  const image = req.file ? req.file.path : null; // The file path of the uploaded image

  try {
    const newProduct = new Product({
      title,
      description,
      image, // Save the file path in the database
      duration,
      lectures,
      price,
    });

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



router.delete('/products/:id', async (req, res) => {
  const { id } = req.params; // Get the ID from the URL

  try {
    const deletedProduct = await Product.findByIdAndDelete(id); // Find and delete the product by ID

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' }); // If no product was found, return a 404
    }

    return res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ message: 'Error deleting course', error });
  }
});


module.exports = router;
