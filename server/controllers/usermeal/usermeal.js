const { user_meal, user, store, menu } = require('../../database/models');
const checkTokens = require('../../middlewares/tokenAuth');

module.exports = {
  post: async (req, res) => {
    const userInfo = checkTokens(req);
    const { menu_id } = req.body;
    if (!userInfo) {
      return res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      try {
        const matchedMenu = await menu.findOne({ where: { id: menu_id } }).catch(err => console.log(err));
        const matchedStore = await store
          .findOne({ where: { id: matchedMenu.store_id } })
          .catch(err => console.log(err));
        const matchedUser = await user.findOne({ where: { id: userInfo.id } }).catch(err => console.log(err));

        if (matchedStore.user_id === userInfo.id) {
          res.status(403).json({ message: '본인의 가게에서 요청하셨습니다' });
          // } else if (!matchedUser.user_phone_number) {
          //   res.status(403).json({ message: '인증되지 않은 사용자입니다' });
        } else {
          const existingUserMeal = await user_meal.findOne({ where: { user_id: userInfo.id } });
          if (existingUserMeal) {
            return res.status(403).json({ message: '이미 주문 내역이 있습니다' });
          } else if (matchedUser.today_used) {
            return res.status(403).json({ message: '오늘은 이미 사용하셨습니다' });
          } else {
            await matchedStore.decrement('store_order_quantity').catch(err => console.log(err));
            await matchedMenu.decrement('menu_order_quantity').catch(err => console.log(err));
            await user_meal.create({ menu_id, user_id: userInfo.id }).catch(err => console.log(err));
            await matchedUser.update({ today_used: true }).catch(err => console.log(err));
            res.status(200).json({ message: '주문이 완료되었습니다' });
            //인증코드 생성해서 db 저장 일단 생략
          }
        }
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
  },
  get: async (req, res) => {
    const userInfo = checkTokens(req);
    if (!userInfo) {
      res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      try {
        const userMeal = await user_meal.findOne({
          include: [
            {
              model: menu,
              attributes: ['menu_name', 'menu_price', 'menu_image', 'store_id'],
              include: [
                {
                  model: store,
                  attributes: [
                    'store_name',
                    'store_image',
                    'store_description',
                    'store_address',
                    'business_hour',
                    'store_category',
                  ],
                },
              ],
            },
          ],
          where: { user_id: userInfo.id },
        });
        if (userMeal) {
          const matchedUser = await user.findOne({ where: { id: userMeal.user_id } });
          delete matchedUser.dataValues.user_password;
          res.status(200).json({ userMeal, matchedUser });
        }
      } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message });
      }
    }
  },
};
