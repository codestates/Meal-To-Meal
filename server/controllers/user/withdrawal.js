const checkTokens = require('../../middlewares/tokenAuth');
const { user } = require('../../database/models');
const axios = require('axios');

module.exports = async (req, res) => {
  //카카오 로그인 사용자라면 회원탈퇴를 어쩌까?
  const userInfo = checkTokens(req);
  const access_token = userInfo.kakao_oauth_token;
  if (!userInfo) {
    res.status(401).json({ message: '로그인이 필요합니다' });
  } else {
    try {
      if (userInfo.signup_method === 'kakao') {
        await axios.post(`https://kauth.kakao.com/v1/user/unlink`, null, {
          headers: { Authorization: `Bearer ${access_token}`, 'Content-Type': 'application/x-www-form-urlencoded' },
        });
      }
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
