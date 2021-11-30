const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu/menu');

router.post('/menu', menuController.post);
router.get('/menu-list/:storeid', menuController.get);
router.delete('/menu/:menuid', menuController.delete);

module.exports = router;
