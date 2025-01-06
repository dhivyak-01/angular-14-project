// models/order.js
const mongoose = require("mongoose");

// Define the schema for the products in the order
const productSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  image: String,
  quantity: Number,
});

// Define the schema for the shipping address
const shippingAddressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
});

// Define the order schema
const orderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String, // Added for fields like "name" and "phoneNumber"
  phoneNumber: String,
  products: [productSchema],
  shippingAddress: shippingAddressSchema,
  paymentMethod: String,
  totalAmount: Number,
  status: String,
  orderDate: Date,
});

// Avoid model overwriting by checking if the model is already compiled
module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
