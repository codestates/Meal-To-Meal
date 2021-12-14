const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu/menu');

router.post('/', menuController.post);
router.get('/', menuController.get);
router.get('/:storeid', menuController.get);
router.delete('/:menuid', menuController.delete);

module.exports = router;
