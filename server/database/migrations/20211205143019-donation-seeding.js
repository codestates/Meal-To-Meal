const { sequelize } = require('../models');

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
        merchant_uid: '12354',
        total_price: 34000,
        buyer_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        include: [sequelize.models.user],
      }
    );
    await sequelize.models.store.create({
      id: 9,
      user_id: 1,
      store_name: '파스타리움',
      store_image: 'https://meal2sdk.s3.amazonaws.com/westernfood.jpeg',
      store_order_quantity: 3,
      store_description:
        '다채로운 생면 파스타의 세계에 오신 걸 환영합니다! 이탈리아 요리학교를 수료하고 미슐랭 3스타 레스토랑에서 경험을 쌓고오신 임현성 쉐프님께서 직접 만드신 파스타를 즐기실 수 있습니다. 현장방문은 이용이 힘드시고, 최소 3일전에 전화로 예약을 해주셔야 저희 레스토랑 음식들을 즐기실 수 있습니다. 불편을 드려 죄송합니다.',
      store_address: '',
      store_category: '양식',
      store_lat: 37.559498,
      store_lng: 126.973151,
      business_hour: '11:30 ~ 21:00',
      created_at: new Date(),
      updated_at: new Date(),
    });
    await sequelize.models.menu.bulkCreate([
      {
        id: 26,
        menu_name: '알리오올리오 파스타',
        menu_price: 11000,
        menu_image: 'https://foodish-api.herokuapp.com/images/pasta/pasta28.jpg',
        menu_order_quantity: 1,
        store_id: 9,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 27,
        menu_name: '까르보나라 파스타',
        menu_price: 11000,
        menu_image: 'https://foodish-api.herokuapp.com/images/pasta/pasta28.jpg',
        menu_order_quantity: 1,
        store_id: 9,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 28,
        menu_name: '링귀니 볼로네제 파스타',
        menu_price: 12000,
        menu_image: 'https://foodish-api.herokuapp.com/images/pasta/pasta28.jpg',
        menu_order_quantity: 1,
        store_id: 9,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await sequelize.models.cart_menu.bulkCreate([
      {
        id: 1,
        order_quantity: 1,
        cart_id: 1,
        menu_id: 26,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        order_quantity: 1,
        cart_id: 1,
        menu_id: 27,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        order_quantity: 1,
        cart_id: 1,
        menu_id: 28,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        include: [sequelize.models.cart, sequelize.models.menu],
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await sequelize.models.user.destroy();
    await sequelize.models.cart.destroy();
    await sequelize.models.store.destroy();
    await sequelize.models.menu.destroy();
    await sequelize.models.cart_menu.destroy();
  },
};
