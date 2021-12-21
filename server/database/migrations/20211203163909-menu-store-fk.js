module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('menu', 'store_id', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint('menu', {
      fields: ['store_id'],
      type: 'foreign Key',
      name: 'store_id',
      references: { table: 'store', field: 'id' },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('menu', 'store_id');
    await queryInterface.removeConstraint('menu', 'store_id');
  },
};
