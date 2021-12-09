module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('store_review', 'menu_id', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint('store_review', {
      fields: ['menu_id'],
      type: 'foreign Key',
      name: 'store_review_menu_id',
      references: { table: 'menu', field: 'id' },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('store_review', 'menu_id');
    await queryInterface.removeConstraint('store_review', 'store_review_menu_id');
  },
};
