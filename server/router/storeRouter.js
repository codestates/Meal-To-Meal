const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store/store');

router.post('/store', storeController.post);
router.get('/store/:storeid', storeController.getOne);
router.get('/store-list/:view', storeController.getStoreList);
//엔드 포인트 확인 필요
router.put('/store/:storeid', storeController.put);
router.delete('/store/:storeid', storeController.delete);

module.exports = router;
