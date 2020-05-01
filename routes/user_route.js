const express = require('express');
const shortid = require('shortid');

const db = require('../db');

const router = express.Router();

router.get('/', function(req, res) {
  res.render('users/index', {
    users: db.get('users').value()
  });
});

router.get('/create', function(req, res) {
  res.render('users/create');
});

router.get('/search', function(req, res) {
  var searchName = req.query.name;
  var matchedUsers = db.get('users').value().filter(function(user) {
    return user.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1;
  });

  res.render('users/index', {
    users: matchedUsers
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  var user = db.get('users').find({ id: id }).value();

  res.render('users/view', {
    user: user
  });
});

router.get('/del/:id', function(req, res) {
  var id = req.params.id;
  db.get('users').remove({ id: id }).write();
  res.redirect('/users');
});

/** post routes */
router.post('/create', function(req, res) {
  req.body.id = shortid.generate();
  db.get('users').push(req.body).write();
  res.redirect('/users');
});

module.exports = router;