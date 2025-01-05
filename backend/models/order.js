// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   products: [{
//     productId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Product',
//       required: true
//     },
//     quantity: {
//       type: Number,
//       required: true,
//       min: 1
//     }
//   }],
//   shippingAddress: {
//     street: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     postalCode: { type: String, required: true },
//     country: { type: String, required: true }
//   },
//   paymentMethod: {
//     type: String,
//     enum: ['cod', 'credit_card', 'paypal'],
//     required: true
//   },
//   totalAmount: {
//     type: Number,
//     required: true
//   },
  // status: {
  //   type: String,
  //   enum: ['pending', 'shipped', 'delivered', 'canceled'],
  //   default: 'pending'
  // },
  // orderDate: {
  //   type: Date,
  //   default: Date.now
  // }
// });

// module.exports = mongoose.model('Order', orderSchema);



const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  phoneNumber: String,
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number
  }],
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  paymentMethod: String,
  totalAmount: Number,
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'canceled'],
    default: 'pending'
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
