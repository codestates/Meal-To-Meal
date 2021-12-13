const { store } = require('../../database/models');
const checkTokens = require('../../middlewares/tokenAuth');
module.exports = {
  post: async (req, res) => {
    const userInfo = checkTokens(req);
    const {
      store_image,
      store_name,
      store_category,
      store_description,
      business_hour,
      store_address,
      store_lat,
      store_lng,
    } = req.body;
    if (!userInfo) {
      res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      try {
        await store.create({
          user_id: userInfo.id,
          store_image: store_image || "",
          store_name: store_name,
          store_category: store_category,
          store_description: store_description,
          business_hour: business_hour,
          store_address: store_address,
          store_lat: store_lat,
          store_lng: store_lng,
        });
        res.status(201).json({ message: '가게 등록이 완료되었습니다.' });
      } catch (err) {
        res.status(400).json({ message: '입력정보가 올바르지 않습니다' });
      }
    }
    //하나라도 입력안되어있으면 에러 캐치하게끔
  },
  getOne: async (req, res) => {
    try {
      const { storeid } = req.params;
      const storeInfo = await store.findOne({ where: { id: storeid } });
      res.status(200).json({ storeInfo: storeInfo });
    } catch (err) {
      res.status(400).json({ message: '잘못된 요청입니다' });
    }
  },
  getStoreList: async (req, res) => {
    try {
      const storeList = await store.findAll();
      res.status(200).json({ storeList: storeList });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  put: data => {},
  delete: async (req, res) => {
    const userInfo = checkTokens(req);
    if (!userInfo) {
      res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      try {
        const { storeid } = req.params;
        await store.destroy({ where: { id: storeid } });
        res.status(204).json({ message: '가게 삭제가 완료되었습니다.' });
      } catch (err) {
        res.status(400).json({ message: '가게 정보가 올바르지 않습니다' });
      }
    }
  },
};
