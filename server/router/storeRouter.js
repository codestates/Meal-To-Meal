const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store/store');

router.post('/', storeController.post);
router.get('/:storeid', storeController.getOne);
router.get('/:view', storeController.getStoreList);
//엔드 포인트 확인 필요
router.put('/:storeid', storeController.put);
router.delete('/:storeid', storeController.delete);

module.exports = router;
