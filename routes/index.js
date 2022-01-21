const express = require('express');
const debug = require('debug')('app:index-route');

const router = express.Router();

const Products = require('../models/Product');

const { validateLogin } = require('../middleware/functions');

module.exports = () => {
  router.route('/').get(validateLogin, async (req, res) => {
    const page = req.query.page || 0;
    const numItems = req.query.count || 20;
    try {
      const products = await Products.find({ status: 1 });
      // .sort('-createdOn')
      // .skip(page * numItems)
      // .limit(numItems);
      const count = await Products.count().exec();
      res.render('index', { products, count, numItems, page });
    } catch (error) {
      debug(error);
      res.status(500).json({ error });
    }
  });

  return router;
};
