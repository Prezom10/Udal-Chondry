
const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  availableSeats: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Tour', TourSchema);
