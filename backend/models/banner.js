const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({

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
  
}, {
  timestamps: true
});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
