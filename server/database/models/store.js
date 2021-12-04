'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  store.init({
    store_name: DataTypes.STRING,
    store_image: DataTypes.STRING,
    store_description: DataTypes.STRING,
    store_address: DataTypes.STRING,
    store_category: DataTypes.STRING,
    store_order_quantity: DataTypes.INTEGER,
    store_lat: DataTypes.STRING,
    store_lng: DataTypes.STRING,
    business_hour: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'store',
  });
  return store;
};