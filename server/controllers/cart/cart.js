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
        //order에 메뉴 아이디와 오더퀀티티가 들어옴.
        // order : [{menu_id : 5,"order_quantity:3"},{menu_id:3,order_quantity:7}]
        const matchedUser = await user.findOne({ where: { id: userInfo.id } });
        let calculatedPrice = 0;
        order.reduce((acc, cur, idx, arr) => {
          menu.findOne({ where: { id: cur.menu_id } }).then(el => {
            // console.log('price', el.dataValues.menu_price, 'order_quantity', cur.order_quantity);
            if (idx === arr.length - 1) {
              calculatedPrice += acc + el.dataValues.menu_price * cur.order_quantity;
              cart
                .create({
                  merchant_uid: 'Sudo_Hired_' + new Date(),
                  total_price: calculatedPrice,
                  imp_uid: '', // 맨처음 결제버튼을 눌렀을 당시에는 imp_uid가 없음 결제완료후 콜백으로 오는 응답에 담겨져있음.
                  buyer_id: matchedUser.id,
                })
                .then(newCart => {
                  order.forEach(el => {
                    cart_menu.create({
                      cart_id: newCart.dataValues.id,
                      menu_id: el.menu_id,
                      order_quantity: el.order_quantity,
                    });
                  });
                });
            }
            calculatedPrice += acc + el.dataValues.menu_price * cur.order_quantity;
          });
          return acc;
        }, 0);

        const orderSum = order.reduce((acc, cur) => acc + cur.order_quantity, 0);
        //총 도네이션(그릇) 개수
        await matchedUser.increment({ user_donation_count: orderSum, user_donation_money: total_price });
        //order_quantity를 다 합해서 user donation_count에 그릇 개수로 업데이트를 한다

        const matchedMenu = await menu.findOne({
          where: { id: order[0].menu_id },
        });

        const matchedStore = await store.findOne({ where: { id: matchedMenu.store_id } });
        await matchedStore.increment('store_order_quantity', { by: orderSum });
        //menu_id의 store_id로 해당 store에 store_order_quantity 숫자를 업데이트한다
        res.status(201).json({ message: '카트가 등록되었습니다' });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
  },
  get: async (req, res) => {},
};