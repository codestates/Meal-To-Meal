const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart_menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cart_menu.init(
    {
      order_quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'cart_menu',
    }
  );
  return cart_menu;
};
