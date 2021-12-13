const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      user_nickname: DataTypes.STRING,
      user_password: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      verification_code: DataTypes.STRING,
      user_phone_number: DataTypes.STRING,
      user_email: DataTypes.STRING,
      user_donation_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      user_donation_money: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      today_used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      kakao_oauth_token: {
        type: DataTypes.STRING,
      },
      signup_method: {
        type: DataTypes.STRING,
      },
      is_owner: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'user',
    }
  );
  return user;
};
