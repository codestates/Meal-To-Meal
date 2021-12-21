const { user } = require('../../database/models');
const checkTokens = require('../../middlewares/tokenAuth');

module.exports = {
  post: async (req, res) => {
    const { user_nickname } = req.body;
    if (!user_nickname) {
      res.status(400).send();
    }
    const duplicatedNickname = await user.findOne({ where: { user_nickname } });
    if (duplicatedNickname) {
      res.status(409).json({ message: '중복된 닉네임입니다' });
    } else {
      res.status(200).json({ message: '사용가능한 닉네임입니다' });
    }
  },
  patch: async (req, res) => {
    const userInfo = checkTokens(req);
    if (!userInfo) {
      res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      const matchedUser = await user.findOne({ where: { id: userInfo.id } });
      await matchedUser.update({ user_nickname: req.body.user_nickname });
      res.status(200).json({ user_nickname: matchedUser.user_nickname, message: '닉네임이 수정되었습니다' });
    }
  },
};
