module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user_meal', 'menu_id', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint('user_meal', {
      fields: ['menu_id'],
      type: 'foreign Key',
      name: 'user_meal_menu_id',
      references: { table: 'menu', field: 'id' },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user_meal', 'menu_id');
    await queryInterface.removeConstraint('user_meal', 'user_meal_menu_id');
  },
};
