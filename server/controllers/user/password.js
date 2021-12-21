const { user } = require('../../database/models');
const checkTokens = require('../../middlewares/tokenAuth');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  const userInfo = checkTokens(req);
  if (!userInfo) {
    res.status(401).json({ message: '로그인이 필요합니다' });
  } else {
    const matchedUser = await user.findOne({ where: { id: userInfo.id } });
    const saltRounds = 10;
    bcrypt.hash(req.body.user_password, saltRounds, async (err, hash) => {
      try {
        await matchedUser.update({ user_password: hash });
        res.status(200).json({ message: '비밀번호가 수정되었습니다' });
      } catch (err) {
        res.status(400).json({ message: '잘못된 요청입니다' });
      }
    });
  }
};
