const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/mypage', userController.mypage);
router.post('/email', userController.emailCheck);
router.patch('/nickname', userController.nickname.patch);
router.post('/nickname', userController.nickname.post);
router.delete('/withdrawal', userController.withdrawal);

module.exports = router;
