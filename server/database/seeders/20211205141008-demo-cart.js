module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'cart',
      [
        {
          id: 1,
          merchant_uid: '12354',
          total_price: '123456',
          buyer_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cart', null, {});
  },
};
