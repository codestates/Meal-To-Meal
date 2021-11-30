const express = require('express');
const router = express.Router();
const usermealController = require('../controllers/usermeal/usermeal');

router.post('/user-meal', usermealController.post);
router.patch('/user-meal', usermealController.patch);
router.get('/user-meal/:storeid', usermealController.get);
router.delete('/user-meal', usermealController.delete);

module.exports = router;
