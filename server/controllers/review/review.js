const checkTokens = require('../../middlewares/tokenAuth');
const { store_review, menu, user_meal, user, store } = require('../../database/models');

module.exports = {
  post: async (req, res) => {
    const userInfo = checkTokens(req);
    if (!userInfo) {
      res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      try {
        const { review_content, store_id, menu_id } = req.body;
        await store_review.create({
          review_content: review_content,
          store_id: store_id,
          menu_id: menu_id,
          reviewer_id: userInfo.id,
          review_image: req.body.review_image || '',
        });
        await user_meal.destroy({ where: { user_id: userInfo.id } });
        res.status(201).json({ message: '리뷰 등록이 완료되었습니다.' });
      } catch (err) {
        console.log(err);
        res.status(400).json({ message: '입력 정보가 올바르지 않습니다.' });
      }
    }
  },
  getStoreReview: async (req, res) => {
    try {
      const { storeid } = req.params;
      const reviewList = await store_review.findAll({
        include: [
          {
            model: menu,
            attributes: ['menu_name', 'menu_price', 'menu_order_quantity'],
          },
          {
            model: user,
            attributes: ['id', 'user_nickname'],
          },
        ],
        where: { store_id: storeid },
      });
      res.status(200).json({ reviewList });
    } catch (err) {
      res.status(400).json({ message: '잘못된 요청입니다' });
    }
  },
  getUserReview: async (req, res) => {
    const userInfo = checkTokens(req);
    if (!userInfo) {
      res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      try {
        const reviewList = await store_review.findAll({
          include: [
            { model: menu, attributes: ['menu_name', 'menu_price', 'menu_order_quantity'] },
            { model: store, attributes: ['store_name', 'store_address'] },
          ],
          where: { reviewer_id: userInfo.id },
          order: [['created_at', 'DESC']],
        });
        res.status(200).json({ reviewList });
      } catch (err) {
        res.status(400).json({ message: '잘못된 요청입니다' });
      }
    }
  },
  delete: async (req, res) => {
    const userInfo = checkTokens(req);
    if (!userInfo) {
      res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      try {
        const { reviewid } = req.params;
        await store_review.destroy({ where: { id: reviewid } });
        res.status(204).json({ message: '리뷰삭제가 완료되었습니다.' });
      } catch (err) {
        res.status(400).json({ message: '잘못된 요청입니다' });
      }
    }
  },
};
