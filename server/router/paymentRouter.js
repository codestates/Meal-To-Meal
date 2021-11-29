const express = require('express');
const router = express.Router();
const controllers = require('../controllers/payment');

router.get('/payment/:userid', controllers.payment.get);
router.post('/payment', controllers.payment.post);
router.post('/payment/completion', controllers.payment.completion);
router.post('/payment/refund', controllers.payment.refund);
router.patch('/payment', controllers.payment.patch);

module.exports = router;
