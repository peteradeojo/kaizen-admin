import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  idValue: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [String],
  category: [String],
  colors: [String],
  sizes: [[String]],
  collectionName: String,
  link: String,
  dateAdded: {
    type: Date,
    required: true,
  },
  status: {
    type: Number,
    enum: [0, 1, 2],
    default: 1,
  },
});

module.exports = mongoose.model('product', productSchema);
