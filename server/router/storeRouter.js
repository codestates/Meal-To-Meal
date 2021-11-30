const express = require('express');
const router = express.Router();
const controllers = require('../controllers/store');

router.post('/store', controllers.store.post);
router.get('/store/:storeid', controllers.store.get);
router.get('/store-list/:view', controllers.store.get);
//엔드 포인트 확인 필요
router.put('/store/:storeid', controllers.store.put);
router.delete('/store/:storeid', controllers.store.delete);

module.exports = router;
