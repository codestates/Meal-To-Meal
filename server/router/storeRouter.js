const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store/store');

router.post('/', storeController.post);
router.get('/management', storeController.getStoreManagement);
router.get('/:storeid', storeController.getOne);
router.get('/', storeController.getStoreList);
router.put('/:storeid', storeController.put);
router.delete('/:storeid', storeController.delete);

module.exports = router;
