const express = require('express');
const router = express.Router();
const controllers = require('../controllers/review');

router.post('/review', controllers.review.post);
router.get('/review-list/:storeid', controllers.review.get);
router.get('/review-list', controllers.review.get);
//엔드포인트 두 개 미분리. 수정 필요
router.delete('/review/:reviewid', controllers.review.delete);

module.exports = router;
