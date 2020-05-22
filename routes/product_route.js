const express = require('express');

const authMiddleware = require('../middlewares/auth_middleware');
const controller = require('../controllers/product_controller');
const validate = require('../middlewares/product_validate');

const upload = require('../config/multer');
const router = express.Router();

router.get('/', controller.index);

router.get('/create', authMiddleware.requireAuth, controller.create);

router.get('/search', controller.search);

router.post('/create',
  upload.single('image'),
  validate.postCreate,
  controller.postCreate
);

module.exports = router;