import express from 'express';

const router = express.Router();

const Product = require('../models/Product');
module.exports = () => {
  router.get('/', async (req, res) => {
    const products = await Product.find();
    res.render('products', { products });
  });

  return router;
};
