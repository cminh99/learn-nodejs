const db = require('../../db');
const Product = require('../../models/product_model');

module.exports.index = function(req, res) {
  res.json(db.get('products').value());
};

module.exports.create = async function(req, res) {
  var product = await Product.create(req.body);
  res.json(product);
};