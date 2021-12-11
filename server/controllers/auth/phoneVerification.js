const { user } = require('../../database/models');
const checkTokens = require('../../middlewares/tokenAuth');
const twilio = require('twilio');

module.exports = async (req, res) => {
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_ACCESS_TOKEN;
  const client = new twilio(accountSid, authToken);
  try {
    const userInfo = checkTokens(req);
    if (!userInfo) {
      return res.staus(400).json({ message: '로그인이 필요합니다' });
    }

    const verificationCode = parseInt(Math.random() * 1000000);

    await client.messages
      .create({
        body: `Meal To Meal 인증 코드는 ${verificationCode}입니다.`,
        from: process.env.TWILIO_FROM,
        to: req.body.phone_number,
      })
      .catche(err => err.message);
    console.log(userInfo);
    //db에 휴대폰 번호를 저장하는 로직 추가, 먹기 눌렀을 때 phone_verified 여부 검증 로직 추가
    if (userInfo.phone_verified) {
      return res.status(403).json({ message: '이미 가입된 사용자입니다' });
    } else {
      await user.update({ phone_verified: true }, { where: { id: userInfo.id } }).catch(err => console.log(err));
      res.status(200).json({ message: '인증에 성공했습니다' });
    }
  } catch (e) {
    console.error(e);
  }
};
