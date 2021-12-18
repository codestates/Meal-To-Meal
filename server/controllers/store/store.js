const { store, menu, user } = require('../../database/models');
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
      menuInfo,
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
        !store_lng ||
        !menuInfo
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
          const findStore = await store.findOne({ where: { user_id: userInfo.id } });
          for (let i = 0; i < menuInfo.length; i++) {
            await menu.create({
              store_id: findStore.dataValues.id,
              menu_image: menuInfo[i].menu_image || `https://meal2sdk.s3.amazonaws.com/-001_12.jpg`,
              menu_name: menuInfo[i].menu_name,
              menu_price: menuInfo[i].menu_price,
              menu_order_quantity: 0,
            });
          }
          const findUser = await user.findOne({ where: { id: userInfo.id } });
          await findUser.update({
            is_owner: true,
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
      const matchedUser = await user.findOne({ where: { id: userInfo.id } });
      if (matchedUser && matchedUser.is_owner) {
        const storeInfo = await store.findOne({ where: { user_id: userInfo.id } });
        res.status(200).json({ storeInfo: storeInfo });
      } else {
        res.json({ message: '권한이 없습니다' });
      }
    } catch (err) {
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
        for (let i = 0; i < menuInfo.length; i++) {
          if (menuInfo[i].id) {
            const findMenu = await menu.findOne({ where: { id: menuInfo[i].id } });
            await findMenu.update({
              menu_image: menuInfo[i].menu_image || `https://meal2sdk.s3.amazonaws.com/-001_12.jpg`,
              menu_name: menuInfo[i].menu_name,
              menu_price: menuInfo[i].menu_price,
            });
          } else {
            await menu.create({
              store_id: findStore.id,
              menu_image: menuInfo[i].menu_image || `https://meal2sdk.s3.amazonaws.com/-001_12.jpg`,
              menu_name: menuInfo[i].menu_name,
              menu_price: menuInfo[i].menu_price,
              menu_order_quantity: 0,
            });
          }
        }
        const allMenu = await menu.findAll({ where: { store_id: findStore.id } });
        console.log('allMenu==========================', allMenu);
        for (let i = 0; i < allMenu.length; i++) {
          const menuInfoIds = menuInfo.map(el => el.id);
          console.log('menuInfoIds================================', menuInfoIds);
          if (!menuInfoIds.includes(allMenu[i].id)) {
            await menu.destroy({ where: { id: allMenu[i].id } });
          }
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
        const findUser = await user.findOne({ where: { id: userInfo.id } });
        await store.destroy({ where: { id: storeid } });
        await findUser.update({
          is_owner: false,
        });
        res.status(204).json({ message: '가게 삭제가 완료되었습니다.' });
      } catch (err) {
        res.status(400).json({ message: '가게 정보가 올바르지 않습니다' });
      }
    }
  },
};
