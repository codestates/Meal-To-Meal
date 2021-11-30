const { User } = require('../../models');
const crypto = require('crypto');

module.exports = (req, res) => {
  const { userId, nickname, email, password, image } = req.body;
  //회원가입시 입력되서 바디에 담겨져서 오는 정보들.
  const salt = Math.round(new Date().valueOf() * Math.random()) + '';
  const hashPassword = crypto
    .createHash('sha512')
    .update(password + salt)
    .digest('hex');
  // 그 정보를 토대로 유저의 보안을 위해 솔트와 해시패스워드 생성
  if (!userId || !nickname || !email || !password) return res.status(422).send('입력되지않은 항목이 존재합니다.');
  // 만약 가입할때 정보가 다 안들어 왔으면  가입안되게끔

  User.findOrCreate({
    where: { userId: userId },
    defaults: {
      userId: userId,
      nickname: nickname,
      email: email,
      password: hashPassword,
      salt: salt,
      image: image,
    },
  })
    .then(([userInfo, created]) => {
      if (!created) {
        return res.status(400).json({ message: '중복된 아이디 입니다.' });
      }
      res.status(201).json({ message: '회원가입이 완료되었습니다.' });
    })
    .catch(err => {
      console.log(err);
    });
};
