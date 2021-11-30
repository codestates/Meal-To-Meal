const { User, Post } = require('../../models');
const auth = require('./auth');
const crypto = require('crypto');

module.exports = {
  get: async (req, res) => {
    const userInfo = await auth(req);
    if (!userInfo) {
      return res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      const postList = await Post.findAll({ where: { userId: userInfo.id } });
      res.status(200).json({ userinfo: { userInfo, postList }, message: '요청한 유저 정보입니다' });
    }
  },
  put: async (req, res) => {
    const userInfo = await auth(req);
    const { nickname, password } = req.body;
    if (!userInfo) {
      return res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      const hashPassword = crypto
        .createHash('sha512')
        .update(password + userInfo.salt)
        .digest('hex');
      if (!nickname || !password) {
        return res.status(400).json({ message: '잘못된 요청 입니다.' });
      } else {
        User.findOne({ where: { userId: userInfo.userId } }).then(findUser => {
          findUser.update({
            nickname: nickname,
            password: hashPassword,
          });
          res.status(200).json({ userinfo: findUser.dataValues, message: '정보가 수정 되었습니다.' });
        });
      }
    }
  },
};
