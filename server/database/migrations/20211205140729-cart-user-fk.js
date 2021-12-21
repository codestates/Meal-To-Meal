module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cart', 'buyer_id', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint('cart', {
      fields: ['buyer_id'],
      type: 'foreign Key',
      name: 'buyer_id',
      references: { table: 'user', field: 'id' },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('cart', 'buyer_id');
    await queryInterface.removeConstraint('cart', 'buyer_id');
  },
};
