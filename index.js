const express = require('express');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user_route');

const port = 3000;
const app = express();

/** config */
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

/** routes */
app.get('/', function(req, res) {
  res.render('index', {
    message: 'Nodejs - Express'
  });
});

app.use('/users', userRoute);

app.listen(port, () => console.log(`Example app listening at port ${port}`));