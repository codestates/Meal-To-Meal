const checkTokens = require('../../middlewares/tokenAuth');
const { user } = require('../../database/models');

module.exports = async (req, res) => {
  const userInfo = checkTokens(req);
  if (!userInfo) {
    res.status(401).json({ message: '로그인이 필요합니다' });
  } else {
    try {
      await user.destroy({ where: { user_nickname: userInfo.user_nickname } });
      return res
        .clearCookie('refreshToken', {
          sameSite: 'none',
          secure: true,
          httpOnly: true,
          // domain: *,
        })
        .status(204)
        .send();
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};
