const express = require('express');
const bodyParser = require('body-parser');

/* lowdb */
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ users: [] }).write(); // Set some defaults (required if your JSON file is empty)

const port = 3000;
const app = express();

/* config */
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

/* routes */
app.get('/', function(req, res) {
  res.render('index', {
    message: 'Nodejs - Express'
  });
});

app.get('/users', function(req, res) {
  res.render('users/index', {
    users: db.get('users').value()
  });
});

app.get('/users/search', function(req, res) {
  var searchName = req.query.name;
  var matchedUsers = db.get('users').value().filter(function(user) {
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
  db.get('users').push(req.body).write();
  res.redirect('/users');
});

app.listen(port, () => console.log(`Example app listening at port ${port}`));