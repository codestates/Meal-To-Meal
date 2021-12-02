const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review/review');

router.post('/review', reviewController.post);
router.get('/review-list/:storeid', reviewController.getStoreReview);
router.get('/review-list', reviewController.getUserReview);
router.delete('/review/:reviewid', reviewController.delete);

module.exports = router;
