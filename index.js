const express = require('express');
const app = express();

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function(req, res) {
  res.render('index', {
    message: 'Nodejs - Express'
  });
});

app.get('/users', function(req, res) {
  res.render('users/index', {
    users: [
      { id: 1, name: "Minh" },
      { id: 2, name: "Tuan" },
      { id: 3, name: "Phu" }
    ]
  });
});

app.listen(port, () => console.log(`Example app listening at port ${port}`));