const { user } = require('../../database/models');
const bcrypt = require('bcrypt');
const {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require('../../middlewares/tokenFunctions');

module.exports = async (req, res) => {
  const { user_email, user_password } = req.body;

  try {
    const userInfo = await user.findOne({ where: { user_email: user_email } });
    const hash = userInfo.user_password;

    await bcrypt.compare(user_password, hash, (err, result) => {
      if (result) {
        delete userInfo.dataValues.password;
        const accessToken = generateAccessToken(userInfo.dataValues);
        const refreshToken = generateRefreshToken(userInfo.dataValues);
        sendRefreshToken(res, refreshToken);
        sendAccessToken(res, accessToken);
        res.status(200);
      } else {
        return res.status(400).json({ message: '아이디, 패스워드를 확인해주세요' });
      }
    });
  } catch (err) {
    return res.status(400).json({ message: '아이디, 패스워드를 확인해주세요' });
  }
};
