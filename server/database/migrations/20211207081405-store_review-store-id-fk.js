module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('store_review', 'store_id', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint('store_review', {
      fields: ['store_id'],
      type: 'foreign Key',
      name: 'store_review_store_id',
      references: { table: 'store', field: 'id' },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('store_review', 'store_id');
    await queryInterface.removeConstraint('store_review', 'store_review_store_id');
  },
};
