const express = require('express');

const productsDAO = require('../controllers/productsDAO');
// import productsDAO from '../controllers/productsDAO';

const router = express.Router();

module.exports = () => {
  // router.use(validateApiKey)

  router.get('/products', async (req, res) => {
    const products = await productsDAO.findProduct({});
    res.json(products);
  });

  return router;
};
