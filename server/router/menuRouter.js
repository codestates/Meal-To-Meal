const express = require('express');
const router = express.Router();
const controllers = require('../controllers/menu');

router.post('/menu', controllers.menu.post);
router.get('/menu-list/:storeid', controllers.menu.get);
router.delete('/menu/:menuid', controllers.menu.delete);

module.exports = router;
