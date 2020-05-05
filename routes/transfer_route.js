const express = require('express');
const router = express.Router();

const controller = require('../controllers/transfer_controller');

router.get('/create', controller.create);

router.post('/create', controller.postCreate);

module.exports = router;