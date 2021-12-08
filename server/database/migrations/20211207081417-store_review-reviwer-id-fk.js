module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('store_review', 'reviewer_id', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint('store_review', {
      fields: ['reviewer_id'],
      type: 'foreign Key',
      name: 'reviewer_id',
      references: { table: 'user', field: 'id' },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('store_review', 'reviewer_id');
    await queryInterface.removeConstraint('store_review', 'reviewer_id');
  },
};
