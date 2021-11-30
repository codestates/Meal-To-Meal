const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/auth', authController.tokenAuth);
router.post('/auth/:email', authController.email.postEmailAuth);
router.get('/auth/:email', authController.email.getEmailAuth);

router.post('/oauth/kakao/login', authController.oauth.kakaoLogin);
router.post('/oauth/kakao/signout', authController.oauth.kakaoSignout);

module.exports = router;
