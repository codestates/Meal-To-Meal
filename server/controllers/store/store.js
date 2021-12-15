const { store, menu } = require('../../database/models');
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
      if (
        !store_name ||
        !store_category ||
        !store_description ||
        !business_hour ||
        !store_address ||
        !store_lat ||
        !store_lng
      ) {
        res.status(400).json({ message: '입력정보가 올바르지 않습니다' });
      } else {
        try {
          await store.create({
            user_id: userInfo.id,
            store_image: store_image || '',
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
    }
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
  getStoreManagement: async (req, res) => {
    try {
      const userInfo = checkTokens(req);
      if (userInfo && userInfo.is_owner) {
        const storeInfo = await store.findOne({ where: { user_id: userInfo.id } });
        res.status(200).json({ storeInfo: storeInfo });
      } else {
        res.json({ message: '권한이 없습니다' });
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ message: err.message });
    }
  },
  put: async (req, res) => {
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
      menuInfo,
    } = req.body;
    if (!userInfo) {
      res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      try {
        const findStore = await store.findOne({ where: { user_id: userInfo.id } });
        await findStore.update({
          store_image: store_image || '',
          store_name: store_name,
          store_category: store_category,
          store_description: store_description,
          business_hour: business_hour,
          store_address: store_address,
          store_lat: store_lat,
          store_lng: store_lng,
        });
        // 근데 메뉴수정은?? 한개는 쉬운데 만약 여러개를 동시에 수정해서 보낸다고 하면??
        // 여러개를 수정했을때 배열로 들어오게 만들어서 보내주는걸 맵핑하는건 어떨까??
        // menuInfo = [
        //   {
        //     menu_id: menu_id,
        //     menu_name: menu_name,
        //     menu_price: menu_price,
        //     menu_image: menu_image,
        //   },
        // ];
        for (let i = 0; i < menuInfo.length; i++) {
          const findMenu = await menu.findOne({ where: { id: menuInfo[i].menu_id } });
          await findMenu.update({
            menu_image: menuInfo[i].menu_image || '',
            menu_name: menuInfo[i].menu_name,
            menu_price: menuInfo[i].menu_price,
          });
        }
        res.status(200).json({ message: '정보 수정이 완료되었습니다.' });
      } catch (err) {
        res.status(400).json({ message: '입력 정보가 올바르지 않습니다' });
      }
    }
  },
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
