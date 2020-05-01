const express = require('express');
const app = express();

const port = 3000;

app.get('/', function(req, res) {
  res.send('<h1>Hello World!</h1>');
});

app.get('/users', function(req, res) {
  res.send('User list');
});

app.listen(port, () => console.log(`Example app listening at port ${port}`));