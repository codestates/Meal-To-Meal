module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'cart_menu',
      [
        {
          id: 1,
          order_quantity: '3',
          cart_id: 1,
          menu_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cart_menu', null, {});
  },
};
