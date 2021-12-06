const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menu_cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  menu_cart.init(
    {
      order_quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'menu_cart',
    }
  );
  return menu_cart;
};
