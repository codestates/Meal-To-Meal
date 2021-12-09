const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search/map-search');

router.get('/', searchController);

module.exports = router;
