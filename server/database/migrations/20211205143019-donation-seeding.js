const { sequelize } = require('../models');
const menu = require('../seed_data/menu_seed');
const cart_menu = require('../seed_data/cart_menu_seed');
const store = require('../seed_data/store_seed');

function calculateTotalPrice() {
  let totalPrice = 0;
  for (let i = 0; i < menu.length; i++) {
    totalPrice += menu[i].menu_price * 3;
  }
  return totalPrice;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await sequelize.models.user.create({
      id: 1,
      user_nickname: '김진표',
      user_password: '',
      user_phone_number: '01012121212',
      user_email: 'jinpyo@gmail.com',
      user_donation_count: 1,
      user_donation_money: 34000,
      today_used: false,
      created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      is_admin: false,
      is_owner: true,
      kakao_oauth_token: '',
      signup_method: '',
    });
    await sequelize.models.cart.create(
      {
        id: 1,
        imp_uid: '1232354',
        merchant_uid: '00001',
        total_price: calculateTotalPrice(),
        buyer_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        include: [sequelize.models.user],
      }
    );
    await sequelize.models.store.bulkCreate(store);
    await sequelize.models.menu.bulkCreate(menu);
    await sequelize.models.cart_menu.bulkCreate(cart_menu, {
      include: [sequelize.models.cart, sequelize.models.menu],
    });
  },

  down: async (queryInterface, Sequelize) => {
    await sequelize.models.user.destroy();
    await sequelize.models.cart.destroy();
    await sequelize.models.store.destroy();
    await sequelize.models.menu.destroy();
    await sequelize.models.cart_menu.destroy();
  },
};
