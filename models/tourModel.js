const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour name is required'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour price is requried'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'A tour must have description'],
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDate: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
