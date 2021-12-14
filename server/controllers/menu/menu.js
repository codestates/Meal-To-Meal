const { menu, store, user_meal, user } = require('../../database/models');
const checkTokens = require('../../middlewares/tokenAuth');

module.exports = {
  post: async (req, res) => {
    const userInfo = checkTokens(req);
    const { menu_image, menu_price, menu_name } = req.body;
    const findStore = await store.findOne({ where: { user_id: userInfo.id } });
    if (!userInfo) {
      res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      try {
        await menu.create({
          menu_price: menu_price,
          menu_name: menu_name,
          menu_image: menu_image,
          store_id: findStore.dataValues.id,
        });
        res.status(201).json({ message: '메뉴 등록이 완료되었습니다.' });
      } catch (err) {
        res.status(400).json({ message: '입력정보가 올바르지 않습니다' });
      }
    }
  },
  get: async (req, res) => {
    try {
      const { storeid } = req.params;
      const menuList = await menu.findAll({ where: { store_id: storeid } });
      res.status(200).json({ menuList: menuList });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  },
  getMenuManagement: async (req, res) => {
    const userInfo = checkTokens(req);
    try {
      if (userInfo && userInfo.is_owner) {
        const ownedStore = await store.findOne({ where: { user_id: userInfo.id } });
        const menuList = await menu.findAll({
          include: [
            {
              model: user_meal,
              attributes: ['user_id'],
              include: [
                {
                  model: user,
                  attributes: ['user_nickname', 'user_phone_number'],
                },
              ],
            },
          ],
          where: { store_id: ownedStore.id },
        });
        res.status(200).json({ menuList });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  delete: async (req, res) => {
    const userInfo = checkTokens(req);
    const { menuid } = req.params;
    if (!userInfo) {
      res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      try {
        await menu.destroy({ where: { id: menuid } });
        res.status(201).json({ message: '메뉴 삭제가 완료되었습니다.' });
      } catch (err) {
        res.status(400).json({ message: '입력정보가 올바르지 않습니다' });
      }
    }
  },
};
