const { user } = require('../../database/models');
const checkTokens = require('../../middlewares/tokenAuth');

module.exports = async (req, res) => {
  const userInfo = checkTokens(req);
  if (!userInfo) {
    res.status(401).json({ message: '로그인이 필요합니다' });
  } else {
    try {
      const matchedUser = await user.findOne({ where: { id: userInfo.id } });
      delete matchedUser.dataValues.user_password;
      res.status(200).json({ userInfo: matchedUser });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};
