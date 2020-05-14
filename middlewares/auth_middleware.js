const User = require('../models/user_model');

module.exports.requireAuth = async function(req, res, next) {
  if(!req.signedCookies.userId) {
    res.redirect('/auth/login');
    return;
  }

  var user = await User.find({ _id: req.signedCookies.userId });

  if(!user.length) {
    res.redirect('/auth/login');
    return;
  }

  res.locals.user = user[0];
  next();
};