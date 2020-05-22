require('../config/cloudinary');
const cloudinary = require('cloudinary').v2;
const Product = require('../models/product_model');

module.exports.index = async function(req, res) {
  var page = parseInt(req.query.page) || 1;
  var perPage = 8;

  var start = (page - 1) * perPage;
  var end = page * perPage;

  var getProducts = await Product.find();
  var numberOfPages = getProducts.length / perPage;

  res.render('products/index', {
    products: getProducts.slice(start, end),
    numberOfPages: numberOfPages,
    page: page
  });

};

module.exports.search = async function(req, res) {
  var searchName = req.query.name;
  var products = await Product.find();
  var matchedProducts = products.filter(function(product) {
    return product.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1;
  });

  res.render('products/index', {
    products: matchedProducts
  });
};

module.exports.create = function(req, res) {
  res.render('products/create');
};

module.exports.postCreate = async function(req, res) {
  var result, imageUrl;
  if(!req.file) {
    req.body.image = 'images/default-product.png';
  } else {
    result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'demo-nodeapp/products',
      use_filename: true
    });

    req.body.image = result.secure_url;
  }

  await Product.insertMany(req.body);
  res.redirect('/products');
};