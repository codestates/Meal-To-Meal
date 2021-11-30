const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user');

router.post('/user/signup', controllers.signup);
router.post('/user/login', controllers.login);
router.get('/user/logout', controllers.logout);
router.get('/user/mypage', controllers.mypage);
router.patch('/user/password', controllers.password);
router.patch('/user/nickname', controllers.nickname);
router.delete('/user/withdrawal', controllers.withdrawal);

module.exports = router;
