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
  const { name, title, description, duration, lectures, price } = req.body;
  const image = req.file ? req.file.path : null; // The file path of the uploaded image

  try {
    const newProduct = new Product({
      name,
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

router.get('/products', async (req, res) => {
  const { priceMin, priceMax } = req.query; // Removed pagination parameters

  try {
    const filter = {};

    // Add price range filter if provided
    if (priceMin && priceMax) {
      filter.price = { $gte: priceMin, $lte: priceMax };
    }

    // Fetch products without pagination or sorting
    const products = await Product.find(filter);  // No .skip() or .limit()

    return res.status(200).json({
      products,
      total: products.length,  // Total number of products fetched
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



router.put('/products/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { title, description, duration, lectures, price } = req.body;

  // If a new image is uploaded, get its path; else keep the old image
  let image = req.file ? req.file.path : null;

  try {
    // Find the product to update
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // If no image is uploaded, keep the old image
    if (!image) {
      image = existingProduct.image;
    }

    // Update the product with the new data and image path
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { title, description, image, duration, lectures, price },
      { new: true }  // Return the updated product
    );

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product', error });
  }
});



module.exports = router;
