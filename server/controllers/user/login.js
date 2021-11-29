const crypto = require('crypto');
const { User } = require('../../models');
const { generateAccessToken, generateRefreshToken, sendRefreshToken } = require('../tokenFunctions');

module.exports = (req, res) => {
  const { userId, password } = req.body;

  User.findOne({ where: { userId: userId } }).then(userInfo => {
    if (!userInfo) {
      res.status(400).json({ message: '아이디, 패스워드를 확인해주세요' });
    } else {
      const hashPassword = crypto
        .createHash('sha512')
        .update(password + userInfo.salt)
        .digest('hex');

      User.findOne({ where: { password: hashPassword } }).then(data => {
        if (!data) {
          res.status(400).json({ message: '아이디, 패스워드를 확인해주세요' });
        } else {
          delete data.dataValues.password;
          const accessToken = generateAccessToken(data.dataValues);
          const refreshToken = generateRefreshToken(data.dataValues);
          sendRefreshToken(res, refreshToken);
          return res.status(200).json({ accessToken: accessToken, userInfo: data, message: '로그인 되었습니다.' });
        }
      });
    }
  });
};
