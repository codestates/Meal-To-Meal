const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  menu.init(
    {
      menu_name: DataTypes.STRING,
      menu_price: DataTypes.STRING,
      menu_image: DataTypes.STRING,
      menu_order_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      store_id: {
        type: DataTypes.INTEGER,
        underscored: true,
      },
    },
    {
      sequelize,
      modelName: 'menu',
    }
  );
  return menu;
};
