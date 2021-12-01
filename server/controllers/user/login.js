const { user } = require('../../database/models');
const bcrypt = require('bcrypt');
const {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require('../../middlewares/tokenFunctions');

module.exports = (req, res) => {
  // const { user_nickname, user_password } = req.body;
  // bcrypt.compare(user_password, hash, (err, result) => {
  //   //result boolean
  // });
};
