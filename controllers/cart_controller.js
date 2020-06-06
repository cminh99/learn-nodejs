var Session = require('../models/session_model');

module.exports.addToCart = async function(req, res, next) {
  var productId = req.params.productId;
  var sessionId = req.signedCookies.sessionId;

  if(!sessionId) {
    res.redirect('/products');
    return;
  }

  var count = 0;
  var session = await Session.findOne({ sessionId: sessionId });

  for(let i = 0; i < session.cart.length; i++) {
    if(session.cart[i].key == productId) {
      session.cart.push({ key: productId, value: session.cart[i].value + 1 });
      session.cart.splice(i, 1);
      await session.save();

      res.cookie('countCart', session.cart.length);
      res.redirect('/products');
      return;
    }
  }

  session.cart.push({ key: productId, value: count + 1 });
  await session.save();

  res.cookie('countCart', session.cart.length);
  res.redirect('/products');
};