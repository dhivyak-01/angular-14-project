const express = require('express');
const Banner = require('../models/banner'); // Authentication middleware
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

// Route to handle Banner creation with file upload
router.post('/banner', upload.single('image'), async (req, res) => {
  const { title, description, caption, content } = req.body;
  const image = req.file ? req.file.path : null; // The file path of the uploaded image

  try {
    const newBanner = new Banner({
      title,
      description,
      image, // Save the file path in the database
      caption,
      content,
    });

    await newBanner.save();
    return res.status(201).json({ message: 'Banner created successfully', Banner: newBanner });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create Banner. Please try again later.' });
  }
});

// GET: Get all Banner with pagination, sorting, and filtering
router.get('/banner', async (req, res) => {
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

    const banners = await Banner.find(filter)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalBanners = await Banner.countDocuments(filter);

    return res.status(200).json({
      banners,
      total: totalBanners,
      page,
      limit: Number(limit)
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch Banner. Please try again later.' });
  }
});



router.delete('/banner/:id', async (req, res) => {
  const { id } = req.params; // Get the ID from the URL

  try {
    const deletedBanner = await Banner.findByIdAndDelete(id); // Find and delete the Banner by ID

    if (!deletedBanner) {
      return res.status(404).json({ message: 'Banner not found' }); // If no Banner was found, return a 404
    }

    return res.status(200).json({ message: 'Banner deleted successfully', banner: deletedBanner });
  } catch (error) {
    console.error('Error deleting Banner:', error);
    return res.status(500).json({ message: 'Error deleting Banner', error });
  }
});


module.exports = router;
