const checkTokens = require('../../middlewares/tokenAuth');
const { store_review, menu } = require('../../database/models');

module.exports = {
  post: data => {},
  getStoreReview: async (req, res) => {
    try {
      const { storeid } = req.params;
      const reviewList = await store_review.findAll({
        include: [{ model: menu, attributes: ['menu_name', 'menu_price', 'menu_order_quantity'] }],
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
          include: [{ model: menu, attributes: ['menu_name', 'menu_price', 'menu_order_quantity'] }],
          where: { reviewer_id: userInfo.id },
        });
        res.status(200).json({ reviewList });
      } catch (err) {
        res.status(400).json({ message: '잘못된 요청입니다' });
      }
    }
  },
  delete: data => {},
};
