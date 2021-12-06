'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  cart.init({
    merchant_uid: DataTypes.STRING,
    name: DataTypes.STRING,
    total_price: DataTypes.STRING,
    buyer_email: DataTypes.STRING,
    buyer_name: DataTypes.STRING,
    buyer_tel: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};