const express = require('express');
const router = express.Router();

const controller = require('../controllers/users_controller');
const validate = require('../middlewares/user_validate');

router.get('/', controller.index);

router.get('/create', controller.create);

router.get('/search', controller.search);

router.get('/view/:id', controller.view);

router.get('/del/:id', controller.delete);

router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router;