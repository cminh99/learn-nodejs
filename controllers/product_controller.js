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
  var imgPath = req.file.path.split('\\').slice(1).join('/');
  req.body.image = imgPath;
  req.body.price = parseInt(req.body.price);

  var product = new Product({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    price: req.body.price
  });

  await Product.insertMany(product);
  res.redirect('/products');
};