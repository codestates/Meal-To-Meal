const { user } = require('../../database/models');
const checkTokens = require('../../middlewares/tokenAuth');
const twilio = require('twilio');

module.exports = {
  sendVerificationCode: async (req, res) => {
    try {
      const userInfo = checkTokens(req);
      if (!userInfo) {
        return res.staus(400).json({ message: '로그인이 필요합니다' });
      } else {
        const { user_phone_number } = req.body;
        const existingNumber = await user.findOne({ where: { user_phone_number } });
        if (existingNumber) {
          return res.status(403).json({ message: '이미 인증된 사용자입니다' });
        } else {
          const accountSid = process.env.TWILIO_SID;
          const authToken = process.env.TWILIO_ACCESS_TOKEN;
          const verification_code = Math.floor(100000 + Math.random() * 900000);

          const client = new twilio(accountSid, authToken);
          await client.messages
            .create({
              body: `Meal To Meal 인증 코드는 ${verification_code}입니다.`,
              from: process.env.TWILIO_FROM,
              to: `+82${Number(user_phone_number.slice(-10))}`,
            })
            .catch(err => err.message);

          //임시로 코드 저장
          await user.update({ verification_code: verification_code.toString() }, { where: { id: userInfo.id } });

          //3분 뒤 만료 시킨다
          const destroyVerificationCode = () => {
            user.update({ verification_code: 'expired' }, { where: { id: userInfo.id } }).then(res => {
              console.log('timeout??????????', res);
            });
          };
          setTimeout(destroyVerificationCode, 180000);

          //먹기 눌렀을 때 phone_verified 여부 검증 로직 추가
          res.status(200).json({ message: '인증 번호를 발송했습니다' });
        }
      }
    } catch (e) {
      console.error(e);
    }
  },

  complete: async (req, res) => {
    const userInfo = checkTokens(req);
    const { verification_code, user_phone_number } = req.body;
    const matchedUser = await user.findOne({ where: { id: userInfo.id } });
    try {
      if (userInfo.verification_code === 'expired') {
        return res.status(403).json({ message: '인증 코드가 만료되었습니다' });
      } else if (verification_code === matchedUser.verification_code) {
        await user.update({ user_phone_number }, { where: { id: userInfo.id } });
        res.status(200).json({ message: '인증에 성공했습니다' });
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ message: err.message });
    }
  },
};
