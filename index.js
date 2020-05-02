require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const authRoute = require('./routes/auth_route');
const userRoute = require('./routes/user_route');
const productRoute = require('./routes/product_route');

const authMiddleware = require('./middlewares/auth_middleware');

const port = 3000;
const app = express();

/** config */
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

/** routes */
app.get('/', function(req, res) {
  res.render('index', {
    message: 'Nodejs - Express'
  });
});

app.use('/auth', authRoute);
app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/products', productRoute);

app.listen(port, () => console.log(`Example app listening at port ${port}`));