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

  for(let user of matchedUsers) {
    user.avatar = 'http://localhost:3000/' + user.avatar;
  }

  res.render('users/index', {
    users: matchedUsers
  });
};

module.exports.view = async function(req, res) {
  var id = req.params.id;
  var user = await User.find({ _id: id });

  user[0].avatar = 'http://localhost:3000/' + user[0].avatar;

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
  if(!req.file) {
    req.body.avatar = 'images/default-profile.png';  
  } else {
    // Window => \\
    // MaxOS/Linux => /
    req.body.avatar = req.file.path.split('\\').slice(1).join('/');
  }
  
  await User.insertMany(req.body);
  res.redirect('/users');
};