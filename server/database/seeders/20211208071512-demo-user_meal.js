module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'user_meal',
      [
        {
          id: 1,
          menu_id: 2,
          user_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          menu_id: 4,
          user_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          menu_id: 3,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          menu_id: 5,
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          menu_id: 2,
          user_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_meal', null, {});
  },
};
