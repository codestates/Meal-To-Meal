const { cart } = require('../../database/models');
const { cart_menu } = require('../../database/models');
const { menu } = require('../../database/models');
const { store } = require('../../database/models');
const { user } = require('../../database/models');
const checkTokens = require('../../middlewares/tokenAuth');

module.exports = {
  post: async (req, res) => {
    const userInfo = checkTokens(req);
    if (!userInfo) {
      res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      try {
        const matchedUser = await user.findOne({ where: { id: userInfo.id } });
        if (!matchedUser.user_phone_number) {
          res.status(403).json({ message: '인증되지 않은 사용자입니다' });
        } else {
          const { order, total_price } = req.body;
          console.log(order);
          const orderSum = order.reduce((acc, cur) => acc + cur.quantity, 0);
          await matchedUser.increment({ user_donation_count: orderSum, user_donation_money: total_price });

          for (let i = 0; i < order.length; i++) {
            const matchedMenu = await menu.findOne({
              where: { id: order[i].id },
            });
            await matchedMenu.increment('menu_order_quantity', { by: order[i].quantity });
            const matchedStore = await store.findOne({ where: { id: matchedMenu.store_id } });
            await matchedStore.increment('store_order_quantity', { by: order[i].quantity });
          }
          res.status(201).json({ message: '카트가 등록되었습니다' });
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
        const donationList = await cart.findAll({
          include: [
            {
              model: cart_menu,
              attributes: ['order_quantity', 'menu_id'],
              include: [
                {
                  model: menu,
                  include: [
                    {
                      model: store,
                    },
                  ],
                },
              ],
            },
          ],
          where: { buyer_id: userInfo.id },
        });
        res.status(200).json({ donationList: donationList });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
  },
};
