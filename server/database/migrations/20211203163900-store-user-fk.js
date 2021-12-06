module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('store', 'user_id', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint('store', {
      fields: ['user_id'],
      type: 'foreign Key',
      name: 'store_user_id',
      references: { table: 'user', field: 'id' },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('store', 'user_id');
    await queryInterface.removeConstraint('store', 'store_user_id');
  },
};
