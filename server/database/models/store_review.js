'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class store_review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  store_review.init({
    review_content: DataTypes.STRING,
    review_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'store_review',
  });
  return store_review;
};