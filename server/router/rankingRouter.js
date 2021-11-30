const express = require('express');
const router = express.Router();
const controllers = require('../controllers/ranking');

router.get('/user?sort=donation-money+desc&limit=10', controllers.ranking);

module.exports = router;
