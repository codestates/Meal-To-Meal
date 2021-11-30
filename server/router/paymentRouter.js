const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment/payment');

router.get('/payment/:userid', paymentController.get);
router.post('/payment', paymentController.post);
router.post('/payment/completion', paymentController.completion);
router.post('/payment/refund', paymentController.refund);
router.patch('/payment', paymentController.patch);

module.exports = router;
