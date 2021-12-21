const express = require('express');
const router = express.Router();
const rankingController = require('../controllers/ranking/ranking');

router.get('/user?sort=donation-money+desc&limit=10', rankingController.ranking);

module.exports = router;
