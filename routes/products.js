const express = require('express');
const path = require('path');
const debug = require('debug')('app:products-route');
const axios = require('axios').default;

const router = express.Router();

const fetchRandomNames = async (num, len) => {
  try {
    const res = await axios.get(
      `https://www.random.org/strings/?num=${num}&len=${len}&digits=on&upperalpha=on&loweralpha=off&unique=on&format=plain&rnd=new`
    );
    const { data } = res;
    const names = data.split('\n', num);
    // const resolved = names.map((name) => name.trim());
    // console.log(resolved);
    // return resolved;
    return names;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const Products = require('../models/Product');
const productsDAO = require('../controllers/productsDAO');
const { validateLogin } = require('../middleware/functions');

module.exports = () => {
  router.use(validateLogin);
  router.route('/').get(async (req, res) => {
    const { title, name, id } = req.query;
    const products = await productsDAO.findProduct({ id, name, title });
    res.render('products/index', { products });
  });

  router
    .route('/add')
    .get((req, res) => {
      res.render('products/add');
    })
    .post(async (req, res) => {
      if (!req.files.images) {
        return res
          .status(400)
          .json({ error: 'No files uploaded for images. Please select one or more images' });
      }

      try {
        let { images } = req.files;
        if (Array.isArray(images) !== true || images.length > 5) {
          return res.status(400).json({ error: 'Please upload between 2 and 5 images.' });
        }
        const randomNames = await fetchRandomNames(images.length, 10);
        const destinationPath = path.resolve(__dirname, '../public/img');
        const imgLinks = images.map((img, index) => {
          let { name } = img;
          let ext = path.extname(name);
          let uploadPath = path.join(destinationPath, randomNames[index] + ext);
          img.mv(uploadPath, (err) => {
            if (err) {
              throw err;
            }
          });
          return `/img/${randomNames[index]}${ext}`;
        });

        const { name, title: idValue, tags, colors, sizes, price, quantity } = req.body;
        const product = new Products({ name, idValue, price, quantity });
        product.category = tags.split(',');
        product.colors = colors.split(',');
        product.images = imgLinks;
        product.sizes = sizes.map((size) => {
          return { name: size };
        });

        // debug(product);
        await product.save();
        res.json({ msg: 'uploaded', product, status: 'ok' });
      } catch (error) {
        debug(error);
        res.status(500).json({ error });
      }
    });

  router.get('/:id', async (req, res) => {
    try {
      const [item] = await productsDAO.findProduct({ id: req.params.id });
      // debug(item);
      res.render('products/item', { item });
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  return router;
};
