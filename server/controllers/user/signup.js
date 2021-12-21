const { user } = require('../../database/models');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
  const { user_password, user_email, user_nickname } = req.body;
  if (!user_password || !user_email || !user_nickname) {
    res.status(400).json({ message: '잘못된 요청입니다' });
  } else {
    const saltRounds = 10;
    bcrypt.hash(user_password, saltRounds, async (err, hash) => {
      try {
        await user.create({
          user_password: hash,
          user_email: user_email,
          user_nickname: user_nickname,
        });
        res.status(201).json({ message: '회원가입 되었습니다' });
      } catch (err) {
        res.status(400).json({ message: '잘못된 요청입니다' });
      }
    });
  }
};
