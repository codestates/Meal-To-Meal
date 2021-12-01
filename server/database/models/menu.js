'use strict';
const {
  Model
} = require('sequelize');
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
  };
  menu.init({
    menu_name: DataTypes.STRING,
    menu_price: DataTypes.INTEGER,
    menu_image: DataTypes.STRING,
    menu_order_quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'menu',
  });
  return menu;
};