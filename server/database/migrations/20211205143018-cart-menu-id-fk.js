module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cart_menu', 'cart_id', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint('cart_menu', {
      fields: ['cart_id'],
      type: 'foreign Key',
      name: 'cart_id',
      references: { table: 'cart', field: 'id' },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addColumn('cart_menu', 'menu_id', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint('cart_menu', {
      fields: ['menu_id'],
      type: 'foreign Key',
      name: 'menu_id',
      references: { table: 'menu', field: 'id' },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('cart_menu', 'cart_id');
    await queryInterface.removeConstraint('cart_menu', 'cart_id');
    await queryInterface.removeColumn('cart_menu', 'menu_id');
    await queryInterface.removeConstraint('cart_menu', 'menu_id');
  },
};
