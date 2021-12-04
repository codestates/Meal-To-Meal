module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('store', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      store_name: {
        type: Sequelize.STRING,
      },
      store_image: {
        type: Sequelize.STRING,
      },
      store_description: {
        type: Sequelize.STRING,
      },
      store_address: {
        type: Sequelize.STRING,
      },
      store_category: {
        type: Sequelize.STRING,
      },
      store_order_quantity: {
        type: Sequelize.INTEGER,
      },
      store_lat: {
        type: Sequelize.STRING,
      },
      store_lng: {
        type: Sequelize.STRING,
      },
      business_hour: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('store');
  },
};
