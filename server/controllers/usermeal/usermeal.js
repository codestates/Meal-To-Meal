const { user_meal, user, store, menu } = require('../../database/models');
const checkTokens = require('../../middlewares/tokenAuth');

module.exports = {
  post: async (req, res) => {
    const userInfo = checkTokens(req);
    const { menu_id } = req.body;
    if (!userInfo) {
      res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      try {
        const matchedMenu = await menu.findOne({ where: { id: menu_id } }).catch(err => console.log(err));
        const matchedStore = await store
          .findOne({ where: { id: matchedMenu.store_id } })
          .catch(err => console.log(err));
        const matchedUser = await user.findOne({ where: { id: userInfo.id } }).catch(err => console.log(err));

        if (matchedStore.user_id === userInfo.id) {
          res.status(403).json({ message: '본인의 가게에서 요청하셨습니다' });
        } else {
          if (matchedUser.today_used) {
            res.status(403).json({ message: '오늘은 이미 사용하셨습니다' });
          } else {
            await matchedUser.update({ today_used: true }).catch(err => console.log(err));
            await user_meal.create({ menu_id, user_id: userInfo.id }).catch(err => console.log(err));
            await matchedStore.decrement('store_order_quantity').catch(err => console.log(err));
            await matchedMenu.decrement('menu_order_quantity').catch(err => console.log(err));
            res.status(201).json({ message: '주문이 완료되었습니다' });
            //인증코드 생성해서 db 저장 일단 생략
            //? today_used 를 다음날 되면 자동으로 false로 다시 바꿔주어야 함.
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
        res.status(200).json({ userMeal, userInfo: userInfo });
        //!userInfo에서 today_used가 업데이트 안 됨
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
  },
  delete: async (req, res) => {
    const userInfo = checkTokens(req);
    if (!userInfo) {
      res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      try {
        await user_meal.destroy({ where: { user_id: userInfo.id } });
        res.status(204).json({ message: '삭제가 완료되었습니다' });
      } catch (err) {
        res.status(400).json({ message: '잘못된 요청입니다' });
      }
    }
  },
};
