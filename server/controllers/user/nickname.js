const { user } = require('../../database/models');

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
  patch: (req, res) => {},
};
