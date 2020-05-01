const express = require('express');
const app = express();

const port = 3000;

// config
app.set('view engine', 'pug');
app.set('views', './views');

// data
var users = [
  { id: 1, name: "Minh" },
  { id: 2, name: "Tuan" },
  { id: 3, name: "Phu" }
];

// routes
app.get('/', function(req, res) {
  res.render('index', {
    message: 'Nodejs - Express'
  });
});

app.get('/users', function(req, res) {
  res.render('users/index', {
    users: users
  });
});

app.get('/users/search', function(req, res) {
  var searchName = req.query.name;
  var matchedUsers = users.filter(function(user) {
    return user.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1;
  });

  res.render('users/index', {
    users: matchedUsers
  });
});

app.listen(port, () => console.log(`Example app listening at port ${port}`));