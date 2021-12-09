module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user_meal', 'user_id', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint('user_meal', {
      fields: ['user_id'],
      type: 'foreign Key',
      name: 'user_meal_user_id',
      references: { table: 'user', field: 'id' },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user_meal', 'user_id');
    await queryInterface.removeConstraint('user_meal', 'user_meal_user_id');
  },
};
