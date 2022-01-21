const mongoose = require('mongoose');

const { Schema } = mongoose;

// const promoSchema;

const productSchema = new Schema({
  idValue: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: [String],
  colors: [String],
  sizes: [
    {
      name: String,
      // code: String,
    },
  ],
  price: Number,
  images: [String],
  link: String,
  collectionName: String,
  status: {
    type: Number,
    enum: [0, 1, 2],
    default: 1,
  },
  // promo: PromoSchema,
  createdOn: {
    type: Date,
    default: Date().valueOf(),
  },
  quantity: { type: Number, default: 0 },
});

module.exports = mongoose.model('products', productSchema);
