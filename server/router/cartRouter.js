const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart/cart');

router.post('/', cartController.post);
router.get('/', cartController.get);

module.exports = router;
