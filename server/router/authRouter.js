const express = require('express');
const router = express.Router();
const controllers = require('../controllers/auth');

router.get('/auth', controllers.tokenAuth);
router.post('/auth/:email', controllers.auth.post);
router.get('/auth/:email', controllers.auth.getEmailAuth);

router.post('/oauth/kakao/login', controllers.oauth.kakaoLogin);
router.post('/oauth/kakao/signout', controllers.oauth.kakaoSignout);

module.exports = router;
