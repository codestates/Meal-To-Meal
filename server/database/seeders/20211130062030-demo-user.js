module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'user',
      [
        {
          id: 1,
          user_nickname: 'nick',
          user_password: 'asdf1234',
          user_phone_number: '01022222222',
          user_email: 'email@gmail.com',
          user_donation_count: 3,
          user_donation_money: 331235,
          today_used: false,
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
          is_admin: false,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {});
  },
};
