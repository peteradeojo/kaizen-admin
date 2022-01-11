import express, { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import Debug from 'debug';

const debug = Debug('server:products-route');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

const Product = require('../models/Product');
module.exports = () => {
  router.get('/', async (req, res) => {
    // @ts-ignore
    const products = await Product.find({ status: 1 }).exec();
    res.render('products', { products });
  });
  router
    .route('/add')
    .get(async (req, res) => {
      const products = await Product.find();
      res.render('products/add');
    })
    .post((req, res) => {
      res.json({});
    });

  return router;
};
