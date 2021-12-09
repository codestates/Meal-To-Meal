const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');

router.post('/complete', paymentController.complete);

module.exports = router;
