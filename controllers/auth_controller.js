const md5 = require('md5');
const User = require('../models/user_model');

module.exports.login = function(req, res, next) {
  res.render('auth/login');
};

module.exports.postLogin = async function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var hashedPassword = md5(password);

  var user = await User.findOne({ email: email });

  if(!user) {
    res.render('auth/login', {
      errors: [
        'User does not exist!'
      ],
      values: req.body
    });
    return;
  }

  if(user.password !== hashedPassword) {
    res.render('auth/login', {
      errors: [
        'Wrong password!'
      ],
      values: req.body
    });
    return;
  }

  res.cookie('userId', user._id, {
    signed: true
  });
  res.redirect('/users');
};