const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user-meal');

router.post('/user-meal', controllers.usermeal.post);
router.patch('/user-meal', controllers.usermeal.patch);
router.get('/user-meal/:storeid', controllers.usermeal.get);
router.delete('/user-meal', controllers.usermeal.delete);

module.exports = router;
