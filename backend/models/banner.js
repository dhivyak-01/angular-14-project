const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  isEnabled: { type: Boolean, required: true },
  
}, {
  timestamps: true
});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
