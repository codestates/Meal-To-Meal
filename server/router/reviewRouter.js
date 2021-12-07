const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review/review');

router.post('/', reviewController.post);
router.get('/:storeid', reviewController.getStoreReview);
router.get('/', reviewController.getUserReview);
router.delete('/:reviewid', reviewController.delete);

module.exports = router;
