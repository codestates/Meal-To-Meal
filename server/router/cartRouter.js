const express = require('express');
const router = express.Router();
const controllers = require('../controllers/cart/cart');

router.post('/cart', controllers.post);

module.exports = router;
