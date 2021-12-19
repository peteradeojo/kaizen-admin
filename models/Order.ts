import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema({});

module.exports = mongoose.model('order', orderSchema);
