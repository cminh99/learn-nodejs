require('../config/cloudinary');
const cloudinary = require('cloudinary').v2;
const User = require('../models/user_model');

module.exports.index = async function(req, res) {
  res.render('users/index', {
    users: await User.find()
  });
};

module.exports.create = function(req, res) {
  res.render('users/create');
};

module.exports.search = async function(req, res) {
  var searchName = req.query.name;
  var users = await User.find();
  var matchedUsers = users.filter(function(user) {
    return user.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1;
  });

  res.render('users/index', {
    users: matchedUsers
  });
};

module.exports.view = async function(req, res) {
  var id = req.params.id;
  var user = await User.find({ _id: id });

  res.render('users/view', {
    user: user[0]
  });
};

module.exports.delete = async function(req, res) {
  var id = req.params.id;
  await User.deleteOne({ _id: id });
  res.redirect('/users');
};

module.exports.postCreate = async function(req, res) {
  var result;
  if(!req.file) {
    req.body.avatar = 'images/default-profile.png';  
  } else {
    result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'demo-nodeapp/avatars',
      use_filename: true
    });
    
    req.body.avatar = result.secure_url;
  }

  await User.insertMany(req.body);
  res.redirect('/users');
};