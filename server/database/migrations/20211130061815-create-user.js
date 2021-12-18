module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_nickname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_password: {
        defaultValue: '',
        type: Sequelize.STRING,
      },
      user_phone_number: {
        type: Sequelize.STRING,
      },
      verification_code: {
        type: Sequelize.STRING,
      },
      kakao_oauth_token: {
        type: Sequelize.STRING,
      },
      kakao_id: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      signup_method: {
        type: Sequelize.STRING,
      },
      user_email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_donation_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      user_donation_money: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      today_used: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_owner: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
  },
};
