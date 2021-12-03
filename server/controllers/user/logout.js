const checkTokens = require('../../middlewares/tokenAuth');
const axios = require('axios');

module.exports = async (req, res) => {
  const userInfo = checkTokens(req);
  if (!userInfo) {
    res.status(401).json({ message: '로그인이 필요합니다' });
  } else {
    try {
      if (userInfo.signup_method === 'kakao') {
        await axios.post('https://kapi.kakao.com/v1/user/logout', null, {
          headers: {
            Authorization: `Bearer ${userInfo.kakao_oauth_token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
      }
      return res
        .clearCookie('refreshToken', {
          sameSite: 'none',
          secure: true,
          httpOnly: true,
          // domain: *,
        })
        .status(200)
        .json({ message: '로그아웃 되었습니다' });
    } catch (err) {
      console.error(err);
    }
  }
};
