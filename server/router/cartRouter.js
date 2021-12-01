const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart/cart');

router.post('/cart', cartController.post);

module.exports = router;
