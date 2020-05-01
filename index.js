const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();

// config
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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

app.get('/users/create', function(req, res) {
  res.render('users/create');
});

app.post('/users/create', function(req, res) {
  var newId = users.length;
  req.body.id = newId + 1;
  users.push(req.body);
  console.log(users)

  res.redirect('/users');
});

app.listen(port, () => console.log(`Example app listening at port ${port}`));