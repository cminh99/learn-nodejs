const express = require('express');
const multer  = require('multer');

const authMiddleware = require('../middlewares/auth_middleware');
const controller = require('../controllers/product_controller');
const validate = require('../middlewares/product_validate');

const upload = multer({ dest: './public/images/products/' });
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