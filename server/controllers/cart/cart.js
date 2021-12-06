const { cart } = require('../../database/models');
const { cart_menu } = require('../../database/models');
const { user } = require('../../database/models');
const checkTokens = require('../../middlewares/tokenAuth');

module.exports = {
  post: async (req, res) => {
    const userInfo = checkTokens(req);
    if (!userInfo) {
      res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      const { order, total_price } = req.body;
      //buyer_email, buyer_tel, buyer_name, name, merchant_uid ?

      const cartId = await cart.create({ total_price: total_price, buyer_id: userInfo.id }).id;
      for (let el of order) {
        await cart_menu.create({ id: cartId, order_quantity: el.order_quantity, menu_id: el.menu_id });
      }
      const orderSum = order.reduce((acc, cur) => acc + cur.order_quantity, 0);
      const matchedUser = await user.findOne({ where: { id: userInfo.id } });
      await matchedUser.increment({ donation_count: orderSum, donation_money: total_price });
    }
    //이런 식으로 보내준다.
    // const order = [
    //   {
    //     menu_id: 5,
    //     order_quantity: 3,
    //   },
    //   {
    //     menu_id: 3,
    //     order_quantity: 2,
    //   },
    // ];
  },
  get: async (req, res) => {},
};
