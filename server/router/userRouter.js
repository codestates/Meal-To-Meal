const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/user/signup', userController.signup);
router.post('/user/login', userController.login);
router.get('/user/logout', userController.logout);
router.get('/user/mypage', userController.mypage);
router.patch('/user/password', userController.password);
router.patch('/user/nickname', userController.nickname);
router.delete('/user/withdrawal', userController.withdrawal);

module.exports = router;
