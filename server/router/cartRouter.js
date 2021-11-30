const express = require('express');
const router = express.Router();
const controllers = require('../controllers/cart');

router.post('/cart', controllers.cart.post);

module.exports = router;
