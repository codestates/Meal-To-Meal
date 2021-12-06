module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cart', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      merchant_uid: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      //이름 바꿀 수 있으면 더 구체화하기!
      total_price: {
        type: Sequelize.STRING,
      },
      buyer_email: {
        type: Sequelize.STRING,
      },
      buyer_name: {
        type: Sequelize.STRING,
      },
      buyer_tel: {
        type: Sequelize.INTEGER,
      },
      // buyer_email, tel 필요한지 확인!
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
    await queryInterface.dropTable('cart');
  },
};
