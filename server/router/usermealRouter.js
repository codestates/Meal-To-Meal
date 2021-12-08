const express = require('express');
const router = express.Router();
const usermealController = require('../controllers/usermeal/usermeal');

router.post('/', usermealController.post);
router.get('/', usermealController.get);
router.delete('/', usermealController.delete);

module.exports = router;
