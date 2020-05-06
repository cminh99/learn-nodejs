const db = require('../db');

module.exports.index = function(req, res) {
  var page = parseInt(req.query.page) || 1;
  var perPage = 8;

  var start = (page - 1) * perPage;
  var end = page * perPage;

  var getProducts = db.get('products').value();
  var numberOfPages = getProducts.length / perPage;

  res.render('products/index', {
    products: getProducts.slice(start, end),
    numberOfPages: numberOfPages,
    page: page
  });

  // add async keyword before starting the function
  // var products = await Product.find();
  // res.render('products/index', {
  //   products: products
  // });
};