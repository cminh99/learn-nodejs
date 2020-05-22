const express = require('express');

const controller = require('../controllers/users_controller');
const validate = require('../middlewares/user_validate');

const upload = require('../config/multer');
const router = express.Router();

router.get('/', controller.index);

router.get('/create', controller.create);

router.get('/search', controller.search);

router.get('/view/:id', controller.view);

router.get('/del/:id', controller.delete);

router.post('/create',
  upload.single('avatar'),
  validate.postCreate,
  controller.postCreate
);

/** test cookie */
router.get('/cookie', function(req, res, next) {
  res.cookie('userId', 12345);
  res.send('Hello Cookie');
});

module.exports = router;