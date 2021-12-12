const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/', authController.auth);
router.post('/:email', authController.email.postEmailAuth);
router.get('/:email', authController.email.getEmailAuth);
router.post('/phone-verification', authController.phoneVerification);
router.post('/kakao/login', authController.oauth.kakaoLogin);

module.exports = router;
