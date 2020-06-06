var Session = require('../models/session_model');

module.exports.addToCart = async function(req, res, next) {
  var productId = req.params.productId;
  var sessionId = req.signedCookies.sessionId;

  if(!sessionId) {
    res.redirect('/products');
    return;
  }
  
  res.redirect('/products');
};