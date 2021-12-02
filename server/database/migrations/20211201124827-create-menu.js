module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('menu', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      menu_name: {
        type: Sequelize.STRING,
      },
      menu_price: {
        type: Sequelize.STRING,
      },
      menu_image: {
        type: Sequelize.STRING,
      },
      menu_order_quantity: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('menu');
  },
};
