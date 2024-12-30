const Product = require('../models/Product');

// POST: Add a new product with image upload
const addProduct = async (req, res) => {
  const { name, category, price, description, stock } = req.body;

  // Check if the required fields are present
  if (!name || !category || !price || !description || !stock) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Handle image upload (Multer provides the file in req.file)
  let imagePath = '';
  if (req.file) {
    // Store the image path
    imagePath = `/uploads/${req.file.filename}`;
  }

  try {
    const newProduct = new Product({
      name,
      category,
      price,
      description,
      stock,
      image: imagePath // Store the image path
    });
    await newProduct.save();
    return res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while adding the product.' });
  }
};

// GET: Get all products with optional filters, pagination, and sorting
const getProducts = async (req, res) => {
  const { page = 1, limit = 10, sortBy = 'name', sortOrder = 'asc', priceMin, priceMax } = req.query;

  const query = {};

  // Apply price range filter if provided
  if (priceMin) query.price = { $gte: Number(priceMin) };
  if (priceMax) query.price = { $lte: Number(priceMax) };

  const sort = {};
  sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

  try {
    const products = await Product.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    return res.status(200).json({
      products,
      total,
      page: Number(page),
      limit: Number(limit)
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching products.' });
  }
};

module.exports = {
  addProduct,
  getProducts
};
