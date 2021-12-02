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
      user_password: DataTypes.STRING,
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
      email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      signup_method: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'user',
    }
  );
  return user;
};
