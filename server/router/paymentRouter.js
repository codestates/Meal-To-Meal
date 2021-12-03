const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');

router.post('/payment/complete', paymentController.complete);
router.post('/payment/cancel', paymentController.cancel);

module.exports = router;
