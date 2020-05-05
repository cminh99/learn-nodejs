const db = require('../db');

module.exports.addToCart = function(req, res, next) {
  var productId = req.params.productId;
  var sessionId = req.signedCookies.sessionId;
  var userId = req.signedCookies.userId;
  var count = 0, countCart = 0;

  if(!sessionId) {
    res.redirect('/products');
    return;
  }

  count = db
    .get('sessions')
    .find({ id: sessionId })
    .get('cart.' + productId, 0)
    .value();

  db.get('sessions')
    .find({ id: sessionId })
    .set('cart.' + productId, count + 1)
    .write();

  countCart = db
    .get('sessions')
    .find({ id: sessionId })
    .get('cart')
    .size()
    .value();

  res.cookie('countCart', countCart);
  res.redirect('/products');
};