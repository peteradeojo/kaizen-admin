const Products = require('../models/Product');
const debug = require('debug')('app:productsDAO');

class productsDAO {
  static async findProduct({ id, name, title }) {
    const query = {};
    if (id) {
      query.id = id;
    } else if (name) {
      query.name = { $regex: '.*' + name + '.*' };
    } else if (title) {
      query.idValue = { $regex: `.*${title}.*` };
    }
    try {
      let products = [];
      if (id || name || title) {
        // debug(query);
        products = await Products.find(query);
      } else {
        products = await Products.find();
      }
      return products;
    } catch (err) {
      debug(err);
      return [];
    }
  }
}

module.exports = productsDAO;
