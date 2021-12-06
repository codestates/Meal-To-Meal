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
        const { order, total_price } = req.body;
        //buyer_email, buyer_tel, buyer_name, name, merchant_uid ?

        const matchedUser = await user.findOne({ where: { id: userInfo.id } });

        const newCart = await cart.create({
          total_price: total_price,
          merchant_uid: 'SUDO_HIRED1',
          name: '',
          // 여긴 뭘 넣어야 되는지
          buyer_id: matchedUser.id,
          buyer_email: matchedUser.user_email,
          buyer_name: matchedUser.user_nickname,
        });

        order.map(el => {
          console.log(el);
          cart_menu.create({ cart_id: newCart.dataValues.id, menu_id: el.menu_id, order_quantity: el.order_quantity });
        });
        console.log('order', order);
        // const cart_menu_list = await cart_menu.bulkCreate([...order, { id: newCart.dataValues.id }]);

        const orderSum = order.reduce((acc, cur) => acc + cur.order_quantity, 0);
        await matchedUser.increment({ user_donation_count: orderSum, user_donation_money: total_price });
        //order_quantity를 다 합해서 user donation_count에 그릇 개수로 업데이트를 한다

        const matchedMenu = await menu.findOne({
          where: { id: order[0].menu_id },
        });

        const matchedStore = await store.findOne({ where: { id: matchedMenu.store_id } });
        await matchedStore.increment('store_order_quantity', { by: orderSum });
        //menu_id의 store_id로 해당 store에 store_order_quantity 숫자를 업데이트한다
        res.status(201).json({ matchedUser });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
  },
  get: async (req, res) => {},
};
