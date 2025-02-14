const express = require("express");
const Banner = require("../models/banner"); // Authentication middleware
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Store the files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a timestamp to prevent filename conflicts
  },
});

const upload = multer({ storage: storage });

// Route to handle Banner creation with file upload
router.post("/banner", upload.single("image"), async (req, res) => {
  const { id, title, description, caption, content, isEnabled } = req.body;
  const image = req.file ? req.file.path : null; // The file path of the uploaded image

  const status = isEnabled === 'true'; 

  try {
    const newBanner = new Banner({
      id,
      title,
      description,
      image, // Save the file path in the database
      caption,
      content,
      isEnabled: status 
    });

    await newBanner.save();
    return res
      .status(201)
      .json({ message: "Banner created successfully", Banner: newBanner });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to create Banner. Please try again later." });
  }
});



router.get('/banner/:id', async (req, res) => {
  const bannerId = req.params.id;  // Access the 'id' from the URL parameter

  try {
    // Find the banner by its MongoDB ObjectId
    const banner = await Banner.findById(bannerId);

    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    res.json(banner);  // Return the banner data as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching banner' });
  }
});

router.get("/banner", async (req, res) => {
  try {
    // Fetch all banners without pagination
    const banners = await Banner.find();

    return res.status(200).json({
      banners, // Just return the banners array without pagination metadata
    });
  } catch (error) {
    console.error("Error fetching banners:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch Banner. Please try again later." });
  }
});

router.delete("/banner/:id", async (req, res) => {
  const { id } = req.params; // Get the ID from the URL

  try {
    const deletedBanner = await Banner.findByIdAndDelete(id); // Find and delete the Banner by ID

    if (!deletedBanner) {
      return res.status(404).json({ message: "Banner not found" }); // If no Banner was found, return a 404
    }

    return res
      .status(200)
      .json({ message: "Banner deleted successfully", banner: deletedBanner });
  } catch (error) {
    console.error("Error deleting Banner:", error);
    return res.status(500).json({ message: "Error deleting course", error });
  }
});

router.put("/banner/:id", upload.single("image"), async (req, res) => {
  const bannerId = req.params.id;
  const { title, description, content, caption, isEnabled } = req.body;
  const updateData = { title, description, content, caption, isEnabled };

  // If a new image is provided, update the image field
  if (req.file) {
    updateData.image = req.file.path;
  }

  try {
    const updatedBanner = await Banner.findByIdAndUpdate(bannerId, updateData, {
      new: true,
    });
    if (!updatedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    res.json(updatedBanner);
  } catch (error) {
    res.status(500).json({ message: "Error updating banner", error });
  }
});

module.exports = router;
